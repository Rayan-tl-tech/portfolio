import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'work', 'about', 'services', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work', section: 'work' },
    { label: 'About', href: '#about', section: 'about' },
    { label: 'Services', href: '#services', section: 'services' },
    { label: 'Contact', href: '#contact', section: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'border-white/10 bg-black/75 backdrop-blur-xl shadow-2xl shadow-black/50'
            : 'border-white/[0.08] bg-black/25 backdrop-blur-md'
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 py-4">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
            aria-label="Rayan.dev home"
          >
            <span className="text-violet-500 text-xl font-bold tracking-tight transition-transform group-hover:scale-105">
              &lt;/&gt;
            </span>
            <span className="text-white font-semibold text-lg tracking-tight">
              Rayan.dev
            </span>
          </a>

          {/* Desktop Navigation Links with Active Scroll Indicator */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 pb-1 ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500 rounded-full animate-in fade-in zoom-in-95 duration-200" />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-violet-600/20"
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

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="md:hidden text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-base font-medium transition-colors ${
                    isActive ? 'text-violet-400 font-semibold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-3 rounded-xl transition-all"
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
        )}
      </div>
    </nav>
  );
}
