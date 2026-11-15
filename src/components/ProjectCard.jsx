import { useState, useRef, useEffect } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { sanitizeUrl } from '../utils/security';

export default function ProjectCard({ project, index = 0 }) {
  const [activeThumbnail, setActiveThumbnail] = useState(
    project.thumbnails?.[0]?.id ?? 1
  );
  const { ref: cardRef, isVisible } = useRevealOnScroll({
    threshold: 0.05,
    rootMargin: '120px',
  });
  const thumbnailScrollRef = useRef(null);

  const { safeUrl: safeLiveUrl, isExternal: isLiveExternal } = sanitizeUrl(project.projectUrl);
  const { safeUrl: safeGithubUrl, isExternal: isGithubExternal } = project.githubUrl
    ? sanitizeUrl(project.githubUrl)
    : { safeUrl: '#', isExternal: false };

  // Real hostname extracted with URL API (no fallback to fake .concept)
  const displayDomain = (() => {
    try {
      const parsed = new URL(project.projectUrl);
      return parsed.hostname;
    } catch {
      return project.projectUrl || '';
    }
  })();

  const currentIndex = project.thumbnails.findIndex((t) => t.id === activeThumbnail);
  const safeIndex = currentIndex !== -1 ? currentIndex : 0;
  const activeThumb = project.thumbnails[safeIndex] || project.thumbnails[0];

  const handleThumbnailClick = (id) => {
    setActiveThumbnail(id);
  };

  // Circular navigation across thumbnails
  const navigateThumbnails = (direction) => {
    const total = project.thumbnails.length;
    if (total === 0) return;
    const newIndex =
      direction === 'next'
        ? (safeIndex + 1) % total
        : (safeIndex - 1 + total) % total;
    const nextId = project.thumbnails[newIndex].id;
    setActiveThumbnail(nextId);
  };

  // Keep active thumbnail visible inside the scrollable container strictly horizontally (no vertical scroll)
  useEffect(() => {
    const container = thumbnailScrollRef.current;
    if (!container) return;
    const target = container.querySelector(`[data-thumb-id="${activeThumbnail}"]`);
    if (!target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    if (targetRect.left < containerRect.left) {
      const diff = targetRect.left - containerRect.left - 16;
      container.scrollBy({ left: diff, behavior: 'smooth' });
    } else if (targetRect.right > containerRect.right) {
      const diff = targetRect.right - containerRect.right + 16;
      container.scrollBy({ left: diff, behavior: 'smooth' });
    }
  }, [activeThumbnail]);

  return (
    <div
      ref={cardRef}
      className={`section-reveal ${
        isVisible ? 'visible' : ''
      } group rounded-3xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-all duration-300 ease-out hover:border-white/[0.15] hover:bg-white/[0.03] hover:-translate-y-[2px]`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Card Header */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Number, Category, Name */}
          <div>
            <span className="text-sm text-white/40 font-mono">{project.number}</span>
            <p className="text-[11px] sm:text-xs font-medium tracking-[0.2em] text-white/60 uppercase mt-4 sm:mt-6 mb-3 sm:mb-4">
              {project.category}
            </p>
            <h3 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold text-white leading-[1.05] tracking-tight">
              {project.name}
            </h3>
          </div>

          {/* Right: Description, Tech, CTA Buttons */}
          <div className="flex flex-col justify-between">
            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              {project.description}
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-wrap items-center gap-1.5">
                {project.tech.split('·').map((techItem) => {
                  const label = techItem.trim();
                  return (
                    <span
                      key={label}
                      className="text-[11px] sm:text-xs font-medium text-white/70 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md cursor-default transition-all duration-300 ease-out hover:bg-violet-500/10 hover:border-violet-400/30 hover:text-white hover:-translate-y-[2px] motion-reduce:hover:translate-y-0 motion-reduce:transition-none"
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center gap-2.5">
                {project.githubUrl && safeGithubUrl !== '#' && (
                  <a
                    href={safeGithubUrl}
                    target={isGithubExternal ? '_blank' : undefined}
                    rel={isGithubExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium text-white/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-300 group/gh"
                    aria-label={`View ${project.name} source code on GitHub`}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="opacity-80 group-hover/gh:opacity-100 transition-opacity"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>Code</span>
                  </a>
                )}
                <a
                  href={safeLiveUrl}
                  target={isLiveExternal ? '_blank' : undefined}
                  rel={isLiveExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white bg-violet-600/90 hover:bg-violet-600 border border-violet-500/30 hover:border-violet-400/50 shadow-sm transition-all duration-300 group/btn"
                  aria-label={`Open ${project.name} live demo`}
                >
                  <span>Live Demo</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
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
      </div>

      {/* Main Preview Container */}
      <div className="px-6 sm:px-8 lg:px-10 pb-4">
        <div
          className={`relative rounded-t-2xl sm:rounded-t-3xl ${project.bgColor} project-grid-pattern overflow-hidden`}
        >
          <div className="relative aspect-[16/10]">
            {/* Browser-like frame */}
            <div className="absolute inset-3 sm:inset-6 lg:inset-8 rounded-lg sm:rounded-xl bg-[#0a0a0f] border border-white/15 overflow-hidden shadow-2xl transition-shadow duration-300 ease-out group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] flex flex-col">
              {/* Browser Window Chrome */}
              <div className="h-7 sm:h-8 bg-black/60 border-b border-white/10 px-3 sm:px-4 flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-white/50 bg-white/5 px-3 py-0.5 rounded-md border border-white/5 truncate max-w-[200px] sm:max-w-xs">
                  {displayDomain}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-white/60">
                  {activeThumb.label}
                </div>
              </div>

              {/* Main Screenshot Display (Clickable) */}
              <a
                href={safeLiveUrl}
                target={isLiveExternal ? '_blank' : undefined}
                rel={isLiveExternal ? 'noopener noreferrer' : undefined}
                className="relative flex-1 w-full h-full overflow-hidden bg-[#0d0d12] block cursor-pointer group/preview"
                aria-label={`Open ${project.name} live website in new tab`}
              >
                <img
                  key={activeThumb.file}
                  src={`${project.basePath}${activeThumb.file}`}
                  alt={`${project.name} — ${activeThumb.label} view`}
                  className="w-full h-full object-cover object-top animate-in fade-in duration-300 transition-transform duration-300 ease-out group-hover/preview:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
                {/* Subtle Hover Indicator (Desktop) */}
                <div className="absolute inset-0 bg-black/30 opacity-0 md:group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-xl transform translate-y-2 md:group-hover/preview:translate-y-0 transition-transform duration-300">
                    <span>Open Live Site</span>
                    <svg
                      width="12"
                      height="12"
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
                  </span>
                </div>
              </a>
            </div>

            {/* Navigation Arrows on Preview */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateThumbnails('prev');
              }}
              className="absolute left-2.5 sm:left-5 lg:left-7 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/15 hover:border-white/30 text-white/75 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              aria-label="Previous screenshot"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateThumbnails('next');
              }}
              className="absolute right-2.5 sm:right-5 lg:right-7 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/15 hover:border-white/30 text-white/75 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              aria-label="Next screenshot"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Counter Badge */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 bg-black/75 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 z-20 shadow-lg pointer-events-none">
              <span className="text-sm font-medium text-white font-mono">
                {String(safeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-sm font-medium text-white/60 font-mono">
                {String(project.thumbnails.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8">
        <div
          ref={thumbnailScrollRef}
          className="thumbnail-scroll flex gap-3 overflow-x-auto pb-3 scroll-smooth"
        >
          {project.thumbnails.map((thumb) => (
            <button
              key={thumb.id}
              data-thumb-id={thumb.id}
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
            onClick={() => navigateThumbnails('prev')}
            className="text-white/40 hover:text-white transition-colors p-1.5 cursor-pointer rounded-full hover:bg-white/5"
            aria-label="Previous screenshot"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-300"
              style={{
                width: `${((safeIndex + 1) / project.thumbnails.length) * 100}%`,
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => navigateThumbnails('next')}
            className="text-white/40 hover:text-white transition-colors p-1.5 cursor-pointer rounded-full hover:bg-white/5"
            aria-label="Next screenshot"
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
