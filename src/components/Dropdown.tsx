import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface DropdownItem {
  label: string
  value: string
  icon?: React.ReactNode
  color?: 'default' | 'primary' | 'secondary' | 'rare' | 'legendary' | 'gold'
}

interface DropdownProps {
  items: DropdownItem[]
  selected?: string
  onSelect: (value: string) => void
  placeholder?: string
  variant?: 'default' | 'primary' | 'secondary'
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selected,
  onSelect,
  placeholder = "Select option",
  variant = 'default',
  className = ''
}) => {
  const selectedItem = items.find(item => item.value === selected)
  
  const buttonVariants = {
    default: "bg-dark-800 border-dark-600 hover:bg-dark-700 focus:ring-primary-500",
    primary: "bg-dark-800 border-primary-500 hover:bg-dark-700 focus:ring-primary-500",
    secondary: "bg-dark-800 border-secondary-500 hover:bg-dark-700 focus:ring-secondary-500"
  }
  
  const getItemColorClasses = (color: string, active: boolean) => {
    if (active) {
      const activeColors = {
        default: 'bg-primary-500 text-white',
        primary: 'bg-primary-500 text-white',
        secondary: 'bg-secondary-500 text-white',
        rare: 'bg-rare-500 text-white',
        legendary: 'bg-legendary-500 text-white',
        gold: 'bg-gold-500 text-dark-900'
      }
      return activeColors[color as keyof typeof activeColors] || activeColors.default
    } else {
      const inactiveColors = {
        default: 'text-gray-300',
        primary: 'text-primary-400',
        secondary: 'text-secondary-400', 
        rare: 'text-rare-400',
        legendary: 'text-legendary-400',
        gold: 'text-gold-400'
      }
      return inactiveColors[color as keyof typeof inactiveColors] || inactiveColors.default
    }
  }
  
  return (
    <Menu as="div" className={`relative inline-block text-left w-full ${className}`}>
      <Menu.Button className={`inline-flex w-full justify-between items-center rounded-lg border-2 px-4 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 transition-all duration-200 ${buttonVariants[variant]}`}>
        <span className="flex items-center">
          {selectedItem?.icon && <span className="mr-2">{selectedItem.icon}</span>}
          {selectedItem?.label || placeholder}
        </span>
        <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right divide-y divide-dark-600 rounded-lg bg-dark-800 border-2 border-dark-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="px-1 py-1">
            {items.map((item) => (
              <Menu.Item key={item.value}>
                {({ active }) => (
                  <button
                    onClick={() => onSelect(item.value)}
                    className={`${getItemColorClasses(item.color || 'default', active)} group flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors duration-150 font-medium`}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown