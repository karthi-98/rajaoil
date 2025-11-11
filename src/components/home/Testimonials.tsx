'use client'

import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  comment: string
  date: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    comment: 'The quality of oil is exceptional! We have been using Mithra brand for over a year now and the taste and purity is unmatched. Highly recommend for authentic cooking.',
    date: 'December 2024'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Bangalore, Karnataka',
    rating: 5,
    comment: 'Best cooking oil I have ever used. The packaging is excellent and the delivery was very fast. My family loves the natural aroma and taste it adds to our food.',
    date: 'November 2024'
  },
  {
    id: 3,
    name: 'Lakshmi Iyer',
    location: 'Coimbatore, Tamil Nadu',
    rating: 5,
    comment: 'Pure and authentic oil! I trust this brand completely for my family. The oil is fresh and you can see the quality in every drop. Worth every penny!',
    date: 'November 2024'
  },
  {
    id: 4,
    name: 'Arun Prakash',
    location: 'Madurai, Tamil Nadu',
    rating: 5,
    comment: 'Outstanding quality and service! The oils are 100% pure and natural. I have recommended this to all my friends and family. Keep up the great work!',
    date: 'October 2024'
  },
  {
    id: 5,
    name: 'Meera Devi',
    location: 'Trichy, Tamil Nadu',
    rating: 5,
    comment: 'Excellent product! The traditional cold-pressed method really makes a difference. My cooking has improved significantly since switching to this brand.',
    date: 'October 2024'
  },
  {
    id: 6,
    name: 'Suresh Babu',
    location: 'Salem, Tamil Nadu',
    rating: 5,
    comment: 'Very satisfied with the quality and taste. The oil is fresh, pure, and reasonably priced. Customer service is also very responsive and helpful.',
    date: 'September 2024'
  }
]

export default function Testimonials() {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-3 h-3 ${
              index < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="relative bg-gray-50 py-16 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 px-4 sm:px-6 lg:px-8">
          <div className="inline-block mb-3">
            <span className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Customer Reviews
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our valued customers have to say about our premium quality oils.
          </p>
        </div>

        {/* Testimonials Infinite Scroll - Full Width */}
        <div className="relative mb-10">
          {/* Left Gradient Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"></div>

          {/* Right Gradient Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden pb-4">
            <div className="flex gap-6 animate-scroll-left hover:pause-animation">
            {/* First set of testimonials */}
            {testimonials.map((testimonial) => (
              <div
                key={`first-${testimonial.id}`}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 relative border border-white/50 hover:-translate-y-1 flex-shrink-0 w-[350px]"
              >
                {/* Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                {/* Quote Icon */}
                <div className="absolute top-3 right-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-3">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Comment */}
                <p className="text-gray-700 text-sm mb-3 leading-relaxed line-clamp-4 relative z-10">
                  &quot;{testimonial.comment}&quot;
                </p>

                {/* Customer Info */}
                <div className="pt-3 border-t border-gray-100 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                    <div className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                      {testimonial.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial) => (
              <div
                key={`second-${testimonial.id}`}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 relative border border-white/50 hover:-translate-y-1 flex-shrink-0 w-[350px]"
              >
                {/* Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                {/* Quote Icon */}
                <div className="absolute top-3 right-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-3">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Comment */}
                <p className="text-gray-700 text-sm mb-3 leading-relaxed line-clamp-4 relative z-10">
                  &quot;{testimonial.comment}&quot;
                </p>

                {/* Customer Info */}
                <div className="pt-3 border-t border-gray-100 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                    <div className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                      {testimonial.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
