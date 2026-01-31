import { useState } from 'react'
import { Button, Layout } from '@/components'

// Mock product data
const mockProducts = [
  {
    id: 1,
    title: "Grand Champion",
    subtitle: "LEGENDARY RANK",
    description: "The ultimate status symbol. Gain access to private servers, unique cosmetic bugs, and quality-of-life for life.",
    price: "$49.99",
    image: "👑",
    rarity: "legendary" as const,
    badge: "MOST POPULAR"
  },
  {
    id: 2,
    title: "5,000 Coins",
    subtitle: "IN-GAME CURRENCY",
    description: "Stock up in-game coins to spend on player markets, land claims, and premium NoSpam+ perks.",
    price: "$24.99",
    image: "🪙",
    rarity: "rare" as const,
    badge: null
  },
  {
    id: 3,
    title: "Ancient Key Pack",
    subtitle: "MYSTERY ITEMS",
    description: "A pack of five Ancient Keys used for opening legendary chests in the spawn area. Best value for collectors.",
    price: "$9.99",
    image: "🗝️",
    rarity: "rare" as const,
    badge: null
  },
  {
    id: 4,
    title: "Dragon Cape",
    subtitle: "COSMETIC ITEM",
    description: "Show your bravery with the Dragon Slayer's cape. Features enchanting animated particle effects while moving.",
    price: "$14.99",
    image: "🦸",
    rarity: "legendary" as const,
    badge: null
  },
  {
    id: 5,
    title: "Builder's Kit",
    subtitle: "UTILITY PACK",
    description: "Essential tools and materials for ambitious builders. Includes rare blocks and exclusive building permits.",
    price: "$19.99",
    image: "🔨",
    rarity: "gold" as const,
    badge: null
  },
  {
    id: 6,
    title: "VIP Access Pass",
    subtitle: "PREMIUM MEMBERSHIP",
    description: "30-day VIP access with priority queue, exclusive areas, and special chat privileges.",
    price: "$12.99",
    image: "⭐",
    rarity: "gold" as const,
    badge: null
  }
]

// Mock cart items for sidebar
const mockCartItems = [
  {
    id: 1,
    title: "Grand Champion Rank",
    price: "$49.99",
    image: "👑"
  },
  {
    id: 2,
    title: "Ancient Key Pack",
    price: "$9.99",
    image: "🗝️"
  }
]

export default function StorePage() {
  const [activeTab, setActiveTab] = useState('Latest')

  const tabs = ['Latest', 'Popular', 'On Sale']

  const ProductCard = ({ product }: { product: typeof mockProducts[0] }) => {
    const rarityColors = {
      rare: { 
        bg: 'from-rare-500 to-rare-700', 
        text: 'text-rare-400', 
        button: 'bg-rare-500 hover:bg-rare-600',
        border: 'border-rare-500'
      },
      legendary: { 
        bg: 'from-legendary-500 to-legendary-700', 
        text: 'text-legendary-400', 
        button: 'bg-legendary-500 hover:bg-legendary-600',
        border: 'border-legendary-500'
      },
      gold: { 
        bg: 'from-gold-400 to-gold-600', 
        text: 'text-gold-400', 
        button: 'bg-gold-500 hover:bg-gold-600 text-dark-900',
        border: 'border-gold-500'
      }
    }

    return (
      <div className={`bg-dark-800 rounded-lg overflow-hidden border-2 ${rarityColors[product.rarity].border} hover:shadow-lg transition-all duration-300`}>
        <div className={`h-48 bg-gradient-to-br ${rarityColors[product.rarity].bg} flex items-center justify-center relative`}>
          <div className="text-6xl">{product.image}</div>
          {product.badge && (
            <div className="absolute top-2 left-2 bg-gold-500 text-dark-900 px-2 py-1 rounded text-xs font-bold uppercase">
              {product.badge}
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-1">{product.title}</h3>
          <p className={`text-sm font-medium mb-3 ${rarityColors[product.rarity].text} uppercase tracking-wide`}>
            {product.subtitle}
          </p>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{product.price}</span>
            <button 
              className={`${rarityColors[product.rarity].button} font-semibold px-6 py-2 rounded-lg transition-colors duration-200 text-white`}
              onClick={() => console.log(`Buy ${product.title}`)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout activeNavItem="Store">
      <div className="flex pt-16">
        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Essential Gear</h1>
              <p className="text-gray-300 text-lg">
                Enhance your adventure with premium ranks and items.
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

            {/* Products Grid */}
            <div className="mb-8">
              <div className="text-gray-400 text-sm mb-6">
                Showing 1-6 of 48 items
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
                <span>$59.98</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg">
                <span>TOTAL PRICE</span>
                <span className="text-primary-400">$59.98</span>
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
  )
}