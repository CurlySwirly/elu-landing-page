import React, { useEffect, useState } from 'react';

interface SiteHeaderProps {
  onNavigate?: (page: string) => void;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BADE4F]';

const SiteHeader: React.FC<SiteHeaderProps> = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToWaitlist = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== '/') {
      return;
    }
    event.preventDefault();
    window.history.replaceState({}, '', '/#signup');
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 text-[#292B27] backdrop-blur-md border-b transition-shadow duration-300 ${
        scrolled
          ? 'border-[#292B27]/10 shadow-[0_8px_24px_-16px_rgba(41,43,39,0.2)]'
          : 'border-[#292B27]/8 shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-2.5 min-w-0">
            <a
              href="/"
              className={`shrink-0 ${focusRing} rounded-lg`}
            >
              <img
                src="/images/elu-heart-logo.png"
                alt="elu"
                className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
              />
            </a>
            <span
              className="inline-flex items-center rounded-full bg-[#E2E8FB] px-2.5 py-1 text-[11px] lg:text-xs font-semibold tracking-wide text-[#6D8EEC]"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Coming Soon
            </span>
          </div>

          <a
            href="/#signup"
            onClick={goToWaitlist}
            className={`btn-primary shrink-0 px-4 py-2 lg:px-6 lg:py-3 text-sm ${focusRing}`}
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            <span className="sm:hidden">Warteliste</span>
            <span className="hidden sm:inline">Zur Warteliste</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
