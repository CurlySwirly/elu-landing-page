import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '../i18n';

const Hero: React.FC = () => {
  const { t } = useLocale();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-light px-4 pt-8 pb-10 md:pt-16 md:pb-16 lg:pt-20 lg:pb-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
        <div>
          <p
            className="inline-flex items-center rounded-full bg-[#E2E8FB] px-4 py-1.5 mb-4 md:mb-6 text-xs sm:text-sm font-medium text-[#6D8EEC]"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            {t('hero.badge')}
          </p>

          <h1
            className="text-[24px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-bold text-[#292B27] leading-[1.2] tracking-tight mb-4 md:mb-6"
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            {t('hero.titleLead')}
            <br />
            {t('hero.titleTail')}
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg text-[#292B27]/80 leading-relaxed mb-6 md:mb-8 max-w-xl"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            {t('hero.sub')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => scrollTo('signup')}
              className="btn-primary gap-2 px-6 py-3 md:px-7 md:py-3.5 text-sm md:text-base focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BADE4F]"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('hero.waitlist')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('how-it-works')}
              className="inline-flex items-center justify-center px-6 py-3 md:px-7 md:py-3.5 text-sm md:text-base bg-white text-[#292B27] font-semibold rounded-full border border-[#292B27]/15 hover:border-[#292B27]/40 transition-all duration-300 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BADE4F]"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('hero.how')}
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-24px_rgba(41,43,39,0.25)]">
          <img
            src="/images/hero-physio.jpg"
            alt={t('hero.imageAlt')}
            className="w-full aspect-[4/3] max-h-[280px] sm:max-h-none object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.03]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
