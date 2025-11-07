import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

interface SiteFooterProps {
  onNavigate: (page: string) => void;
}

const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#292B27] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/favicon.png" 
                alt="elu – elevate you" 
                className="w-10 h-10"
              />
              <h3 className="text-2xl font-bold text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                <span className="font-bold">elu.</span> <span className="font-extralight italic">elevate you</span>
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Gesundheit ohne Umwege. Finde geprüfte Expert:innen für alle Bereiche der Vorsorge und Prävention.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/elevateyou.app/" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-[#6D8EEC] p-3 rounded-full transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61579333094922" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-[#6D8EEC] p-3 rounded-full transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/108662379/" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-[#6D8EEC] p-3 rounded-full transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Rechtliches
            </h4>
            <ul className="space-y-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              <li><button onClick={() => onNavigate('impressum')} className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Impressum</button></li>
              <li><button onClick={() => onNavigate('datenschutz')} className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Datenschutz</button></li>
              <li><button onClick={() => onNavigate('agb')} className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">AGB</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Kontakt
            </h4>
            <ul className="space-y-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              <li><button onClick={() => onNavigate('ueber-uns')} className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Über uns</button></li>
              <li><button onClick={() => onNavigate('support')} className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Kontakt &amp; Support</button></li>
              <li><button onClick={() => onNavigate('blog')} className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Blog</button></li>
              {/* <li><button onClick={() => onNavigate('press')} className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">Presse</button></li> */}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p className="text-gray-400" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            © 2025 <span className="font-bold">elu.</span> <span className="font-extralight italic">elevate you</span>. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

