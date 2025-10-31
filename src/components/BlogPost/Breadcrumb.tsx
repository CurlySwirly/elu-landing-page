import React from 'react';
import { ChevronRight } from 'lucide-react';

type BreadcrumbProps = {
  category: string;
  title: string;
};

export default function Breadcrumb({ category, title }: BreadcrumbProps) {
  const handleBlogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/blog');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <nav className="bg-[#F8F4F4] py-4" aria-label="Breadcrumb">
      <div className="max-w-5xl mx-auto px-6">
        <ol className="flex items-center gap-2 text-sm font-['Open_Sans']">
          <li>
            <a href="/" className="text-[#6D8EEC] hover:underline">
              Home
            </a>
          </li>
          <ChevronRight className="w-4 h-4 text-[#292B27]/40" />
          <li>
            <a href="/blog" onClick={handleBlogClick} className="text-[#6D8EEC] hover:underline">
              Blog
            </a>
          </li>
          <ChevronRight className="w-4 h-4 text-[#292B27]/40" />
          <li>
            <span className="text-[#292B27]/60">{category}</span>
          </li>
          <ChevronRight className="w-4 h-4 text-[#292B27]/40" />
          <li>
            <span className="text-[#292B27] font-medium truncate max-w-xs" title={title}>
              {title}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}
