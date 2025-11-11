'use client'

import { ShoppingCart, X, Menu } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartContext } from '@/contexts/CartContext'
import CartIconAnimation from './cart/CartIconAnimation'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { itemCount, openCart, animationTrigger, lastAddedQuantity } = useCartContext()

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const handleMenuClick = () => {
    setMobileMenuOpen(false)
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm h-[10vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex md:grid md:grid-cols-3 items-center justify-between md:justify-normal h-full">
          {/* Logo - Left */}
          <div className="flex justify-start">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 md:gap-3">
              <Image
                src="/images/logo_image.webp"
                alt="Sreerajaganapathy Oil Mill"
                width={50}
                height={50}
                className="h-10 w-10 md:h-12 md:w-12 object-contain"
                priority
              />
              <span className="text-black font-bold text-xs sm:text-sm md:text-lg lg:text-xl tracking-tight">
                SREERAJAGANAPATHYOILMILL
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Menu - Center */}
          <nav className="hidden md:flex justify-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-md text-[15px] font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-black hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Cart Button (Desktop) */}
          <div className="hidden md:flex items-center justify-end">
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
              <Link
                key={item.name}
                href={item.href}
                onClick={handleMenuClick}
                className={`block px-4 py-3 rounded-md text-[14px] font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-black hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}