import React, { useState, useEffect } from 'react'
import { Button } from '@/components'

interface LayoutProps {
  children: React.ReactNode
  activeNavItem?: string
}

const Layout: React.FC<LayoutProps> = ({ children, activeNavItem = 'Home' }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Store', href: '/store' },
    { label: 'Wiki', href: '/wiki' },
    { label: 'Map', href: '/map' },
    { label: 'Forums', href: '/forums' },
  ]

  const logo = (
    <img 
      src="/images/logo.png?v=2" 
      alt="Logo" 
      className="h-8 w-auto"
    />
  )

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/images/bg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Overlay gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/30 to-dark-900/80" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation with scroll effect */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-dark-900/95 backdrop-blur-md' 
            : 'bg-dark-900/10 backdrop-blur-sm'
        }`}
        style={{
          borderBottom: isScrolled ? '1px solid rgba(55, 65, 81, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {logo}
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        item.label === activeNavItem
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-300 hover:bg-dark-700/50 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right side - Sign In */}
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="primary" size="sm" onClick={() => console.log('Sign in clicked')}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        {children}

        {/* Footer */}
        <footer className="border-t border-dark-700 bg-dark-900/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <img 
                  src="/images/logo-full.png?v=2" 
                  alt="Logo" 
                  className="h-6 w-auto"
                />
              </div>
              
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/support" className="hover:text-white transition-colors">Support</a>
              </div>
              
              <div className="flex space-x-4 mt-4 md:mt-0">
                <button className="text-gray-400 hover:text-white transition-colors">🔊</button>
                <button className="text-gray-400 hover:text-white transition-colors">📤</button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-dark-700 text-center text-xs text-gray-500">
              © 2024 Website Name Community. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout