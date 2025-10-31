import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogPost } from '../../lib/supabase';
import BlogCard from './BlogCard';

type BlogGridProps = {
  posts: BlogPost[];
  onPostClick?: (slug: string) => void;
};

const POSTS_PER_PAGE = 6;

export default function BlogGrid({ posts, onPostClick }: BlogGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (posts.length === 0) {
    return (
      <section className="bg-[#F8F4F4] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-['Open_Sans'] text-[#292B27] text-lg">
            Keine Artikel gefunden. Versuchen Sie eine andere Suche oder Kategorie.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F8F4F4] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentPosts.map((post) => (
            <BlogCard key={post.id} post={post} onPostClick={onPostClick} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 bg-white border-2 border-[#E2E8FB] text-[#292B27] font-['Open_Sans'] font-semibold px-6 py-3 rounded-full hover:border-[#6D8EEC] hover:text-[#6D8EEC] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#E2E8FB] disabled:hover:text-[#292B27]"
            >
              <ChevronLeft className="w-5 h-5" />
              Zurück
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-10 h-10 rounded-full font-['Open_Sans'] font-semibold text-sm transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] text-white shadow-[0_4px_12px_rgba(109,142,236,0.3)]'
                      : 'bg-white border-2 border-[#E2E8FB] text-[#292B27] hover:border-[#6D8EEC]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 bg-white border-2 border-[#E2E8FB] text-[#292B27] font-['Open_Sans'] font-semibold px-6 py-3 rounded-full hover:border-[#6D8EEC] hover:text-[#6D8EEC] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#E2E8FB] disabled:hover:text-[#292B27]"
            >
              Weiter
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
