import { useState } from "react";
import { Layout, SEO, LoginModal } from "@/components";

export default function MapPage({
  user,
  setUser,
}: {
  user: { inGameName: string } | null;
  setUser: (user: { inGameName: string } | null) => void;
}) {
  const mapUrl = "/api/map";
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = (username: string) => {
    setUser({ inGameName: username });
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <>
      <SEO
        title="Server Map"
        description="Explore the server map and see all the locations"
        canonicalUrl="/map"
      />
      <Layout
        activeNavItem="Map"
        userName={user?.inGameName}
        onSignIn={() => setIsLoginModalOpen(true)}
        onSignOut={handleLogout}
      >
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={handleLogin}
        />
        <div className="min-h-screen pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-white mb-6">Server Map</h1>
            <p className="text-gray-300 mb-6">
              Explore the server world in real-time. This is an embedded view of
              the map.
            </p>

            {/* Iframe Container */}
            <div
              className="relative w-full bg-dark-800 rounded-lg overflow-hidden border border-dark-600"
              style={{ height: "calc(100vh - 250px)" }}
            >
              <iframe
                src={mapUrl}
                className="w-full h-full"
                title="Server Map"
                frameBorder="0"
                allowFullScreen
              />
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <p>
                Having issues with the embedded map? Try the{" "}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 underline"
                >
                  external map link
                </a>{" "}
                instead.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
