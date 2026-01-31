import React from 'react'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'rare' | 'legendary' | 'gold' | 'primary' | 'secondary'
  hover?: boolean
  className?: string
}

const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = ''
}) => {
  const baseClasses = "bg-dark-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300"
  
  const variantClasses = {
    default: "border border-dark-600",
    rare: "border-2 border-rare-500",
    legendary: "border-2 border-legendary-500", 
    gold: "border-2 border-gold-500",
    primary: "border-2 border-primary-500",
    secondary: "border-2 border-secondary-500"
  }
  
  const hoverClasses = hover ? {
    default: "hover:shadow-xl hover:border-dark-500",
    rare: "hover:shadow-rare-500/20",
    legendary: "hover:shadow-legendary-500/20",
    gold: "hover:shadow-gold-500/20", 
    primary: "hover:shadow-primary-500/20",
    secondary: "hover:shadow-secondary-500/20"
  } : {}
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hover ? hoverClasses[variant] : ''} ${className}`}>
      {children}
    </div>
  )
}

// Product Card specific component
interface ProductCardProps {
  title: string
  description: string
  price: string
  image?: React.ReactNode
  rarity?: 'rare' | 'legendary' | 'gold'
  badge?: string
  onBuyClick?: () => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description, 
  price,
  image,
  rarity = 'rare',
  badge,
  onBuyClick
}) => {
  const rarityColors = {
    rare: { bg: 'from-rare-500 to-rare-700', text: 'text-rare-400', button: 'rare' },
    legendary: { bg: 'from-legendary-500 to-legendary-700', text: 'text-legendary-400', button: 'legendary' },
    gold: { bg: 'from-gold-400 to-gold-600', text: 'text-gold-400', button: 'gold' }
  }
  
  return (
    <Card variant={rarity}>
      <div className={`h-48 bg-gradient-to-br ${rarityColors[rarity].bg} flex items-center justify-center relative`}>
        {image}
        {badge && (
          <div className={`absolute top-2 left-2 bg-${rarity}-500 ${rarity === 'gold' ? 'text-dark-900' : 'text-white'} px-2 py-1 rounded text-xs font-bold uppercase`}>
            {badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-2xl font-bold ${rarityColors[rarity].text}`}>{price}</span>
          <button 
            onClick={onBuyClick}
            className={`bg-${rarity}-500 hover:bg-${rarity}-600 ${rarity === 'gold' ? 'text-dark-900' : 'text-white'} font-semibold px-4 py-2 rounded-lg transition-colors duration-200`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </Card>
  )
}

export default Card