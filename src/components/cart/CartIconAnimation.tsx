'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface CartIconAnimationProps {
  quantity: number
  trigger: number // Used to trigger animation
}

export default function CartIconAnimation({ quantity, trigger }: CartIconAnimationProps) {
  const animationRef = useRef<HTMLDivElement>(null)
  const previousTrigger = useRef(trigger)

  useEffect(() => {
    // Only animate when trigger changes (item added)
    if (trigger !== previousTrigger.current && trigger > 0) {
      previousTrigger.current = trigger

      const element = animationRef.current
      if (!element) return

      // Reset position and opacity
      gsap.set(element, {
        opacity: 1,
        y: 0,
        scale: 0.5,
      })

      // Animate up and fade out
      gsap.to(element, {
        y: -40,
        opacity: 0,
        scale: 1.2,
        duration: 0.8,
        ease: 'power2.out',
      })
    }
  }, [trigger])

  return (
    <div
      ref={animationRef}
      className="absolute -top-2 -right-2 pointer-events-none opacity-0"
      style={{ zIndex: 100 }}
    >
      <div className="bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1 shadow-lg">
        +{quantity}
      </div>
    </div>
  )
}
