import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonicalUrl?: string
  noIndex?: boolean
  structuredData?: object | object[]
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "hytale server, hytale multiplayer, best hytale server, hytale mods, hytale pvp, hytale ranks, minecraft server, gaming server",
  ogImage = "/images/logo-full.png",
  ogType = "website",
  canonicalUrl,
  noIndex = false,
  structuredData
}) => {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "HytaleWorld - Best Hytale Server"
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hytaleworld.net"
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={`${baseUrl}${canonicalUrl}`} />}
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:site_name" content={siteName} />
      {canonicalUrl && <meta property="og:url" content={`${baseUrl}${canonicalUrl}`} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Gaming/Server Specific Meta */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="application-name" content={siteName} />
      
      {/* Favicon */}
      <link rel="icon" href="/images/logo.png" />
      <link rel="apple-touch-icon" href="/images/logo.png" />
      
      {/* Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(data)
              }}
            />
          ))
        ) : (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        )
      )}
    </Head>
  )
}

export default SEO