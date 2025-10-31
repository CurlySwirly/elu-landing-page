import { ArrowRight } from 'lucide-react';
import { BlogPost } from '../../lib/supabase';

type BlogCardProps = {
  post: BlogPost;
  onPostClick?: (slug: string) => void;
};

export default function BlogCard({ post, onPostClick }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleClick = () => {
    if (onPostClick) {
      onPostClick(post.slug);
    }
  };

  return (
    <article className="bg-white rounded-3xl overflow-hidden group cursor-pointer border border-[#E2E8FB] hover:border-[#6D8EEC]/30 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(109,142,236,0.15)]" onClick={handleClick}>
      <div className="aspect-video overflow-hidden bg-[#E2E8FB]">
        <img
          src={post.featured_image_url}
          alt={post.image_alt_text}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
          }}
        />
      </div>

      <div className="p-7">
        <div className="inline-block mb-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-['Open_Sans'] font-semibold tracking-wide uppercase text-[#6D8EEC] bg-[#6D8EEC]/10">
            {post.category}
          </span>
        </div>

        <h3 className="font-['League_Spartan'] font-bold text-[#292B27] text-[20px] md:text-[24px] mb-3 leading-tight group-hover:text-[#6D8EEC] transition-colors duration-200">
          {post.title}
        </h3>

        <p className="font-['Open_Sans'] text-[#292B27]/70 text-[15px] leading-[1.7] mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#E2E8FB]">
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
  );
}
