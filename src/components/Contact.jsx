import { useRef } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { sanitizeUrl } from '../utils/security';

const CONTACT_METHODS = [
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
    label: 'WhatsApp',
    value: '+213 551 95 58 89',
    href: 'https://wa.me/213551955889',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Rayan Taleb',
    href: 'https://www.linkedin.com/in/rayan-taleb-736ab5438/',
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
    value: 'rayan._.dev',
    href: 'https://www.instagram.com/rayan._.dev/',
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

export default function Contact() {
  const { ref: sectionRef, isVisible } = useRevealOnScroll({
    threshold: 0.05,
    rootMargin: '120px',
  });
  const magneticWrapperRef = useRef(null);
  const magneticBtnRef = useRef(null);
  const magneticArrowRef = useRef(null);

  const handleMagneticMove = (e) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!magneticWrapperRef.current || !magneticBtnRef.current) return;

    const rect = magneticWrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Subtle magnetic attraction: max 8px for button, max 12px for arrow icon
    const pullX = Math.max(-8, Math.min(8, deltaX * 0.18));
    const pullY = Math.max(-8, Math.min(8, deltaY * 0.18));

    const arrowX = Math.max(-12, Math.min(12, deltaX * 0.28));
    const arrowY = Math.max(-12, Math.min(12, deltaY * 0.28));

    magneticBtnRef.current.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
    magneticBtnRef.current.style.transition = 'transform 0.1s ease-out';

    if (magneticArrowRef.current) {
      magneticArrowRef.current.style.transform = `translate3d(${arrowX}px, ${arrowY}px, 0)`;
      magneticArrowRef.current.style.transition = 'transform 0.1s ease-out';
    }
  };

  const handleMagneticLeave = () => {
    if (!magneticBtnRef.current) return;
    magneticBtnRef.current.style.transform = 'translate3d(0, 0, 0)';
    magneticBtnRef.current.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';

    if (magneticArrowRef.current) {
      magneticArrowRef.current.style.transform = 'translate3d(0, 0, 0)';
      magneticArrowRef.current.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24 sm:scroll-mt-32"
    >
      {/* Subtle purple ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-15 blur-[150px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          ref={sectionRef}
          className={`section-reveal ${isVisible ? 'visible' : ''}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Heading, Context & Primary Action */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6 sm:mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] sm:text-xs font-medium tracking-[0.18em] text-white/70 uppercase">
                    Start a Conversation
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-[clamp(2.75rem,5.5vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight">
                  <span className="block text-white">Have a project</span>
                  <span className="block text-violet-500">in mind?</span>
                </h2>

                {/* Engaging Description */}
                <p className="mt-6 text-base sm:text-lg text-white/60 max-w-md leading-relaxed">
                  Let's build something great together. Whether you need a full website, a focused landing page, or want to discuss a new concept, feel free to reach out.
                </p>
              </div>

              {/* Primary Email CTA (Single action, with magnetic tracking) */}
              <div
                ref={magneticWrapperRef}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="mt-8 sm:mt-10 inline-block self-start"
              >
                <a
                  ref={magneticBtnRef}
                  href="mailto:rayan.taleb.dev@gmail.com"
                  className="inline-flex items-center gap-3.5 bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm sm:text-base px-7 py-4 rounded-full transition-all duration-200 shadow-lg shadow-black/30 hover:shadow-black/50 will-change-transform group"
                  aria-label="Send email to Rayan Taleb"
                >
                  <span>Send an Email</span>
                  <div
                    ref={magneticArrowRef}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors will-change-transform"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: 5 Contact Cards (Uniform Dimensions & Monochrome Hierarchy) */}
            <div className="md:col-span-7 flex flex-col space-y-3 sm:space-y-3.5">
              {CONTACT_METHODS.map((link) => {
                const { safeUrl, isExternal } = sanitizeUrl(link.href);
                return (
                  <a
                    key={link.label}
                    href={safeUrl}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="contact-card group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    aria-label={`${link.label}: ${link.value}`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-white/10 bg-white/[0.03] text-white/70 group-hover:text-white group-hover:border-violet-500/40 group-hover:bg-violet-500/10 transition-all duration-300 flex-shrink-0">
                        {link.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-white/50 uppercase tracking-wider">
                          {link.label}
                        </div>
                        <div className="text-sm sm:text-base font-medium text-white group-hover:text-violet-300 transition-colors duration-200 truncate mt-0.5">
                          {link.value}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/40 group-hover:text-white group-hover:border-violet-500/40 group-hover:bg-violet-500/10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 ml-4">
                      <svg
                        width="15"
                        height="15"
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
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
