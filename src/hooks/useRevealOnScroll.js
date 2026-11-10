import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to trigger a one-shot reveal animation when an element enters the viewport.
 * Uses lazy state initialization to gracefully handle environments without IntersectionObserver.
 *
 * @param {Object} [options] - IntersectionObserver options
 * @param {number|number[]} [options.threshold] - Visibility percentage threshold(s)
 * @param {string} [options.rootMargin] - Margin around the root element (e.g. '120px')
 * @returns {{ ref: React.RefObject<any>, isVisible: boolean }}
 */
export function useRevealOnScroll(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window)
  );

  const { threshold, rootMargin } = options;

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {};
    if (threshold !== undefined) observerOptions.threshold = threshold;
    if (rootMargin !== undefined) observerOptions.rootMargin = rootMargin;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      observerOptions
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

export default useRevealOnScroll;

