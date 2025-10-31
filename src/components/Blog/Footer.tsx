import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#292B27] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-[#BADE4F]" />
              <h3 className="font-['League_Spartan'] font-bold text-xl">ELU</h3>
            </div>
            <p className="font-['Open_Sans'] text-white/80 text-sm leading-relaxed">
              Elevate You – Ihre Plattform für ganzheitliche Gesundheit und präventive Wellness.
            </p>
          </div>

          <div>
            <h4 className="font-['League_Spartan'] font-semibold text-lg mb-4">Plattform</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-['Open_Sans'] text-white/80 hover:text-[#6D8EEC] hover:underline transition-colors text-sm">
                  Für Klient:innen
                </a>
              </li>
              <li>
                <a href="#" className="font-['Open_Sans'] text-white/80 hover:text-[#6D8EEC] hover:underline transition-colors text-sm">
                  Für Expert:innen
                </a>
              </li>
              <li>
                <a href="#" className="font-['Open_Sans'] text-white/80 hover:text-[#6D8EEC] hover:underline transition-colors text-sm">
                  Für Unternehmen
                </a>
              </li>
              <li>
                <a href="/blog" className="font-['Open_Sans'] text-white/80 hover:text-[#6D8EEC] hover:underline transition-colors text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-['League_Spartan'] font-semibold text-lg mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-['Open_Sans'] text-white/80 hover:text-[#6D8EEC] hover:underline transition-colors text-sm">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="font-['Open_Sans'] text-white/80 hover:text-[#6D8EEC] hover:underline transition-colors text-sm">
                  Impressum
                </a>
              </li>
              <li>
                <a href="#" className="font-['Open_Sans'] text-white/80 hover:text-[#6D8EEC] hover:underline transition-colors text-sm">
                  AGB
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-['League_Spartan'] font-semibold text-lg mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6D8EEC]" />
                <a href="mailto:info@elu.de" className="font-['Open_Sans'] text-white/80 hover:text-[#6D8EEC] hover:underline transition-colors text-sm">
                  info@elu.de
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6D8EEC]" />
                <a href="tel:+49123456789" className="font-['Open_Sans'] text-white/80 hover:text-[#6D8EEC] hover:underline transition-colors text-sm">
                  +49 123 456 789
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#6D8EEC] mt-1 flex-shrink-0" />
                <span className="font-['Open_Sans'] text-white/80 text-sm">
                  Musterstraße 123<br />
                  10115 Berlin
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="font-['Open_Sans'] text-white/60 text-sm">
            © {new Date().getFullYear()} ELU – Elevate You. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
