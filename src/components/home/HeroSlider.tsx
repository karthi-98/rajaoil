// Hero Slider Component
// Following modular programming best practices
'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import { useFirestoreDocument } from '@/hooks'
import type { HomepageData, SliderImage } from '@/lib/types/firebase.types'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

/**
 * HeroSlider Component
 * Fetches slider images from Firestore and displays them using Swiper
 *
 * Firestore structure:
 * - Collection: rajaoil
 * - Document: others
 * - Field: homepageSlider (array of images)
 */
export default function HeroSlider() {
  const { data, loading, error } = useFirestoreDocument<HomepageData>('rajaoil', 'others')
  const [slides, setSlides] = useState<SliderImage[]>([])

  useEffect(() => {
    console.log('🔥 Firestore Data:', data)
    console.log('📊 Loading:', loading)
    console.log('❌ Error:', error)

    if (data && data.homepageSlider) {
      console.log('✅ Homepage Slider Data:', data.homepageSlider)
      console.log('📸 Number of slides:', data.homepageSlider.length)

      // Convert array to proper format (handle both string URLs and objects)
      const normalizedSlides = data.homepageSlider.map((item: any, index: number) => {
        // If item is a string (just URL), convert to object
        if (typeof item === 'string') {
          return {
            url: item,
            alt: `Slide ${index + 1}`,
            order: index
          }
        }
        // If already an object, ensure it has required fields
        return {
          url: item.url || item,
          alt: item.alt || `Slide ${index + 1}`,
          title: item.title,
          description: item.description,
          link: item.link,
          order: item.order !== undefined ? item.order : index
        }
      })

      // Sort slides by order
      const sortedSlides = [...normalizedSlides].sort((a, b) => {
        return (a.order || 0) - (b.order || 0)
      })

      setSlides(sortedSlides)
      console.log('🎯 Normalized & Sorted slides:', sortedSlides)
    }
  }, [data])

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading slider...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Failed to load slider</p>
          <p className="text-gray-600 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  // No slides state
  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No slider images available</p>
          <p className="text-gray-500 text-sm mt-2">
            Add images to Firestore: rajaoil → others → homepageSlider
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={slides.length > 1}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideContent slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

/**
 * SlideContent Component
 * Individual slide content with image and optional text overlay
 */
interface SlideContentProps {
  slide: SliderImage
}

function SlideContent({ slide }: SlideContentProps) {
  // Debug: Log image URL
  console.log('🖼️ Rendering slide with URL:', slide.url)

  const slideContent = (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Image */}
      <img
        src={slide.url}
        alt={slide.alt}
        className="w-full h-full object-cover"
        onLoad={() => console.log('✅ Image loaded:', slide.url)}
        onError={(e) => console.error('❌ Image failed to load:', slide.url, e)}
      />

      {/* Gradient Overlay */}
      {(slide.title || slide.description) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}

      {/* Text Content Overlay */}
      {(slide.title || slide.description) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-center text-white">
              {slide.title && (
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
              )}
              {slide.description && (
                <p className="text-lg md:text-xl lg:text-2xl drop-shadow-lg">
                  {slide.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Wrap in link if URL is provided
  if (slide.link) {
    return (
      <a href={slide.link} className="block">
        {slideContent}
      </a>
    )
  }

  return slideContent
}
