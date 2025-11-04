const topics = [
  'Gesunde Gewohnheiten entwickeln',
  'Prävention im Alltag',
  'Wie Ernährung auf mentale Gesundheit wirkt'
];

export default function RecommendedTopics() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-5 py-2 rounded-full bg-[#6D8EEC]/10 border border-[#6D8EEC]/20">
            <span className="font-['Open_Sans'] font-semibold text-xs text-[#6D8EEC] uppercase tracking-wide">Beliebte Themen</span>
          </div>
          <h2 className="font-['League_Spartan'] font-bold text-[#292B27] text-[28px] md:text-[36px] tracking-tight">
            Entdecke weitere Inhalte
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {topics.map((topic) => (
            <button
              key={topic}
              className="group relative px-8 py-4 rounded-full bg-[#F8F4F4] border-2 border-[#E2E8FB] hover:border-[#6D8EEC] transition-all duration-300 hover:shadow-[0_8px_24px_-8px_rgba(109,142,236,0.2)]"
            >
              <span className="font-['Open_Sans'] font-semibold text-[#292B27] group-hover:text-[#6D8EEC] transition-colors duration-200">
                {topic}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
