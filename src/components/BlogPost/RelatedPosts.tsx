import { ArrowRight } from 'lucide-react';
import { BlogPost } from '../../lib/supabase';

type RelatedPostsProps = {
  posts: BlogPost[];
  onPostClick?: (slug: string) => void;
};

export default function RelatedPosts({ posts, onPostClick }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="bg-[#F8F4F4] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-5 py-2 rounded-full bg-[#6D8EEC]/10 border border-[#6D8EEC]/20">
            <span className="font-['Open_Sans'] font-semibold text-xs text-[#6D8EEC] uppercase tracking-wide">Ähnliche Artikel</span>
          </div>
          <h2 className="font-['League_Spartan'] font-bold text-[#292B27] text-[28px] md:text-[36px] tracking-tight">
            Das könnte dich auch interessieren
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden group cursor-pointer border border-[#E2E8FB] hover:border-[#6D8EEC]/30 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(109,142,236,0.15)]"
              onClick={() => {
                if (onPostClick) {
                  onPostClick(post.slug);
                }
              }}
            >
              <div className="aspect-video overflow-hidden bg-[#E2E8FB]">
                <img
                  src={post.featured_image_url}
                  alt={post.image_alt_text}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="p-6">
                <div className="inline-block mb-3">
                  <span className="px-4 py-1.5 rounded-full text-xs font-['Open_Sans'] font-semibold tracking-wide uppercase text-[#6D8EEC] bg-[#6D8EEC]/10">
                    {post.category}
                  </span>
                </div>

                <h3 className="font-['League_Spartan'] font-bold text-[#292B27] text-[18px] md:text-[20px] mb-3 leading-tight group-hover:text-[#6D8EEC] transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="font-['Open_Sans'] text-[#292B27]/70 text-[14px] leading-[1.7] mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8FB]">
                  <span className="text-xs font-['Open_Sans'] font-medium text-[#292B27]/50 uppercase tracking-wide">
                    {formatDate(post.published_at)}
                  </span>
                  <div className="flex items-center gap-2 text-[#6D8EEC] font-['Open_Sans'] font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                    Lesen
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
