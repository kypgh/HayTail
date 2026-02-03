import { useState } from 'react'
import { Button, Layout, SEO } from '@/components'

// Rank data
const rankData = [
  {
    id: 1,
    title: "VIP RANK",
    tagline: "Ultimate Access",
    description: "The complete server experience with unlimited homes and access to ALL available commands and features.",
    price: "$49.99",
    image: "⭐",
    rarity: "legendary" as const,
    badge: "MOST POPULAR",
    features: [
      "Unlimited Home locations",
      "ALL teleportation commands (rtp, back, top, bottom, jumpto)",
      "ALL utility commands (repair, vanish, list, near, fly, heal)",
      "No restrictions or limitations"
    ],
    bestFor: "Players who want the full premium experience"
  },
  {
    id: 2,
    title: "BUILDER RANK",
    tagline: "Creative Architect",
    description: "Essential tools for serious builders and architects. Focus on construction with creative abilities.",
    price: "$29.99",
    image: "🔨",
    rarity: "gold" as const,
    badge: null,
    features: [
      "2 Home locations",
      "Creative flight mode (/fly)",
      "Instant health restoration (/heal)"
    ],
    bestFor: "Builders, architects, and creative players"
  },
  {
    id: 3,
    title: "FROG RANK",
    tagline: "Leap Master",
    description: "The ultimate teleportation specialist with enhanced jumping abilities and location memory.",
    price: "$24.99",
    image: "🐸",
    rarity: "rare" as const,
    badge: null,
    features: [
      "2 Home locations",
      "Advanced jump teleport (/jumpto) - 100 block range",
      "Return to previous location (/back)",
      "Teleport to highest point (/top)"
    ],
    bestFor: "Players who want maximum teleportation flexibility"
  },
  {
    id: 4,
    title: "EXPLORER RANK",
    tagline: "Master of the Wild",
    description: "Perfect for adventurers who love exploring new territories. Get enhanced mobility and survival tools to conquer the wilderness.",
    price: "$19.99",
    image: "🧭",
    rarity: "rare" as const,
    badge: null,
    features: [
      "2 Home locations",
      "Random Teleport (/rtp) with 60s cooldown",
      "Repair items (/repair) with 30min cooldown",
      "Teleport to highest point (/top)",
      "Teleport to lowest point (/bottom)"
    ],
    bestFor: "Players who enjoy exploration and need quick travel options"
  },
  {
    id: 5,
    title: "ASSASSIN RANK",
    tagline: "Shadow Walker",
    description: "Become the ultimate stealth operative with invisibility and tracking abilities. Hunt your targets unseen.",
    price: "$17.99",
    image: "🗡️",
    rarity: "rare" as const,
    badge: null,
    features: [
      "2 Home locations",
      "Vanish from sight (/vanish)",
      "Track nearby players (/near)",
      "See all online players (/list)",
      "Return to previous location (/back)"
    ],
    bestFor: "PvP players and those who prefer stealth gameplay"
  },
  {
    id: 6,
    title: "SCAVENGER RANK",
    tagline: "Vertical Navigator",
    description: "Master of vertical movement and positioning. Perfect for builders and treasure hunters who need precise navigation.",
    price: "$14.99",
    image: "⛏️",
    rarity: "gold" as const,
    badge: null,
    features: [
      "2 Home locations",
      "Teleport to highest point (/top)",
      "Teleport to lowest point (/bottom)",
      "Jump to target location (/jumpto) - 50 block range"
    ],
    bestFor: "Builders, miners, and players who need precise positioning"
  },
  {
    id: 7,
    title: "DONOR RANK",
    tagline: "Supporter Perks",
    description: "Thank you for supporting our server! Enjoy premium teleportation features as our appreciation.",
    price: "$9.99",
    image: "💝",
    rarity: "gold" as const,
    badge: null,
    features: [
      "2 Home locations",
      "Return to previous location (/back)",
      "Random teleport (/rtp) with 5min cooldown"
    ],
    bestFor: "Supporters who want basic premium features"
  }
]

// Mock cart items for sidebar
const mockCartItems = [
  {
    id: 1,
    title: "VIP Rank",
    price: "$49.99",
    image: "⭐"
  },
  {
    id: 2,
    title: "Builder Rank",
    price: "$29.99",
    image: "🔨"
  }
]

