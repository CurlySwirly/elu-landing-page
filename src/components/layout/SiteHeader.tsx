import React, { useEffect, useState } from 'react';
import { useLocale } from '../../i18n';

interface SiteHeaderProps {
  onNavigate?: (page: string) => void;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BADE4F]';

const SiteHeader: React.FC<SiteHeaderProps> = () => {
  const { locale, setLocale, t } = useLocale();
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16 lg:h-20">
          <div className="flex items-center gap-2 min-w-0">
            <a
              href="/"
              className={`shrink-0 ${focusRing} rounded-lg`}
            >
              <img
                src="/images/elu-heart-logo.png"
                alt="elu"
                className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 object-contain"
              />
            </a>
            <span
              className="hidden sm:inline-flex items-center rounded-full bg-[#E2E8FB] px-2 py-1 text-[10px] sm:text-[11px] lg:text-xs font-semibold tracking-wide text-[#6D8EEC]"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('header.comingSoon')}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div
              className="inline-flex items-center rounded-full bg-[#E2E8FB] p-0.5 text-[10px] sm:text-[11px] lg:text-xs font-semibold shrink-0"
              role="group"
              aria-label={t('header.language')}
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <button
                type="button"
                onClick={() => setLocale('de')}
                aria-pressed={locale === 'de'}
                className={`px-1.5 sm:px-2 py-1 rounded-full ${focusRing} ${
                  locale === 'de' ? 'bg-white text-[#6D8EEC]' : 'text-[#292B27]/55'
                }`}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                aria-pressed={locale === 'en'}
                className={`px-1.5 sm:px-2 py-1 rounded-full ${focusRing} ${
                  locale === 'en' ? 'bg-white text-[#6D8EEC]' : 'text-[#292B27]/55'
                }`}
              >
                EN
              </button>
            </div>
            <a
              href="/#signup"
              onClick={goToWaitlist}
              className={`btn-primary shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 text-xs sm:text-sm ${focusRing}`}
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <span className="lg:hidden">{t('header.waitlistShort')}</span>
              <span className="hidden lg:inline">{t('header.waitlist')}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
