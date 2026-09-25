import { Calendar, User } from 'lucide-react';

type ArticleHeaderProps = {
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  featuredImage: string;
  imageAlt: string;
};

export default function ArticleHeader({
  title,
  category,
  author,
  publishedAt,
  featuredImage,
  imageAlt
}: ArticleHeaderProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-light pt-6 pb-10 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-6 md:mb-8">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-['Open_Sans'] font-semibold tracking-wide uppercase text-[#6D8EEC] bg-[#6D8EEC]/10">
            {category}
          </span>
        </div>

        <h1 className="font-['League_Spartan'] font-bold text-[#292B27] text-[26px] sm:text-[32px] md:text-[48px] lg:text-[52px] leading-[1.15] mb-6 md:mb-8 tracking-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-[#292B27]/60 mb-8 md:mb-12 pb-6 md:pb-8 border-b border-[#E2E8FB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D8EEC] to-[#BADE4F] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-['Open_Sans'] font-medium text-[#292B27]/50 uppercase tracking-wide">Autor</div>
              <div className="font-['Open_Sans'] font-semibold text-[#292B27] text-sm">{author}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E2E8FB] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#6D8EEC]" />
            </div>
            <div>
              <div className="text-xs font-['Open_Sans'] font-medium text-[#292B27]/50 uppercase tracking-wide">Veröffentlicht</div>
              <time className="font-['Open_Sans'] font-semibold text-[#292B27] text-sm" dateTime={publishedAt}>
                {formatDate(publishedAt)}
              </time>
            </div>
          </div>
        </div>

        <div className="aspect-video rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(109,142,236,0.2)] bg-[#E2E8FB]">
          <img
            src={featuredImage}
            alt={imageAlt}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/blog-fallback.jpg';
            }}
          />
        </div>
      </div>
    </header>
  );
}
