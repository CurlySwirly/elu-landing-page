import React, { useEffect, useRef } from 'react';

type ArticleContentProps = {
  content: string;
  onPostClick?: (slug: string) => void;
};

export default function ArticleContent({ content, onPostClick }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        // Check if it's a blog post link
        const url = new URL(link.href);
        const pathMatch = url.pathname.match(/^\/blog\/(.+)$/);
        
        if (pathMatch && onPostClick) {
          e.preventDefault();
          const slug = pathMatch[1];
          onPostClick(slug);
        }
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('click', handleLinkClick);
      
      return () => {
        contentElement.removeEventListener('click', handleLinkClick);
      };
    }
  }, [onPostClick]);

  return (
    <article className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div
          ref={contentRef}
          className="article-content max-w-none
            [&_h1]:font-['League_Spartan'] [&_h1]:font-bold [&_h1]:text-[#292B27] [&_h1]:text-[32px] [&_h1]:md:text-[40px] [&_h1]:leading-tight [&_h1]:mb-8 [&_h1]:tracking-tight
            [&_h2]:font-['League_Spartan'] [&_h2]:font-bold [&_h2]:text-[#292B27] [&_h2]:text-[24px] [&_h2]:md:text-[32px] [&_h2]:leading-tight [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:first:mt-0 [&_h2]:tracking-tight
            [&_h3]:font-['League_Spartan'] [&_h3]:font-semibold [&_h3]:text-[#292B27] [&_h3]:text-[20px] [&_h3]:md:text-[24px] [&_h3]:leading-tight [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:tracking-tight
            [&_p]:font-['Open_Sans'] [&_p]:text-[#292B27]/80 [&_p]:text-[17px] [&_p]:md:text-[18px] [&_p]:leading-[1.8] [&_p]:mb-8
            [&_p:last-child]:mb-0
            [&_a]:text-[#6D8EEC] [&_a]:font-semibold [&_a]:no-underline [&_a]:hover:underline [&_a]:transition-all [&_a]:cursor-pointer
            [&_strong]:text-[#292B27] [&_strong]:font-bold
            [&_em]:italic [&_em]:text-[#292B27]/90
            [&_ul]:font-['Open_Sans'] [&_ul]:text-[#292B27]/80 [&_ul]:my-8 [&_ul]:space-y-3 [&_ul]:list-disc [&_ul]:pl-6
            [&_ol]:font-['Open_Sans'] [&_ol]:text-[#292B27]/80 [&_ol]:my-8 [&_ol]:space-y-3 [&_ol]:list-decimal [&_ol]:pl-6
            [&_li]:text-[17px] [&_li]:md:text-[18px] [&_li]:leading-[1.7] [&_li]:mb-2
            [&_li_marker]:text-[#6D8EEC]
            [&_blockquote]:border-l-[6px] [&_blockquote]:border-[#6D8EEC] [&_blockquote]:bg-[#F8F4F4] [&_blockquote]:rounded-r-2xl [&_blockquote]:pl-8 [&_blockquote]:pr-6 [&_blockquote]:py-6 [&_blockquote]:my-10 [&_blockquote]:italic [&_blockquote]:text-[#292B27] [&_blockquote]:text-lg [&_blockquote]:font-medium"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </article>
  );
}
