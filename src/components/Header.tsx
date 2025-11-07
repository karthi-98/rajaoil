'use client'

import { ShoppingCart, X, Menu } from 'lucide-react'
import { useState } from 'react'
import { useCartContext } from '@/contexts/CartContext'
import CartIconAnimation from './cart/CartIconAnimation'

export default function Header() {
  const [activeMenu, setActiveMenu] = useState('Menu')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { itemCount, openCart, animationTrigger, lastAddedQuantity } = useCartContext()

  const menuItems = [
    { name: 'Menu', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Our specials', href: '#' },
    { name: 'Our locations', href: '#' },
    { name: 'Blog', href: '#' },
  ]

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black">Raja Oil</h1>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex space-x-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveMenu(item.name)}
                className={`px-4 py-2 rounded-md text-[17px] font-medium transition-all duration-200 ${
                  activeMenu === item.name
                    ? 'text-primary'
                    : 'text-black hover:text-primary'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Side - Cart Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={openCart}
              className="p-2 text-black hover:text-primary relative rounded-full transition-all duration-200"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
              <CartIconAnimation quantity={lastAddedQuantity} trigger={animationTrigger} />
            </button>
          </div>

          {/* Mobile menu button and cart */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Cart Button (Mobile) */}
            <button
              onClick={openCart}
              className="p-2 text-black hover:text-primary relative rounded-full transition-all duration-200"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
              <CartIconAnimation quantity={lastAddedQuantity} trigger={animationTrigger} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:text-primary"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleMenuClick(item.name)}
                className={`block px-4 py-3 rounded-md text-[14px] font-medium transition-all duration-200 ${
                  activeMenu === item.name
                    ? 'text-primary'
                    : 'text-black hover:text-primary'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}