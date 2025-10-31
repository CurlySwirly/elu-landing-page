export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-[#F8F4F4] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#6D8EEC]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#BADE4F]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="inline-block mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-[#6D8EEC]/10 to-[#BADE4F]/10 border border-[#6D8EEC]/20">
          <span className="font-['Open_Sans'] font-semibold text-sm text-[#6D8EEC]">ELU Insights</span>
        </div>

        <h1 className="font-['League_Spartan'] font-bold text-[#292B27] text-[36px] md:text-[52px] lg:text-[56px] leading-[1.1] mb-6 tracking-tight">
          Wissen für Gesundheit,<br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] bg-clip-text text-transparent">Prävention & Balance</span>
        </h1>

        <p className="font-['Open_Sans'] text-[#292B27]/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-[1.7]">
          Entdecken Sie fundiertes Wissen, praktische Tipps und Inspiration von Expert:innen für ein gesundes, ausgeglichenes Leben.
        </p>

        <button className="group bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] text-white font-['Open_Sans'] font-semibold px-8 py-4 rounded-full hover:shadow-[0_8px_30px_rgb(109,142,236,0.3)] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
          <span className="relative z-10">Jetzt mehr erfahren</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#5D7EDC] to-[#AACE3F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </section>
  );
}
