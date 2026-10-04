const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#060609] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left: Name + Role */}
        <div>
          <div className="text-white font-bold text-sm tracking-wide">RAYAN TALEB</div>
          <div className="text-white/50 text-xs sm:text-sm mt-1">
            Web Developer &amp; Software Engineer
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="text-white/40 text-xs sm:text-sm tracking-wide">
          &copy; {CURRENT_YEAR} RAYAN TALEB
        </div>

        {/* Right: Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="text-white/50 hover:text-white text-xs sm:text-sm tracking-wide transition-colors duration-200 flex items-center gap-1 cursor-pointer"
          aria-label="Back to top"
        >
          BACK TO TOP &uarr;
        </button>
      </div>
    </footer>
  );
}
