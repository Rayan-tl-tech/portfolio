import { useState, useEffect } from 'react';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop]);

  const parallaxStyle = isDesktop
    ? {
        transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
        transition: 'transform 0.3s ease-out',
      }
    : {};

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle purple atmospheric glow */}
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
        {/* LEFT: Text Content */}
        <div className="order-2 lg:order-1">
          {/* Status Indicator */}
          <div className="reveal-line flex items-center gap-2.5 mb-8 sm:mb-10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.2em] text-white/70 uppercase">
              Available for selected projects
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-extrabold leading-[0.95] tracking-tight">
            <span className="reveal-line reveal-line-delay-1 block text-[clamp(2.75rem,7.5vw,7rem)] text-white">
              Web Developer
            </span>
            <span className="reveal-line reveal-line-delay-2 block text-[clamp(1.75rem,4.5vw,4rem)] text-white/40 font-light my-1 sm:my-2">
              &amp;
            </span>
            <span className="reveal-line reveal-line-delay-3 block text-[clamp(2.75rem,7.5vw,7rem)] text-white">
              Software
            </span>
            <span className="reveal-line reveal-line-delay-4 block text-[clamp(2.75rem,7.5vw,7rem)] text-violet-500">
              Engineer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="reveal-line reveal-line-delay-5 mt-8 sm:mt-10 text-base sm:text-lg text-white/60 max-w-lg leading-relaxed">
            I build modern websites that help businesses stand out online.
          </p>

          {/* CTA Buttons */}
          <div className="reveal-line reveal-line-delay-6 mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2.5 bg-violet-600 hover:bg-violet-500 text-white font-medium px-7 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-violet-600/25 text-sm sm:text-base"
            >
              View My Work
              <svg
                width="18"
                height="18"
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
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 border border-white/15 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.06] text-white font-medium px-7 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
            >
              Let's Work Together
            </a>
          </div>

          {/* Bottom Meta */}
          <div className="reveal-line reveal-line-delay-7 mt-14 sm:mt-20 flex items-center gap-4 text-[11px] sm:text-xs tracking-[0.15em] text-white/40 uppercase">
            <span>Based in Algeria</span>
            <span className="w-12 h-px bg-white/20" />
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* RIGHT: Portrait Card */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="portrait-enter relative w-full max-w-[480px] lg:max-w-none">
            <div
              className="relative rounded-[28px] sm:rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden shadow-2xl shadow-black/60"
              style={parallaxStyle}
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="/portrait.jpg"
                  alt="Rayan Taleb — Web Developer and Software Engineer"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="eager"
                />

                {/* Gradient overlay for text readability */}
                <div
                  className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.5) 50%, transparent 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Available Badge */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs font-medium text-white">Available</span>
                </div>

                {/* Name & Role */}
                <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                  <h2 className="text-white font-semibold text-lg sm:text-xl">
                    Rayan Taleb
                  </h2>
                  <p className="text-white/60 text-sm mt-0.5">Web Developer</p>
                </div>

                {/* Rotated Technical Identifier */}
                <div
                  className="absolute right-3 sm:right-5 top-1/2 text-[10px] sm:text-xs tracking-[0.2em] text-white/40 font-medium"
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center',
                    whiteSpace: 'nowrap',
                  }}
                  aria-hidden="true"
                >
                  RT / 01
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
