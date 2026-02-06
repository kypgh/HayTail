import React, { useState } from 'react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import Button from './Button'

interface NavItem {
  label: string
  href: string
  active?: boolean
}

interface NavigationProps {
  logo?: React.ReactNode
  items: NavItem[]
  cartCount?: number
  onCartClick?: () => void
  onSignIn?: () => void
  userAvatar?: string
  userName?: string
}

const Navigation: React.FC<NavigationProps> = ({
  logo,
  items,
  cartCount = 0,
  onCartClick,
  onSignIn,
  userAvatar,
  userName
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <nav className="bg-dark-900/95 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/">
                {logo || (
                  <img 
                    src="/images/logo.png?v=2" 
                    alt="Logo" 
                    className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  />
                )}
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    item.active
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Cart & User */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* User */}
            {userName ? (
              <div className="flex items-center space-x-2">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full" />
                ) : (
                  <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                )}
                <span className="text-white text-sm">{userName}</span>
              </div>
            ) : (
              <Button variant="primary" size="sm" onClick={onSignIn}>
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-700 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-800 border-t border-dark-700">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  item.active
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile Cart & User */}
            <div className="pt-4 pb-3 border-t border-dark-600">
              <div className="flex items-center px-3 space-x-3">
                <button
                  onClick={onCartClick}
                  className="relative flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span>Cart ({cartCount})</span>
                </button>
              </div>
              <div className="mt-3 px-3">
                {userName ? (
                  <div className="flex items-center space-x-2">
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full" />
                    ) : (
                      <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <span className="text-white">{userName}</span>
                  </div>
                ) : (
                  <Button variant="primary" size="sm" onClick={onSignIn} className="w-full">
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation