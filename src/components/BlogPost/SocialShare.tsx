import { Share2, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { useState } from 'react';

type SocialShareProps = {
  title: string;
  url: string;
};

export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  return (
    <div className="bg-[#E2E8FB] py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Share2 className="w-6 h-6 text-[#6D8EEC]" />
            <span className="font-['League_Spartan'] font-semibold text-[#292B27] text-lg">
              Artikel teilen
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#292B27] hover:bg-gradient-to-r hover:from-[#6D8EEC] hover:to-[#BADE4F] hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Auf Facebook teilen"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#292B27] hover:bg-gradient-to-r hover:from-[#6D8EEC] hover:to-[#BADE4F] hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Auf Twitter teilen"
            >
              <Twitter className="w-5 h-5" />
            </a>

            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#292B27] hover:bg-gradient-to-r hover:from-[#6D8EEC] hover:to-[#BADE4F] hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Auf LinkedIn teilen"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <button
              onClick={handleCopyLink}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#292B27] hover:bg-gradient-to-r hover:from-[#6D8EEC] hover:to-[#BADE4F] hover:text-white transition-all duration-200 hover:scale-110 relative"
              aria-label="Link kopieren"
            >
              <Link2 className="w-5 h-5" />
              {copied && (
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#292B27] text-white text-xs px-3 py-1 rounded whitespace-nowrap">
                  Kopiert!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
