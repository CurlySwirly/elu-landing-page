import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '../../i18n';

type BackToBlogProps = {
  onBack?: () => void;
};

export default function BackToBlog({ onBack }: BackToBlogProps) {
  const { t } = useLocale();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="bg-light py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <a
          href="/blog"
          onClick={handleClick}
          className="inline-flex items-center gap-2 text-[#6D8EEC] font-['Open_Sans'] font-medium hover:gap-3 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('common.backBlog')}
        </a>
      </div>
    </div>
  );
}
