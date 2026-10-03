/**
 * Updates CSS custom properties --mouse-x and --mouse-y on mouse move
 * without triggering React re-renders for 60/120fps GPU performance.
 */
export const handleSpotlightMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
};
