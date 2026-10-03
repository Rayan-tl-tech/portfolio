import { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function SelectedWork() {
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

  return (
    <section id="work" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 scroll-mt-24 sm:scroll-mt-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className={`section-reveal ${isVisible ? 'visible' : ''} mb-12 sm:mb-16`}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
            <div>
              <span className="text-[11px] sm:text-xs font-medium tracking-[0.2em] text-violet-500 uppercase mb-3 sm:mb-4 block">
                Featured Projects
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight">
                <span className="text-white">Selected </span>
                <span className="text-violet-500">Work</span>
              </h2>
            </div>
            <div>
              <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-lg">
                A selection of websites and digital experiences I've designed and developed.
              </p>
            </div>
          </div>
        </div>

        {/* Project Cards List */}
        <div className="space-y-12 sm:space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
