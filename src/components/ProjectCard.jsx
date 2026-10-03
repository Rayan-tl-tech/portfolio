import { useState, useRef, useEffect } from 'react';

export default function ProjectCard({ project, index = 0 }) {
  const [activeThumbnail, setActiveThumbnail] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const thumbnailScrollRef = useRef(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleThumbnailClick = (id) => {
    setActiveThumbnail(id);
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      thumbnailScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`section-reveal ${
        isVisible ? 'visible' : ''
      } rounded-3xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.03]`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Card Header */}
      <div className="p-6 sm:p-10 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Number, Category, Name */}
          <div>
            <span className="text-sm text-white/40 font-mono">{project.number}</span>
            <h3 className="text-[11px] sm:text-xs font-medium tracking-[0.2em] text-white/60 uppercase mt-4 sm:mt-6 mb-3 sm:mb-4">
              {project.category}
            </h3>
            <h2 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-light text-white leading-[1.05] tracking-tight">
              {project.name}
            </h2>
          </div>

          {/* Right: Description, Tech, CTA */}
          <div className="flex flex-col justify-between">
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {project.description}
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm text-white/50">{project.tech}</span>
              <a
                href={project.projectUrl || '#'}
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-violet-400 transition-colors duration-200 group"
              >
                View project
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="px-4 sm:px-6 lg:px-8 pb-4">
        <div
          className={`relative rounded-t-2xl sm:rounded-t-3xl ${project.bgColor} project-grid-pattern overflow-hidden`}
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            {/* Browser-like frame */}
            <div className="absolute inset-3 sm:inset-6 lg:inset-8 rounded-lg sm:rounded-xl bg-[#0a0a0f] border border-white/15 overflow-hidden shadow-2xl flex flex-col">
              {/* Browser Window Content */}
              {project.previewType === 'maison-ember' ? (
                /* Maison Ember Live Preview */
                <div className="relative w-full h-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-[#121110]">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=80"
                    alt="Maison Ember Culinary Presentation"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                  {/* Top Bar inside frame */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="border border-white/30 px-1.5 py-0.5 text-[10px] font-serif tracking-widest text-white">
                        ME
                      </div>
                      <div>
                        <div className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-white">
                          Maison Ember
                        </div>
                        <div className="text-[9px] tracking-wider text-white/50 uppercase">
                          Restaurant Concept
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 text-xs text-white/70">
                      <span className="text-white border-b border-white pb-0.5">Home</span>
                      <span>Menu</span>
                      <span>Contact</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider bg-[#b8623f] text-white px-3 py-1 rounded">
                      Reserve ↗
                    </div>
                  </div>

                  {/* Main Content inside frame */}
                  <div className="relative z-10 my-auto max-w-xl py-4 sm:py-6">
                    <div className="text-[9px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-white/70 mb-2">
                      A Fictional Dining Concept
                    </div>
                    <h4
                      className="text-white text-xl sm:text-3xl lg:text-4xl font-light leading-tight"
                      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                    >
                      Where fire <span className="text-[#d88965] italic">finds finesse.</span>
                    </h4>
                    <p className="hidden sm:block text-xs sm:text-sm text-white/70 mt-3 line-clamp-2 max-w-md">
                      A cinematic restaurant website concept, designed to turn culinary character into an unforgettable digital experience.
                    </p>
                  </div>

                  {/* Bottom Meta inside frame */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] text-white/40">
                    <span className="font-mono">
                      Page: {project.thumbnails.find((t) => t.id === activeThumbnail)?.label || 'Hero'}
                    </span>
                    <span className="hidden sm:inline uppercase tracking-widest text-[9px]">
                      Scroll to discover
                    </span>
                  </div>
                </div>
              ) : (
                /* Shoplify Live Preview */
                <div className="relative w-full h-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-[#0b0f19]">
                  {/* Top Bar inside frame */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded font-bold">
                        🛍
                      </span>
                      <span className="text-white font-bold text-sm tracking-tight">Shopify</span>
                      <span className="ml-2 bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-medium hidden sm:inline">
                        Shop
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-5 text-xs text-white/60">
                      <span>Orders</span>
                      <span>Admin</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/30 flex items-center justify-center text-[10px] text-indigo-300">
                        T
                      </span>
                      <span className="hidden sm:inline text-[11px]">test123</span>
                    </div>
                  </div>

                  {/* Main Catalog Headline & Visual inside frame */}
                  <div className="relative z-10 grid sm:grid-cols-2 gap-4 items-center my-auto py-2">
                    <div>
                      <span className="text-indigo-400 font-bold tracking-widest uppercase text-[9px] sm:text-[10px] mb-1 block">
                        Premium Collection
                      </span>
                      <h4 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                        Discover products <span className="text-indigo-400">you'll love.</span>
                      </h4>
                      <p className="hidden sm:block text-xs sm:text-sm text-gray-400 mt-2 line-clamp-2">
                        Curated selection of premium goods across every category. Designed for quality and performance.
                      </p>
                      <div className="mt-4 flex gap-2">
                        <span className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium">
                          Shop Catalog
                        </span>
                        <span className="border border-white/20 text-white/70 text-xs px-3 py-1.5 rounded-lg font-medium hidden sm:inline">
                          Browse Deals
                        </span>
                      </div>
                    </div>

                    {/* Featured Product Graphic (Gaming Setup) */}
                    <div className="relative rounded-lg overflow-hidden border border-white/10 bg-slate-900/80 aspect-video flex items-center justify-center shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-slate-900 to-black opacity-90" />
                      <div className="relative z-10 text-center p-3">
                        <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center animate-pulse mb-2">
                          <div className="w-6 h-6 rounded-full bg-cyan-400/80 blur-xs" />
                        </div>
                        <span className="text-[11px] font-mono text-cyan-300 block">ARGB Gaming Rig</span>
                        <span className="text-[10px] text-white/50">High Performance Gear</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Meta inside frame */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] text-white/40">
                    <span className="font-mono">
                      View: {project.thumbnails.find((t) => t.id === activeThumbnail)?.label || 'Home'}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-indigo-400/70">
                      Interactive Demo
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Counter Badge */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 z-20">
              <span className="text-sm font-medium text-white">
                {String(activeThumbnail).padStart(2, '0')}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-sm font-medium text-white/60">
                {String(project.totalThumbnails).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div
          ref={thumbnailScrollRef}
          className="thumbnail-scroll flex gap-3 overflow-x-auto pb-3 scroll-smooth"
        >
          {project.thumbnails.map((thumb) => (
            <button
              key={thumb.id}
              onClick={() => handleThumbnailClick(thumb.id)}
              type="button"
              className={`relative flex-shrink-0 w-32 sm:w-40 aspect-video rounded-lg border-2 overflow-hidden transition-all duration-200 cursor-pointer ${
                activeThumbnail === thumb.id
                  ? 'border-violet-500 scale-[1.02] shadow-lg shadow-violet-500/20'
                  : 'border-white/10 hover:border-white/25 bg-black/40'
              }`}
              aria-label={`View ${thumb.label} screenshot`}
            >
              {/* Thumbnail background */}
              <div className={`absolute inset-0 ${project.bgColor} opacity-30`} />
              <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                <span className="text-white/80 text-xs font-medium line-clamp-1">
                  {thumb.label}
                </span>
              </div>
              {/* Number badge */}
              <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-xs rounded px-1.5 py-0.5 border border-white/10">
                <span className="text-[10px] font-mono text-white/90">
                  {String(thumb.id).padStart(2, '0')}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Progress Bar with navigation arrows */}
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollThumbnails('left')}
            className="text-white/30 hover:text-white transition-colors p-1"
            aria-label="Scroll thumbnails left"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-300"
              style={{
                width: `${(activeThumbnail / project.totalThumbnails) * 100}%`,
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => scrollThumbnails('right')}
            className="text-white/30 hover:text-white transition-colors p-1"
            aria-label="Scroll thumbnails right"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
