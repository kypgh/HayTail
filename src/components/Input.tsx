import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  variant?: 'default' | 'primary' | 'secondary'
  icon?: React.ReactNode
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  variant = 'default',
  icon,
  className = '',
  ...props 
}) => {
  const baseClasses = "w-full bg-dark-800 border-2 text-white placeholder-gray-400 px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variantClasses = {
    default: "border-dark-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
    primary: "border-primary-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-600",
    secondary: "border-secondary-500 focus:ring-2 focus:ring-secondary-500 focus:border-secondary-600"
  }
  
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input 
          className={`${baseClasses} ${errorClasses || variantClasses[variant]} ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  )
}

export default Input