export default function StorePage() {
  const [activeTab, setActiveTab] = useState('Latest')

  const tabs = ['Latest', 'Popular', 'On Sale']

  // Product structured data
  const productSchemas = rankData.map(rank => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": rank.title,
    "description": rank.description,
    "category": "Gaming Ranks",
    "brand": {
      "@type": "Brand",
      "name": "HytaleWorld"
    },
    "offers": {
      "@type": "Offer",
      "price": rank.price.replace('$', ''),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "HytaleWorld"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Rarity",
        "value": rank.rarity
      },
      {
        "@type": "PropertyValue", 
        "name": "Game",
        "value": "Hytale"
      }
    ]
  }))

  // Store page structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hytaleworld.net"
  const paymentMethods = ["Credit Card", "PayPal", "Stripe"]
  
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "HytaleWorld Store",
    "description": "Premium Hytale server items, ranks, and perks",
    "url": `${siteUrl}/store`,
    "parentOrganization": {
      "@type": "Organization",
      "name": "HytaleWorld"
    },
    "paymentAccepted": paymentMethods,
    "currenciesAccepted": "USD"
  }

  // ItemList schema for product collection
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hytale Server Ranks",
    "description": "Premium ranks and perks for HytaleWorld server",
    "numberOfItems": rankData.length,
    "itemListElement": rankData.map((rank, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": rank.title,
        "description": rank.description,
        "offers": {
          "@type": "Offer",
          "price": rank.price.replace('$', ''),
          "priceCurrency": "USD"
        }
      }
    }))
  }

  const allSchemas = [storeSchema, itemListSchema, ...productSchemas]

  const RankCard = ({ rank }: { rank: typeof rankData[0] }) => {
    const rarityColors = {
      rare: { 
        bg: 'from-rare-500 via-rare-600 to-rare-800', 
        text: 'text-rare-400', 
        button: 'bg-rare-500 hover:bg-rare-600',
        border: 'border-rare-500'
      },
      legendary: { 
        bg: 'from-legendary-500 via-legendary-600 to-legendary-800', 
        text: 'text-legendary-400', 
        button: 'bg-legendary-500 hover:bg-legendary-600',
        border: 'border-legendary-500'
      },
      gold: { 
        bg: 'from-gold-400 via-gold-500 to-gold-700', 
        text: 'text-gold-400', 
        button: 'bg-gold-500 hover:bg-gold-600 text-dark-900',
        border: 'border-gold-500'
      }
    }

    return (
      <div className={`bg-dark-800 rounded-lg overflow-hidden border-2 ${rarityColors[rank.rarity].border} hover:shadow-lg transition-all duration-300 flex flex-col h-full`}>
        <div className={`h-32 bg-gradient-to-br ${rarityColors[rank.rarity].bg} relative overflow-hidden`}>
          {/* Background pattern - more visible */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-white/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.3),transparent_60%)]"></div>
          
          {/* Diagonal lines pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 12px)`,
          }}></div>
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-4xl drop-shadow-2xl filter brightness-110">{rank.image}</div>
          </div>
          
          {rank.badge && (
            <div className="absolute top-2 left-2 bg-gold-500 text-dark-900 px-2 py-1 rounded text-xs font-bold uppercase shadow-xl backdrop-blur-sm">
              {rank.badge}
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1">{rank.title}</h3>
            <p className={`text-sm font-medium mb-2 ${rarityColors[rank.rarity].text} uppercase tracking-wide`}>
              {rank.tagline}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {rank.description}
            </p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-white font-semibold text-sm mb-2">Key Features:</h4>
            <ul className="space-y-1">
              {rank.features.map((feature, index) => (
                <li key={index} className="text-gray-300 text-xs flex items-start">
                  <span className={`${rarityColors[rank.rarity].text} mr-2 mt-0.5`}>•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6 flex-grow">
            <p className="text-gray-500 text-xs">
              <span className="font-medium">Best For:</span> {rank.bestFor}
            </p>
          </div>
          
          {/* Price and button container - always at bottom */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-white">{rank.price}</span>
            <button 
              className={`${rarityColors[rank.rarity].button} font-semibold px-6 py-2 rounded-lg transition-colors duration-200 text-white`}
              onClick={() => console.log(`Buy ${rank.title}`)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Hytale Server Ranks - Premium Features & Commands"
        description="Buy premium Hytale server ranks with exclusive features. VIP, Builder, Explorer, Assassin, and more ranks available. Unlock teleportation, creative mode, and special abilities."
        keywords="hytale server ranks, hytale vip, hytale builder rank, hytale explorer, server ranks, gaming ranks, hytale premium features"
        canonicalUrl="/store"
        ogType="website"
        structuredData={allSchemas}
      />
      <Layout activeNavItem="Store">
      <div className="flex pt-16">
        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Server Ranks</h1>
              <p className="text-gray-300 text-lg">
                Unlock premium features and enhance your gameplay experience.
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="flex space-x-1 bg-dark-800/50 backdrop-blur-sm rounded-lg p-1 w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-dark-700/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Ranks Grid */}
            <div className="mb-8">
              <div className="text-gray-400 text-sm mb-6">
                Showing 1-{rankData.length} of {rankData.length} ranks
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rankData.map((rank) => (
                  <RankCard key={rank.id} rank={rank} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Cart */}
        <div className="hidden lg:block w-80 bg-dark-900/90 backdrop-blur-sm border-l border-dark-700 p-6">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                🛒 YOUR ORDER
              </h2>
              <button className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {mockCartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 bg-dark-800/50 rounded-lg p-3">
                  <div className="text-2xl">{item.image}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{item.title}</h4>
                    <p className="text-primary-400 font-bold">{item.price}</p>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-dark-700 pt-4 mb-6">
              <div className="flex justify-between text-gray-300 mb-2">
                <span>Subtotal</span>
                <span>$79.98</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg">
                <span>TOTAL PRICE</span>
                <span className="text-primary-400">$79.98</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full mb-4 py-3 font-bold"
              onClick={() => console.log('Complete checkout')}
            >
              COMPLETE CHECKOUT
            </Button>

            <p className="text-xs text-gray-500 text-center">
              SECURE STRIPE CHECKOUT
            </p>
          </div>
        </div>
      </div>
    </Layout>
    </>
  )
}