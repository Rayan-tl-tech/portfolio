import { useState, useEffect, useRef } from 'react';
import { handleSpotlightMouseMove } from '../utils/spotlight';

export default function Services() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      number: '01',
      title: 'Business Websites',
      description:
        'Modern and professional websites designed for businesses and brands.',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Landing Pages',
      description:
        'Focused landing pages designed around a specific product, service or objective.',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'E-commerce Websites',
      description:
        'Modern online stores with product catalogs, shopping carts and ordering functionality.',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="services"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-24 sm:scroll-mt-32"
    >
      <div className="mx-auto max-w-7xl">
        <div
          ref={sectionRef}
          className={`section-reveal ${isVisible ? 'visible' : ''}`}
        >
          {/* Section Header */}
          <div className="mb-12 sm:mb-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
              <div>
                <span className="text-[11px] sm:text-xs font-medium tracking-[0.2em] text-violet-500 uppercase mb-3 sm:mb-4 block">
                  Capabilities
                </span>
                <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight">
                  <span className="text-white">What I </span>
                  <span className="text-violet-500">Do</span>
                </h2>
              </div>
              <div>
                <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-lg">
                  Thoughtful digital solutions built to present your business at its best.
                </p>
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <div
                key={service.number}
                onMouseMove={handleSpotlightMouseMove}
                className={`service-card spotlight-card relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 overflow-hidden group cursor-default transition-all duration-[600ms] ease-out hover:border-violet-500/30 shadow-lg ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[18px]'
                }`}
                style={{
                  transitionDelay: isVisible ? `${idx * 100}ms` : '0ms',
                }}
              >
                {/* Subtle Grid texture */}
                <div
                  className="absolute inset-0 card-grid-bg opacity-40 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-start justify-between mb-12 sm:mb-16">
                      <span className="text-sm text-white/30 font-mono">
                        {service.number}
                      </span>
                      <div className="service-icon flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-transparent">
                        <div className="text-white/70">{service.icon}</div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 tracking-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Hover Accent Bar */}
                  <div className="mt-12 sm:mt-16 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <div className="service-accent h-full w-0 bg-violet-500 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
