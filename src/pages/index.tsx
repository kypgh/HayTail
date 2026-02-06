import { useState } from 'react'
import { Button, Card, Layout, SEO, LoginModal } from '@/components'

interface HomePageProps {
  user: { inGameName: string } | null
  setUser: (user: { inGameName: string } | null) => void
}

export default function HomePage({ user, setUser }: HomePageProps) {
  const [serverStatus] = useState('ONLINE')
  const [playerCount] = useState(1284)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleLogin = (username: string) => {
    setUser({ inGameName: username })
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hytaleworld.net"
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "HytaleWorld - Best Hytale Server"
  const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS || "play.hytaleworld.net"
  const discordInvite = process.env.NEXT_PUBLIC_DISCORD_INVITE || "https://discord.gg/hytaleworld"
  const logoFullPath = "/images/logo-full.png"

  const structuredData = [
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteName,
      "description": "The #1 Hytale multiplayer server with custom mods, PvP zones, creative plots, and 24/7 uptime.",
      "url": siteUrl,
      "logo": `${siteUrl}${logoFullPath}`,
      "sameAs": [
        discordInvite
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "English"
      }
    },
    // Gaming Server Schema
    {
      "@context": "https://schema.org",
      "@type": "GameServer",
      "name": "HytaleWorld Server",
      "description": "Premium Hytale multiplayer server with custom mods, PvP zones, and creative building",
      "game": {
        "@type": "VideoGame",
        "name": "Hytale",
        "genre": ["Adventure", "Sandbox", "Multiplayer"],
        "gamePlatform": "PC"
      },
      "serverStatus": "online",
      "playersOnline": playerCount,
      "maxPlayers": 5000,
      "serverAddress": serverAddress,
      "gameMode": ["PvP", "Creative", "Survival", "Adventure"],
      "features": [
        "Custom Mods",
        "PvP Arenas", 
        "Creative Plots",
        "Exclusive Items",
        "24/7 Uptime",
        "Anti-Grief Protection",
        "Custom Ranks"
      ],
      "operatingSystem": "Linux",
      "provider": {
        "@type": "Organization",
        "name": "HytaleWorld"
      }
    },
    // Service Schema
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Hytale Server Hosting",
      "description": "Premium Hytale multiplayer gaming experience with custom features",
      "provider": {
        "@type": "Organization",
        "name": "HytaleWorld"
      },
      "serviceType": "Gaming Server",
      "areaServed": "Worldwide",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": siteUrl,
        "serviceSmsNumber": serverAddress
      }
    },
    // FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I join the Hytale server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Connect to ${serverAddress} in your Hytale client. The server supports the latest Hytale version with custom mods pre-installed.`
          }
        },
        {
          "@type": "Question", 
          "name": "What makes this the best Hytale server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer custom PvP zones, creative building plots, exclusive mods, 24/7 uptime, and an active community of 1,284+ players. Our server features anti-grief protection and custom ranks."
          }
        },
        {
          "@type": "Question",
          "name": "Are there custom mods on the server?",
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": "Yes! We have exclusive Hytale mods including new biomes, creatures, magic systems, custom weapons, and unique quests not available on other servers."
          }
        },
        {
          "@type": "Question",
          "name": "How do I get VIP ranks and perks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Visit our store to purchase premium ranks like Grand Champion, VIP passes, and exclusive items. All purchases include instant delivery and lifetime benefits."
          }
        },
        {
          "@type": "Question",
          "name": "Is the server online 24/7?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our Hytale server maintains 99.9% uptime with premium hosting, DDoS protection, and automatic backups. Server status is always displayed on our homepage."
          }
        }
      ]
    },
    // Website Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "url": siteUrl,
      "description": "The #1 Hytale multiplayer server with custom mods, PvP zones, and creative plots",
      "publisher": {
        "@type": "Organization",
        "name": "HytaleWorld"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ]

  return (
    <>
      <SEO
        title="Best Hytale Server - Custom Mods, PvP & Creative Plots"
        description={`Join the #1 Hytale multiplayer server with custom mods, epic PvP zones, creative building plots, and 24/7 uptime. 1,284+ players online! Server IP: ${serverAddress}`}
        keywords="hytale server, best hytale server, hytale multiplayer, hytale mods, hytale pvp, hytale creative, hytale ranks, minecraft server, gaming server, hytale community"
        canonicalUrl="/"
        ogType="website"
        structuredData={structuredData}
      />
      <Layout 
        activeNavItem="Home"
        userName={user?.inGameName}
        onSignIn={() => setIsLoginModalOpen(true)}
        onSignOut={handleLogout}
      >
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLogin}
      />
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
        {/* Logo Full */}
        <div className="mb-12">
          <img 
            src={`${logoFullPath}?v=2`} 
            alt="HytaleWorld - Best Hytale Server Logo" 
            className="h-32 md:h-40 lg:h-48 w-auto mx-auto"
          />
        </div>

        {/* Hytale Server Badge */}
        <div className="mb-8">
          <span className="inline-block bg-primary-500/20 border border-primary-500/30 text-primary-300 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider">
            #1 Hytale Server • Custom Mods • 24/7 Uptime
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Best Hytale Server<br />
          <span className="text-primary-400">With Epic Mods</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
          The ultimate Hytale multiplayer experience with custom zones, exclusive mods, 
          PvP arenas, creative plots, and the most active Hytale community. 
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button 
            variant="primary" 
            size="lg"
            className="px-8 py-4 text-lg font-semibold"
            onClick={() => console.log('Join Server clicked')}
          >
            Join Best Hytale Server →
          </Button>
          
          <div className="flex items-center space-x-3 bg-dark-800/50 backdrop-blur-sm border border-dark-600 rounded-lg px-6 py-3">
            <span className="text-gray-400 text-sm uppercase tracking-wider">Hytale Server IP</span>
            <div className="flex items-center space-x-2">
              <span className="text-white font-mono text-lg">{serverAddress}</span>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => navigator.clipboard.writeText(serverAddress)}
                title="Copy Hytale server IP"
              >
                📋
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Our Hytale Server?</h2>
          <p className="text-xl text-gray-300">The most advanced Hytale multiplayer experience with exclusive features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-600 text-center p-6">
            <div className="text-4xl mb-4">⚔️</div>
            <h3 className="text-lg font-bold text-white mb-2">Custom PvP Zones</h3>
            <p className="text-gray-400 text-sm">Epic Hytale PvP with custom weapons, armor sets, and ranked battles</p>
          </Card>
          
          <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-600 text-center p-6">
            <div className="text-4xl mb-4">🏗️</div>
            <h3 className="text-lg font-bold text-white mb-2">Creative Plots</h3>
            <p className="text-gray-400 text-sm">Unlimited Hytale building with WorldEdit, custom blocks, and plot protection</p>
          </Card>
          
          <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-600 text-center p-6">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-lg font-bold text-white mb-2">Exclusive Mods</h3>
            <p className="text-gray-400 text-sm">Best Hytale mods: new biomes, creatures, magic systems, and quests</p>
          </Card>
          
          <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-600 text-center p-6">
            <div className="text-4xl mb-4">🎖️</div>
            <h3 className="text-lg font-bold text-white mb-2">Ranks & Perks</h3>
            <p className="text-gray-400 text-sm">VIP ranks, exclusive cosmetics, custom pets, and premium Hytale perks</p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="sr-only">Server Statistics and Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Server Status */}
          <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-600">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hytale Server Online</h3>
              <p className="text-gray-400 mb-4">
                Premium Hytale hosting with zero lag, custom mods loaded, and 100% uptime.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-semibold">{serverStatus}</span>
              </div>
            </div>
          </Card>

          {/* Player Count */}
          <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-600">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-500/20 rounded-full flex items-center justify-center">
                <span className="text-primary-500 text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Growing Hytale Community</h3>
              <p className="text-gray-400 mb-4">
                Perfect server size! Plenty of space to build, abundant resources, and a friendly community that welcomes new players.
              </p>
              <div className="text-center">
                <span className="text-2xl font-bold text-primary-400">Active & Welcoming</span>
                <div className="text-sm text-gray-300 mt-2">Perfect community size for everyone</div>
              </div>
            </div>
          </Card>

          {/* Community Discord */}
          <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-600">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-purple-500 text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hytale Discord Community</h3>
              <p className="text-gray-400 mb-4">
                Join our server community! Get mod updates, server events, trading channels, and exclusive previews.
              </p>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => console.log('Join Discord clicked')}
              >
                Join Discord →
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
    </>
  )
}