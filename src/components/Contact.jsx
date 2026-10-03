import { useState, useEffect, useRef } from 'react';

export default function Contact() {
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
      { threshold: 0.05, rootMargin: '120px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactLinks = [
    {
      label: 'Email',
      value: 'rayan.taleb.dev@gmail.com',
      href: 'mailto:rayan.taleb.dev@gmail.com',
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'Rayan Taleb',
      href: 'https://linkedin.com',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: 'Rayan-tl-tech',
      href: 'https://github.com/Rayan-tl-tech',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      value: 'rayan__dev',
      href: 'https://instagram.com/rayan__dev',
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24 sm:scroll-mt-32"
    >
      {/* Subtle purple glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-15 blur-[150px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          ref={sectionRef}
          className={`section-reveal ${isVisible ? 'visible' : ''}`}
        >
          {/* Top: Section Label */}
          <div className="mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.2em] text-violet-500 uppercase">
              Start a Conversation
            </span>
          </div>

          {/* Main CTA Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12 mb-16 sm:mb-20">
            {/* Heading */}
            <h2 className="text-[clamp(3rem,8vw,8rem)] font-extrabold leading-[0.95] tracking-tight">
              <span className="block text-white">Have a project</span>
              <span className="block text-violet-500">in mind?</span>
            </h2>

            {/* Large circular CTA button */}
            <a
              href="mailto:rayan.taleb.dev@gmail.com"
              className="cta-circle flex-shrink-0 flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-violet-600 hover:bg-violet-500 text-white shadow-xl shadow-violet-600/30"
              aria-label="Send email to Rayan Taleb"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>

          {/* Subtitle + Secondary CTA Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 sm:pb-16 border-b border-white/10">
            <p className="text-lg sm:text-xl text-white/60">
              Let's build something great together.
            </p>
            <a
              href="mailto:rayan.taleb.dev@gmail.com"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-violet-600/25 flex-shrink-0"
            >
              Let's Work Together
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Contact Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {contactLinks.map((link, index) => {
              const isExternal = link.href.startsWith('http');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={`contact-link flex items-center gap-4 px-6 py-8 ${
                    index < contactLinks.length - 1 ? 'lg:border-r' : ''
                  } ${index < 2 ? 'sm:border-b lg:border-b-0' : ''} border-white/10`}
                >
                  <div className="contact-icon-box flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] text-white/80 flex-shrink-0">
                    {link.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-medium text-sm sm:text-base">
                      {link.label}
                    </div>
                    <div className="text-white/50 text-xs sm:text-sm mt-0.5 truncate">
                      {link.value}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
