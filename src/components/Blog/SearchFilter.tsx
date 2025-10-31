import { Search } from 'lucide-react';

type SearchFilterProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const categories = [
  'Bewegung & Training',
  'Ernährung & Stoffwechsel',
  'Mentale Gesundheit',
  'Unternehmen & Prävention'
];

export default function SearchFilter({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }: SearchFilterProps) {
  return (
    <section className="bg-[#F8F4F4] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_-10px_rgba(109,142,236,0.1)] border border-[#E2E8FB]">
          <div className="relative mb-8">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#6D8EEC] w-5 h-5" />
            <input
              type="text"
              placeholder="Suche nach Themen oder Expert:innen…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-[#E2E8FB] bg-[#F8F4F4] text-[#292B27] font-['Open_Sans'] focus:outline-none focus:border-[#6D8EEC] focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onCategoryChange('')}
              className={`px-6 py-3 rounded-full font-['Open_Sans'] font-semibold text-sm transition-all duration-200 ${
                selectedCategory === ''
                  ? 'bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] text-white shadow-[0_4px_12px_rgba(109,142,236,0.3)]'
                  : 'bg-[#F8F4F4] text-[#292B27] hover:bg-[#E2E8FB]'
              }`}
            >
              Alle Themen
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-6 py-3 rounded-full font-['Open_Sans'] font-semibold text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] text-white shadow-[0_4px_12px_rgba(109,142,236,0.3)]'
                    : 'bg-[#F8F4F4] text-[#292B27] hover:bg-[#E2E8FB]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
