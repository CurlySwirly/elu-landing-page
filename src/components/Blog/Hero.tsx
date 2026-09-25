import { useLocale } from '../../i18n';

export default function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative bg-light overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#6D8EEC]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#BADE4F]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-28 text-center">
        <div className="inline-block mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-[#6D8EEC]/10 to-[#BADE4F]/10 border border-[#6D8EEC]/20">
          <span className="font-['Open_Sans'] font-semibold text-sm text-[#6D8EEC]">{t('blog.badge')}</span>
        </div>

        <h1 className="font-['League_Spartan'] font-bold text-[#292B27] text-[26px] sm:text-[36px] md:text-[52px] lg:text-[56px] leading-[1.2] mb-4 md:mb-6 tracking-tight">
          {t('blog.title')}
          <br />
          <span className="bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] bg-clip-text text-transparent">{t('blog.titleAccent')}</span>
        </h1>

        <p className="font-['Open_Sans'] text-[#292B27]/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-[1.7]">
          {t('blog.sub')}
        </p>

        <button className="group bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] text-white font-['Open_Sans'] font-semibold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base rounded-full hover:shadow-[0_8px_30px_rgb(109,142,236,0.3)] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
          <span className="relative z-10">{t('blog.cta')}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#5D7EDC] to-[#AACE3F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </section>
  );
}
