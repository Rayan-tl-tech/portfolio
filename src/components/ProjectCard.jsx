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
      const scrollAmount = direction === 'left' ? -220 : 220;
      thumbnailScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const activeThumb =
    project.thumbnails.find((t) => t.id === activeThumbnail) || project.thumbnails[0];

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
              {/* Browser Window Chrome */}
              <div className="h-7 sm:h-8 bg-black/60 border-b border-white/10 px-3 sm:px-4 flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-white/40 bg-white/5 px-3 py-0.5 rounded-md border border-white/5 truncate max-w-[200px] sm:max-w-xs">
                  {project.name.toLowerCase().replace(/\s+/g, '-')}.concept
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-violet-400">
                  {activeThumb.label}
                </div>
              </div>

              {/* Main Screenshot Display */}
              <div className="relative flex-1 w-full h-full overflow-hidden bg-[#0d0d12]">
                <img
                  key={activeThumb.file}
                  src={`${project.basePath}${activeThumb.file}`}
                  alt={`${project.name} — ${activeThumb.label} view`}
                  className="w-full h-full object-cover object-top animate-in fade-in duration-300"
                  loading="eager"
                />
              </div>
            </div>

            {/* Counter Badge */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 bg-black/75 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 z-20 shadow-lg">
              <span className="text-sm font-medium text-white font-mono">
                {String(activeThumbnail).padStart(2, '0')}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-sm font-medium text-white/60 font-mono">
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
              className={`group relative flex-shrink-0 w-32 sm:w-44 aspect-video rounded-lg border-2 overflow-hidden transition-all duration-200 cursor-pointer text-left ${
                activeThumbnail === thumb.id
                  ? 'border-violet-500 scale-[1.02] shadow-lg shadow-violet-500/25 ring-2 ring-violet-500/20'
                  : 'border-white/10 hover:border-white/30 bg-black/50 opacity-70 hover:opacity-100'
              }`}
              aria-label={`View ${thumb.label} screenshot`}
            >
              {/* Thumbnail Real Image */}
              <img
                src={`${project.basePath}${thumb.file}`}
                alt={`${project.name} thumbnail ${thumb.id}`}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {/* Dark Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Label */}
              <div className="absolute bottom-1.5 left-2 right-8 pointer-events-none">
                <span className="text-white text-[11px] font-medium line-clamp-1 drop-shadow-sm">
                  {thumb.label}
                </span>
              </div>

              {/* Number Badge */}
              <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-xs rounded px-1.5 py-0.5 border border-white/15 pointer-events-none">
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
            className="text-white/30 hover:text-white transition-colors p-1 cursor-pointer"
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
            className="text-white/30 hover:text-white transition-colors p-1 cursor-pointer"
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
