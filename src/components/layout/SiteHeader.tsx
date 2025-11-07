import React from 'react';

interface SiteHeaderProps {
  onNavigate: (page: string) => void;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BADE4F]';

const SiteHeader: React.FC<SiteHeaderProps> = ({ onNavigate }) => {
  const handleScrollToSignup = () => {
    const signupSection = document.getElementById('signup');

    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    onNavigate('home');
    setTimeout(() => {
      document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#292B27] text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-3 text-left ${focusRing}`}
            >
              <img
                src="/favicon.png"
                alt="elu – elevate you"
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
              />
              <span
                className="text-xl lg:text-2xl text-white"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                <span className="font-bold">elu.</span>{' '}
                <span className="hidden lg:inline font-extralight italic">elevate you</span>
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden lg:flex flex-col items-center">
              <p
                className="text-xs tracking-wide uppercase text-white/80"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Beta Launch
              </p>
              <span
                className="text-xl font-bold text-[#BADE4F]"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Coming Soon
              </span>
            </div>

            <button
              type="button"
              onClick={handleScrollToSignup}
              className={`hidden lg:inline-flex bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] text-white px-6 py-3 rounded-full text-sm font-semibold transition-transform duration-300 hover:scale-105 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${focusRing}`}
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Zur Warteliste
            </button>

            <button
              type="button"
              onClick={handleScrollToSignup}
              className={`lg:hidden inline-flex items-center gap-2 rounded-full border border-[#BADE4F] px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#BADE4F] hover:text-[#292B27] ${focusRing}`}
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Zur Warteliste
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;

