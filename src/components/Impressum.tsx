import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ImpressumProps {
  onBack?: () => void;
}

const Impressum: React.FC<ImpressumProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#292B27] text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img 
              src="/LOGO_DARKGRADIENT.png" 
              alt="elu – elevate you" 
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              elu – elevate you
            </h1>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[#6D8EEC] hover:text-[#5a7ae8] transition-colors duration-200 font-medium"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </button>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#292B27] mb-8 text-center" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Impressum
          </h1>
          
          <div className="space-y-8 text-[#292B27]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Unternehmensname
              </h2>
              <p className="text-lg">
                Elevate You FlexKapG (in Gründung)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Sitz der Gesellschaft
              </h2>
              <p className="text-lg">
                Wien, Österreich
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Unternehmensgegenstand
              </h2>
              <p className="text-lg">
                Digitale Vermittlungsplattform für qualitätsgesicherte Gesundheits- und Präventionsangebote
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Geschäftsführung & Gründer:innen
              </h2>
              <div className="space-y-2">
                <p className="text-lg">Linda Breuer, MA</p>
                <p className="text-lg">Dominik Dörr, MSc</p>
                <p className="text-lg">Arnold Stelzer, MSc</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Kontakt
              </h2>
              <p className="text-lg">
                E-Mail: <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">info@elevateyou.app</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Firmenbuchnummer
              </h2>
              <p className="text-lg text-gray-600">
                (wird nach Eintragung ergänzt)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Firmenbuchgericht
              </h2>
              <p className="text-lg">
                Handelsgericht Wien
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                UID-Nummer
              </h2>
              <p className="text-lg text-gray-600">
                (wird nach Erteilung ergänzt)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Rechtsform
              </h2>
              <p className="text-lg">
                Flexible Kapitalgesellschaft (FlexKapG)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Aufsichtsbehörde / Gewerbebehörde
              </h2>
              <p className="text-lg">
                Magistratisches Bezirksamt für den 1. Bezirk, Wien
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Kammerzugehörigkeit
              </h2>
              <p className="text-lg">
                Mitglied der Wirtschaftskammer Wien
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Haftungsausschluss
              </h2>
              <p className="text-lg leading-relaxed">
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Haftung übernommen. Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber:innen verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Urheberrecht
              </h2>
              <p className="text-lg leading-relaxed">
                Alle Inhalte (Texte, Bilder, Grafiken, Design) dieser Website sind urheberrechtlich geschützt. Jede Form der Nutzung oder Vervielfältigung ist ohne ausdrückliche Zustimmung der Rechteinhaber:innen unzulässig.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Impressum;
