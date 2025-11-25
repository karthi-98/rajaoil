// OurServices Section Component
// Displays the services offered by the company
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OurServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;

    if (!section || !bg || !content) return;

    // Parallax effect for background
    gsap.fromTo(bg,
      {
        yPercent: -20,
      },
      {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // Animate content on scroll
    gsap.fromTo(content.children,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  interface Service {
    icon: string;
    title: string;
    description?: string;
    details?: string;
    points?: string[];
    footer?: string;
    platforms?: string[];
    benefits?: string[];
  }

  const services: Service[] = [
    {
      icon: "🏪",
      title: "Local Market Trading & Bulk Supply",
      description: "We supply high-quality gingelly, groundnut, and coconut oil to retailers, wholesalers, supermarkets, restaurants, sweet and snack manufacturers, bakeries, and catering units.",
      details: "For bulk buyers, we offer 5L / 10L / 15L cans, 15kg tins, and 200L barrels, ensuring consistent quality, timely delivery, and reliable long-term supply for all business requirements."
    },
    {
      icon: "🌍",
      title: "Export Services",
      points: [
        "Strict quality selection",
        "Hygienic handling and packing",
        "Export-grade container drums",
        "Support for documentation & logistics",
        "Regular supply for long-term clients"
      ],
      footer: "Our oils maintain the traditional flavour and purity that global customers expect."
    },
    {
      icon: "🛒",
      title: "Retail & Online Sales",
      description: "Purchase our premium quality cooking oils conveniently through multiple channels. We make it easy for customers to access authentic, traditionally processed oils wherever they prefer to shop.",
      platforms: [
        "Direct sales through our website with home delivery",
        "Available on Amazon for quick and reliable delivery",
        "Listed on BigBasket for grocery convenience",
        "Featured on other leading e-commerce platforms"
      ],
      benefits: [
        "Authentic traditional oils delivered to your doorstep",
        "Quality assurance with every purchase",
        "Easy online ordering and secure payment",
        "Fast delivery across locations",
        "Customer reviews and ratings for transparency"
      ],
      footer: "Shop with confidence — pure quality oils, delivered fresh to your home"
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-[140%] -top-[20%]"
          style={{
            backgroundImage: 'url("/images/bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - First Two Services Stacked */}
          <div className="space-y-8">
            {services.slice(0, 2).map((service, index) => (
              <div key={index} className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl flex-shrink-0">{service.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    {service.description && (
                      <p className="text-sm text-gray-700 leading-relaxed">{service.description}</p>
                    )}
                  </div>
                </div>

                {/* Details */}
                {service.details && (
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{service.details}</p>
                )}

                {/* Points List */}
                {service.points && (
                  <ul className="space-y-2 mb-4">
                    {service.points.map((point: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Footer */}
                {service.footer && (
                  <p className="text-sm text-gray-700 font-medium mt-4 italic">{service.footer}</p>
                )}
              </div>
            ))}
          </div>

          {/* Right Column - Third Service */}
          <div className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl flex-shrink-0">{services[2].icon}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{services[2].title}</h3>
                {services[2].description && (
                  <p className="text-sm text-gray-700 leading-relaxed">{services[2].description}</p>
                )}
              </div>
            </div>

            {/* Platforms */}
            {services[2].platforms && (
              <div className="mt-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5">
                <h4 className="text-base font-bold text-gray-900 mb-3">Where to Buy</h4>
                <ul className="space-y-2">
                  {services[2].platforms.map((platform: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-4 h-4 text-orange-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">{platform}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {services[2].benefits && (
              <div className="mt-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5">
                <h4 className="text-base font-bold text-gray-900 mb-3">Shopping Benefits</h4>
                <ul className="space-y-2">
                  {services[2].benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer */}
            {services[2].footer && (
              <p className="text-sm text-gray-700 font-medium mt-6 italic">{services[2].footer}</p>
            )}
          </div>
        </div>

        {/* Separate CTA Section Below Grid */}
        <div className="mt-16">
          <a
            href="/private-labelling"
            className="block bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 md:p-10 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary group"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Side - Content */}
              <div className="flex items-center gap-6 flex-1">
                <div className="bg-primary/10 rounded-2xl p-2 group-hover:bg-primary/20 transition-colors duration-300">
                  <span className="text-3xl">🏷️</span>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                    Our Oil, Your Brand
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Private Labelling & OEM Solutions for Your Business
                  </p>
                </div>
              </div>

              {/* Right Side - CTA */}
              <div className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl group-hover:bg-primary/90 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-105">
                <span className="font-semibold text-lg">Learn More</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
