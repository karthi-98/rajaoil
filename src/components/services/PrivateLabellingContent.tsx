"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PrivateLabellingContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    gsap.fromTo(
      content.children,
      {
        y: 50,
        opacity: 0,
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
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const sections = [
    {
      title: "Private Labelling Services",
      items: [
        "Your brand label on bottles, pouches, tins, or cans",
        "Support with design, artwork, and nutrition details",
        "Proper batch coding, MRP, and FSSAI guidelines",
        "Reliable production and consistent quality",
        "Fast delivery for both local and export clients",
      ],
      bgColor: "from-primary/5 to-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "OEM Solutions",
      items: [
        "Complete contract manufacturing under your specifications",
        "Flexible packaging options (bottles, pouches, tins, drums)",
        "Custom formulations and blends as per requirements",
        "Confidential production for your brand",
        "Scalable production capacity for growing demand",
      ],
      bgColor: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Why Partner With Us",
      items: [
        "3 generations of oil expertise",
        "Trusted in both local and export markets",
        "Traditional extraction with modern hygiene",
        "Pure oils with no chemicals or refining",
        "Honest pricing with dependable supply",
        "Strong business support for brand growth",
      ],
      bgColor: "from-green-50 to-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-5xl">🏷️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Oil, Your Brand
          </h1>
          <p className="text-xl text-primary font-semibold mb-6">
            Private Labelling & OEM Solutions
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We offer full private labelling and contract manufacturing (OEM) for businesses looking to launch or expand their own brand.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether youre a retailer, distributor, exporter, or online seller, we produce and pack oil under your brand name, maintaining complete confidentiality.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-br ${section.bgColor} rounded-xl p-6`}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start">
                      <svg
                        className={`w-5 h-5 ${section.iconColor} mt-0.5 mr-3 flex-shrink-0`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center border border-primary/20">
          <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6 italic">
            We take care of production — you grow your brand with confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Get Started with Private Labelling
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 border-2 border-primary"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
