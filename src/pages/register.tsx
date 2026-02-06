import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout, SEO, Card, LoginModal } from '@/components'

interface RegisterPageProps {
  user: { inGameName: string } | null
  setUser: (user: { inGameName: string } | null) => void
}

export default function RegisterPage({ user, setUser }: RegisterPageProps) {
  const router = useRouter()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS || "play.hytaleworld.net"
  const discordInvite = process.env.NEXT_PUBLIC_DISCORD_INVITE || "https://discord.gg/hytaleworld"

  useEffect(() => {
    // Redirect logged-in users to home page
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const handleLogin = (username: string) => {
    setUser({ inGameName: username })
    router.push('/')
  }

  // Don't render if user is logged in
  if (user) {
    return null
  }

  return (
    <>
      <SEO
        title="Register - Link Your Account"
        description="Create your account by linking your in-game profile. Join the server and use /link to get started."
        canonicalUrl="/register"
      />
      <Layout activeNavItem="Register">
        <LoginModal 
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={handleLogin}
        />
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-24">
          <div className="w-full max-w-lg">
            {/* Logo */}
            <div className="text-center mb-8">
              <img 
                src="/images/logo.png?v=2" 
                alt="Logo" 
                className="h-16 w-auto mx-auto mb-6"
              />
            </div>

            {/* Main Card */}
            <Card className="bg-dark-800/90 backdrop-blur-md border-dark-600 p-8">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🔗</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-white text-center mb-3">
                Link Account
              </h1>

              {/* Subtitle */}
              <p className="text-gray-400 text-center mb-8">
                To create an account, you must first verify your ownership of your in-game account.
              </p>

              {/* Steps */}
              <div className="space-y-6 mb-8">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
                      <span className="text-primary-400 font-bold text-sm">1</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">Join the Server</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      Connect to our server in-game
                    </p>
                    <div className="flex items-center gap-2 bg-dark-700/50 rounded-lg px-3 py-2 border border-dark-600">
                      <span className="text-primary-400 font-mono text-sm flex-1">
                        {serverAddress}
                      </span>
                      <button 
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={() => navigator.clipboard.writeText(serverAddress)}
                        title="Copy server address"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
                      <span className="text-primary-400 font-bold text-sm">2</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">Type the Command</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      Run <span className="text-primary-400 font-mono">/link</span> in the game chat
                    </p>
                    <div className="flex items-center gap-2 bg-dark-700/50 rounded-lg px-3 py-2 border border-dark-600">
                      <span className="text-primary-400 font-mono text-sm flex-1">/link</span>
                      <button 
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={() => navigator.clipboard.writeText('/link')}
                        title="Copy command"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center border border-primary-500/30">
                      <span className="text-primary-400 font-bold text-sm">3</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">Click the Link</h3>
                    <p className="text-gray-400 text-sm">
                      Use the generated link to complete signup
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dark-600 my-6"></div>

              {/* Already have account */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-3">
                  ALREADY HAVE AN ACCOUNT?
                </p>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-block text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  Log In
                </button>
              </div>
            </Card>

            {/* Help Section */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Need help? Join our{' '}
                <a 
                  href={discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Discord server
                </a>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
