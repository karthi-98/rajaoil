'use client'

import { ShoppingCart, X, Menu } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartContext } from '@/contexts/CartContext'
import CartIconAnimation from './cart/CartIconAnimation'
import gsap from 'gsap'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { itemCount, openCart, animationTrigger, lastAddedQuantity } = useCartContext()

  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mobileMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'

      // Animate overlay
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )

      // Animate menu panel sliding from right
      gsap.fromTo(menuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const closeMenu = () => {
    // Animate out
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    })

    gsap.to(menuRef.current, {
      x: '100%',
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => setMobileMenuOpen(false)
    })
  }

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Our Services', href: '/services' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const handleMenuClick = () => {
    closeMenu()
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm h-[12vh]">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex lg:grid lg:grid-cols-3 items-center justify-between lg:justify-normal h-full">
          {/* Logo - Left */}
          <div className="flex justify-start">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 lg:gap-3">
              <Image
                src="/images/logo_new.png"
                alt="sreeraajaganapathy Oil Mill"
                width={1200}
                height={1200}
                className="h-[8vh] w-fit object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Menu - Center */}
          <nav className="hidden lg:flex justify-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-md text-[14px] font-medium transition-all duration-200 ${isActive(item.href)
                  ? 'bg-primary text-white'
                  : 'text-black hover:text-primary hover:bg-primary/5'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Cart Button (Desktop) */}
          <div className="hidden lg:flex items-center justify-end">
            <button
              onClick={openCart}
              className="p-2 text-black hover:text-primary relative rounded-full transition-all duration-200"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="w-10 h-10 hover:bg-red-600 hover:text-white transition-all duration-200 hover:cursor-pointer hover:rounded-full p-2" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
              <CartIconAnimation quantity={lastAddedQuantity} trigger={animationTrigger} />
            </button>
          </div>

          {/* Mobile menu button and cart */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Cart Button (Mobile) */}
            <button
              onClick={openCart}
              className="p-2 text-black hover:text-primary relative rounded-full transition-all duration-200"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="h-7 w-7" />
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

      {/* Mobile Menu Slide-in Panel */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div
            ref={menuRef}
            className="lg:hidden fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <span className="text-lg font-bold text-gray-900">Menu</span>
              <button
                onClick={closeMenu}
                className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleMenuClick}
                  className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${isActive(item.href)
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Menu Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Sree Raaja Ganapathy Oil Mill
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  )
}