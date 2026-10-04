/**
 * URL validation and sanitization utility to prevent protocol-based DOM XSS
 * (e.g., javascript:, data:, vbscript:) and enforce safe external navigation.
 */

/**
 * Sanitizes a URL and determines whether it represents an external destination.
 * Rejects dangerous protocols and ensures safe navigation.
 *
 * @param {string|undefined|null} url - The URL to validate.
 * @param {string} [fallback='#'] - Fallback URL if validation fails.
 * @returns {{ safeUrl: string, isExternal: boolean }}
 */
export function sanitizeUrl(url, fallback = '#') {
  if (typeof url !== 'string') {
    return { safeUrl: fallback, isExternal: false };
  }

  const trimmed = url.trim();

  // Internal anchor or empty fallback
  if (!trimmed || trimmed === '#') {
    return { safeUrl: '#', isExternal: false };
  }

  // Fragment identifiers (#section)
  if (trimmed.startsWith('#')) {
    return { safeUrl: trimmed, isExternal: false };
  }

  // Relative root paths (/page)
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return { safeUrl: trimmed, isExternal: false };
  }

  // Explicitly reject dangerous script-executable protocols
  const dangerousProtocolRegex = /^\s*(javascript|data|vbscript|file):/i;
  if (dangerousProtocolRegex.test(trimmed)) {
    return { safeUrl: fallback, isExternal: false };
  }

  try {
    const base = typeof window !== 'undefined' && window.location ? window.location.origin : 'http://localhost';
    const parsed = new URL(trimmed, base);

    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      const isExternal = typeof window !== 'undefined' && window.location ? parsed.origin !== window.location.origin : true;
      return { safeUrl: trimmed, isExternal };
    }

    if (parsed.protocol === 'mailto:') {
      return { safeUrl: trimmed, isExternal: false };
    }
  } catch {
    return { safeUrl: fallback, isExternal: false };
  }

  return { safeUrl: fallback, isExternal: false };
}
