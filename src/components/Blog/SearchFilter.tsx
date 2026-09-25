import { Search } from 'lucide-react';
import { useLocale } from '../../i18n';
import { de } from '../../i18n/de';

type SearchFilterProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function SearchFilter({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }: SearchFilterProps) {
  const { t, messages } = useLocale();
  const categories = de.blog.cats;
  return (
    <section className="bg-light py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_8px_30px_-10px_rgba(109,142,236,0.1)] border border-[#E2E8FB]">
          <div className="relative mb-6 md:mb-8">
            <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-[#6D8EEC] w-5 h-5" />
            <input
              type="text"
              placeholder={t('blog.search')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 rounded-2xl border-2 border-[#E2E8FB] bg-light text-[#292B27] font-['Open_Sans'] text-sm sm:text-base focus:outline-none focus:border-[#6D8EEC] focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => onCategoryChange('')}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-['Open_Sans'] font-semibold text-sm transition-all duration-200 ${
                selectedCategory === ''
                  ? 'bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] text-white shadow-[0_4px_12px_rgba(109,142,236,0.3)]'
                  : 'bg-light text-[#292B27] hover:bg-[#E2E8FB]'
              }`}
            >
              {t('blog.allTopics')}
            </button>
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-['Open_Sans'] font-semibold text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] text-white shadow-[0_4px_12px_rgba(109,142,236,0.3)]'
                    : 'bg-light text-[#292B27] hover:bg-[#E2E8FB]'
                }`}
              >
                {messages.blog.cats[index]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
