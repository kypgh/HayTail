import { useState } from 'react'
import { Button, Card, Layout } from '@/components'

export default function HomePage() {
  const [serverStatus] = useState('ONLINE')
  const [playerCount] = useState(1284)

  return (
    <Layout activeNavItem="Home">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
        {/* Logo Full */}
        <div className="mb-12">
          <img 
            src="/images/logo-full.png?v=2" 
            alt="Logo Full" 
            className="h-32 md:h-40 lg:h-48 w-auto mx-auto"
          />
        </div>

        {/* Adventure Awaits Badge */}
        <div className="mb-8">
          <span className="inline-block bg-primary-500/20 border border-primary-500/30 text-primary-300 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider">
            Adventure Awaits
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Experience Gaming<br />
          <span className="text-white">Like Never Before</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
          Join thousands of players in the ultimate gaming community. Epic quests, 
          creative builds, and competitive gameplay are just a click away.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button 
            variant="primary" 
            size="lg"
            className="px-8 py-4 text-lg font-semibold"
            onClick={() => console.log('Play Now clicked')}
          >
            Play Now →
          </Button>
          
          <div className="flex items-center space-x-3 bg-dark-800/50 backdrop-blur-sm border border-dark-600 rounded-lg px-6 py-3">
            <span className="text-gray-400 text-sm uppercase tracking-wider">Server IP Address</span>
            <div className="flex items-center space-x-2">
              <span className="text-white font-mono text-lg">PLAY.YOURSERVER.COM</span>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => navigator.clipboard.writeText('PLAY.YOURSERVER.COM')}
              >
                📋
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Server Status */}
          <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-600">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Server Status</h3>
              <p className="text-gray-400 mb-4">
                Our systems are fully operational and ready for your arrival.
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
              <h3 className="text-xl font-bold text-white mb-2">Player Count</h3>
              <p className="text-gray-400 mb-4">
                Join our growing community and make new friends today.
              </p>
              <div className="text-center">
                <span className="text-4xl font-bold text-white">{playerCount.toLocaleString()}</span>
                <span className="text-gray-400 ml-2">Active</span>
              </div>
            </div>
          </Card>

          {/* Community Discord */}
          <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-600">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-purple-500 text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Community Discord</h3>
              <p className="text-gray-400 mb-4">
                Chat with the staff, get updates, and participate in events.
              </p>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => console.log('Join Discord clicked')}
              >
                Join Discussion →
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}