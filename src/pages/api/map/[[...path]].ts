import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Script to inject into HTML that intercepts all requests and rewrites URLs
const interceptorScript = `
<script>
(function() {
  const proxyBase = '/api/map/';
  const externalHost = 'http://map.haytail.com:10310';
  const externalWsHost = 'ws://map.haytail.com:10310';
  
  // Intercept fetch
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    if (typeof url === 'string') {
      if (url.startsWith('/') && !url.startsWith(proxyBase)) {
        url = proxyBase + url.substring(1);
      } else if (!url.startsWith('http') && !url.startsWith(proxyBase) && !url.startsWith('/')) {
        url = proxyBase + url;
      }
    }
    return originalFetch.call(this, url, options);
  };
  
  // Intercept XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    if (typeof url === 'string') {
      if (url.startsWith('/') && !url.startsWith(proxyBase)) {
        url = proxyBase + url.substring(1);
      } else if (!url.startsWith('http') && !url.startsWith(proxyBase) && !url.startsWith('/')) {
        url = proxyBase + url;
      }
    }
    return originalOpen.call(this, method, url, ...rest);
  };
  
  // Intercept WebSocket - redirect to the external server directly
  const originalWebSocket = window.WebSocket;
  window.WebSocket = function(url, protocols) {
    if (typeof url === 'string') {
      // If it's already pointing to localhost or current host, redirect to external
      if (url.includes('localhost') || url.includes('127.0.0.1') || url.includes(window.location.host)) {
        // Extract the path from the URL
        try {
          const wsUrl = new URL(url);
          url = externalWsHost + wsUrl.pathname + wsUrl.search;
        } catch (e) {
          url = externalWsHost + '/' + url.split('/').slice(3).join('/');
        }
      }
      // If it's a relative WebSocket URL, convert to absolute pointing to external server
      else if (url.startsWith('/')) {
        url = externalWsHost + url;
      } else if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
        url = externalWsHost + '/' + url;
      }
    }
    console.log('WebSocket connecting to:', url);
    return protocols ? new originalWebSocket(url, protocols) : new originalWebSocket(url);
  };
  
  // Intercept EventSource (Server-Sent Events)
  if (window.EventSource) {
    const originalEventSource = window.EventSource;
    window.EventSource = function(url, options) {
      if (typeof url === 'string') {
        if (url.startsWith('/') && !url.startsWith(proxyBase)) {
          url = proxyBase + url.substring(1);
        } else if (!url.startsWith('http') && !url.startsWith(proxyBase) && !url.startsWith('/')) {
          url = proxyBase + url;
        }
      }
      return new originalEventSource(url, options);
    };
  }
  
  // Intercept Image loading
  const originalImage = window.Image;
  window.Image = function(width, height) {
    const img = new originalImage(width, height);
    const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    Object.defineProperty(img, 'src', {
      set: function(url) {
        if (typeof url === 'string' && !url.startsWith('http') && !url.startsWith('data:') && !url.startsWith(proxyBase)) {
          if (url.startsWith('/')) {
            url = proxyBase + url.substring(1);
          } else {
            url = proxyBase + url;
          }
        }
        originalSrcDescriptor.set.call(this, url);
      },
      get: function() {
        return originalSrcDescriptor.get.call(this);
      }
    });
    return img;
  };
})();
</script>
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
      );
      return res.status(200).end();
    }

    const { path } = req.query;
    const targetPath = Array.isArray(path) ? path.join("/") : path || "";
    const url = `http://map.haytail.com:10310/${targetPath}`;

    // Forward request body for POST/PUT requests
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;

    const response = await fetch(url, {
      method: req.method,
      headers: Object.fromEntries(
        Object.entries(req.headers).filter(
          ([key]) =>
            !["host", "connection", "accept-encoding"].includes(
              key.toLowerCase(),
            ),
        ),
      ) as Record<string, string>,
      body: ["GET", "HEAD"].includes(req.method || "") ? undefined : body,
    });

    let buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") || "";

    // For HTML responses, inject the interceptor script and rewrite URLs
    if (contentType.includes("text/html")) {
      let html = buffer.toString("utf-8");

      // Inject the interceptor script right after <head>
      html = html.replace(/(<head[^>]*>)/i, `$1${interceptorScript}`);

      // Rewrite relative URLs in HTML attributes to go through the proxy
      html = html
        .replace(
          /href=["'](?!(?:https?:|\/\/|#|data:|javascript:))([^"']+)["']/g,
          (_, url) => `href="/api/map/${url.replace("/^\\//", "")}"`,
        )
        .replace(
          /src=["'](?!(?:https?:|\/\/|#|data:))([^"']+)["']/g,
          (_, url) => `src="/api/map/${url.replace("/^\\//", "")}"`,
        );

      buffer = Buffer.from(html);
    }

    // Copy headers, skipping problematic ones
    response.headers.forEach((value, key) => {
      if (
        ![
          "x-frame-options",
          "content-security-policy",
          "content-encoding",
          "content-length",
        ].includes(key.toLowerCase())
      ) {
        res.setHeader(key, value);
      }
    });

    // Set our own headers
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Length", buffer.length);

    res.status(response.status);
    res.end(buffer);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy failed" });
  }
}
