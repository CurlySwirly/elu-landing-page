import React from 'react';
import { ArrowLeft } from 'lucide-react';

type BackToBlogProps = {
  onBack?: () => void;
};

export default function BackToBlog({ onBack }: BackToBlogProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="bg-[#F8F4F4] py-8">
      <div className="max-w-5xl mx-auto px-6">
        <a
          href="/blog"
          onClick={handleClick}
          className="inline-flex items-center gap-2 text-[#6D8EEC] font-['Open_Sans'] font-medium hover:gap-3 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück zur Übersicht
        </a>
      </div>
    </div>
  );
}
