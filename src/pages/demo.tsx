import { useState } from 'react'
import { Button, Input, Card, ProductCard, Modal, Dropdown, Navigation, SEO } from '@/components'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'Store', href: '/store' },
    { label: 'Wiki', href: '/wiki' },
    { label: 'Map', href: '/map' },
    { label: 'Forums', href: '/forums' },
  ]

  const filterItems = [
    { label: '🏆 Gold Items', value: 'gold', color: 'gold' as const },
    { label: '🔥 Legendary Items', value: 'legendary', color: 'legendary' as const },
    { label: '💎 Rare Items', value: 'rare', color: 'rare' as const },
    { label: '⭐ All Items', value: 'all', color: 'primary' as const },
  ]

  return (
    <>
      <SEO
        title="Component Demo - UI System Showcase"
        description="Interactive demo of our component system featuring buttons, cards, modals, and more gaming-focused UI elements."
        noIndex={true}
      />
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Navigation */}
      <Navigation 
        items={navItems}
        cartCount={3}
        onCartClick={() => console.log('Cart clicked')}
        onSignIn={() => console.log('Sign in clicked')}
      />

      <div className="max-w-6xl mx-auto p-8 space-y-12">
        <h1 className="text-5xl font-bold text-center mb-12">
          <span className="text-white">Component </span>
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            System Demo
          </span>
        </h1>

        {/* Buttons Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-200">Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="rare">Rare</Button>
            <Button variant="legendary">Legendary</Button>
            <Button variant="gold">Gold</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </div>

        {/* Inputs & Dropdown Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-200">Inputs</h2>
            <Input
              label="Search Items"
              placeholder="Search for legendary items..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              variant="primary"
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              variant="secondary"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              error="Password must be at least 8 characters"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-200">Dropdown</h2>
            <Dropdown
              items={filterItems}
              selected={selectedFilter}
              onSelect={setSelectedFilter}
              placeholder="Filter by Rarity"
              variant="primary"
            />
          </div>
        </div>

        {/* Cards Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-200">Cards</h2>
          
          {/* Basic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card variant="primary">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Primary Card</h3>
                <p className="text-gray-400">This is a primary themed card with border.</p>
              </div>
            </Card>
            
            <Card variant="secondary">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Secondary Card</h3>
                <p className="text-gray-400">This is a secondary themed card.</p>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Default Card</h3>
                <p className="text-gray-400">This is a default card with subtle styling.</p>
              </div>
            </Card>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductCard
              title="Mystic Crystal"
              description="A mysterious crystal that glows with ancient magic."
              price="$9.99"
              rarity="rare"
              badge="RARE"
              image={<div className="text-6xl">🔮</div>}
              onBuyClick={() => console.log('Buy Mystic Crystal')}
            />
            
            <ProductCard
              title="Dragon Slayer"
              description="The legendary sword that defeated the ancient dragon."
              price="$24.99"
              rarity="legendary"
              badge="LEGENDARY"
              image={<div className="text-6xl">🗡️</div>}
              onBuyClick={() => console.log('Buy Dragon Slayer')}
            />
            
            <ProductCard
              title="Royal Crown"
              description="A crown fit for the ultimate champion."
              price="$49.99"
              rarity="gold"
              badge="GOLD"
              image={<div className="text-6xl">👑</div>}
              onBuyClick={() => console.log('Buy Royal Crown')}
            />
          </div>
        </div>

        {/* Modal Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-200">Modal</h2>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
          
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Purchase Confirmation"
            size="md"
          >
            <div className="space-y-4">
              <p>Are you sure you want to purchase the <strong className="text-legendary-400">Dragon Slayer</strong> for <strong className="text-gold-400">$24.99</strong>?</p>
              <div className="flex gap-3 justify-end">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="legendary" onClick={() => setIsModalOpen(false)}>
                  Confirm Purchase
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      </div>
    </>
  )
}