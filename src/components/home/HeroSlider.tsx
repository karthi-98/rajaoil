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
      const normalizedSlides = data.homepageSlider.map((item: string | SliderImage, index: number) => {
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
          url: item.url || '',
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
      <section className="w-full relative px-4 sm:px-6 lg:px-8 py-6 pb-2">
        <div className="max-w-[1600px] mx-auto">
          <div className="w-full h-[80vh] bg-gray-200 animate-pulse flex items-center justify-center rounded-2xl shadow-lg">
            <div className="text-gray-500">Loading slider...</div>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="w-full relative px-4 sm:px-6 lg:px-8 py-6 pb-2">
        <div className="max-w-[1600px] mx-auto">
          <div className="w-full h-[80vh] bg-gray-100 flex items-center justify-center rounded-2xl shadow-lg">
            <div className="text-center">
              <p className="text-red-600 font-semibold">Failed to load slider</p>
              <p className="text-gray-600 text-sm mt-2">{error.message}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // No slides state
  if (!slides || slides.length === 0) {
    return (
      <section className="w-full relative px-4 sm:px-6 lg:px-8 py-6 pb-2">
        <div className="max-w-[1600px] mx-auto">
          <div className="w-full h-[80vh] bg-gray-100 flex items-center justify-center rounded-2xl shadow-lg">
            <div className="text-center">
              <p className="text-gray-600">No slider images available</p>
              <p className="text-gray-500 text-sm mt-2">
                Add images to Firestore: rajaoil → others → homepageSlider
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full relative px-4 sm:px-6 lg:px-8 py-6 pb-2 overflow-hidden">
      {/* Background decorative images - Left side */}
      <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[20vw] h-[80vh] pointer-events-none">
        <img
          src="/images/background/coconut-min.png"
          alt="Coconut oil background"
          className="absolute top-[10%] left-[5%] w-32 h-32 object-contain animate-float mix-blend-multiply"
          style={{ animationDelay: '0s' }}
        />
        <img
          src="/images/background/sesame-min.png"
          alt="Sesame oil background"
          className="absolute bottom-[15%] left-[10%] w-40 h-40 object-contain animate-float mix-blend-multiply"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Background decorative images - Right side */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[20vw] h-[80vh] pointer-events-none">
        <img
          src="/images/background/ground nut-min.png"
          alt="Ground nut oil background"
          className="absolute top-[15%] right-[10%] w-36 h-36 object-contain animate-float mix-blend-multiply"
          style={{ animationDelay: '1s' }}
        />
        <img
          src="/images/background/Jangery-min.png"
          alt="Jaggery background"
          className="absolute bottom-[10%] right-[5%] w-32 h-32 object-contain animate-float mix-blend-multiply"
          style={{ animationDelay: '3s' }}
        />
      </div>

      <div className="md:w-[60vw] mx-auto relative z-10">
        <div className="relative">
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
              dynamicBullets: false,
              el: '.hero-swiper-pagination',
            }}
            navigation={{
              nextEl: '.hero-swiper-button-next',
              prevEl: '.hero-swiper-button-prev',
            }}
            loop={slides.length > 1}
            className="hero-swiper-main rounded-2xl overflow-hidden shadow-lg"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <SlideContent slide={slide} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          {slides.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous slide"
                className="hero-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-primary hover:text-white text-gray-800 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next slide"
                className="hero-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-primary hover:text-white text-gray-800 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Premium Pagination Below Slider */}
        {slides.length > 1 && (
          <div className="hero-swiper-pagination flex justify-center gap-2 mt-6"></div>
        )}
      </div>
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
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
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
