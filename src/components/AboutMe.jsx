import { useState, useEffect, useRef } from 'react';

export default function AboutMe() {
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

  const infoItems = [
    { number: '01', label: 'Web Developer' },
    { number: '02', label: 'Software Engineer' },
    { number: '03', label: '2nd Year Computer Science Student' },
    { number: '04', label: 'Based in Algeria' },
  ];

  return (
    <section
      id="about"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24 sm:scroll-mt-32"
    >
      <div className="mx-auto max-w-7xl">
        <div
          ref={sectionRef}
          className={`section-reveal ${isVisible ? 'visible' : ''}`}
        >
          {/* Section Header Tag */}
          <div className="mb-10 sm:mb-14">
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.2em] text-violet-500 uppercase mb-4 block">
              About Me
            </span>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
            {/* Left: RT Monogram Background */}
            <div className="hidden lg:flex items-center justify-center relative select-none pointer-events-none">
              <div
                className="text-[18rem] xl:text-[22rem] font-black text-white/[0.03] leading-none tracking-tighter"
                aria-hidden="true"
              >
                RT
              </div>
            </div>

            {/* Right: Content & Highlights */}
            <div>
              {/* Heading */}
              <h2 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold leading-[1.1] tracking-tight mb-8 sm:mb-10">
                I turn ideas into{' '}
                <span className="text-violet-500">clear, polished</span>{' '}
                digital experiences.
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mb-12 sm:mb-16">
                I'm Rayan, a Computer Science student and Web Developer focused on
                creating modern, responsive and professional websites.
              </p>

              {/* Info Highlights Grid */}
              <div className="grid sm:grid-cols-2 gap-0 border-t border-white/10">
                {infoItems.map((item, idx) => (
                  <div
                    key={item.number}
                    className={`flex items-center gap-4 py-6 border-b border-white/10 ${
                      idx % 2 === 0 ? 'sm:border-r sm:border-white/10 sm:pr-8' : 'sm:pl-8'
                    } transition-all duration-[600ms] ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[18px]'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${idx * 80}ms` : '0ms',
                    }}
                  >
                    <span className="text-sm text-violet-500 font-mono font-medium">
                      {item.number}
                    </span>
                    <span className="text-base sm:text-lg font-medium text-white">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
