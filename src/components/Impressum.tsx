import React from 'react';
import { ArrowLeft } from 'lucide-react';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';

interface ImpressumProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D8EEC]';

const Impressum: React.FC<ImpressumProps> = ({ onBack, onNavigate }) => {
  const handleNavigate = onNavigate ?? (() => {});

  return (
    <div className="min-h-screen bg-[#F8F4F4] text-[#292B27]">
      <SiteHeader onNavigate={handleNavigate} />

      <main className="pt-28 lg:pt-36 pb-20">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className={`inline-flex items-center gap-2 text-sm font-semibold text-[#6D8EEC] hover:text-[#5a7ae8] transition-colors duration-200 mb-8 ${focusRing}`}
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </button>
          )}

          <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E2E8FB] p-8 md:p-12">
            <h1
              className="text-3xl md:text-4xl font-bold text-center mb-10"
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              Impressum
            </h1>

            <div className="space-y-8 text-[#292B27]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Unternehmensname
                </h2>
                <p className="text-lg">Elevate You GmbH (in Gründung)</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Sitz der Gesellschaft
                </h2>
                <p className="text-lg">Wien, Österreich</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Unternehmensgegenstand
                </h2>
                <p className="text-lg">
                  Digitale Vermittlungsplattform für qualitätsgesicherte Gesundheits- und Präventionsangebote
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Geschäftsführung &amp; Gründer:innen
                </h2>
                <div className="space-y-2 text-lg">
                  <p>Linda Breuer, MA</p>
                  <p>Dominik Dorr, MSc</p>
                  <p>Arnold Stelzer, MSc</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Kontakt
                </h2>
                <p className="text-lg">
                  E-Mail:{' '}
                  <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">
                    info@elevateyou.app
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Firmenbuchnummer
                </h2>
                <p className="text-lg text-[#6c6c6c]">(wird nach Eintragung ergänzt)</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Firmenbuchgericht
                </h2>
                <p className="text-lg">Handelsgericht Wien</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  UID-Nummer
                </h2>
                <p className="text-lg text-[#6c6c6c]">(wird nach Erteilung ergänzt)</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Rechtsform
                </h2>
                <p className="text-lg">Gesellschaft mit beschränkter Haftung (GmbH)</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Aufsichtsbehörde / Gewerbebehörde
                </h2>
                <p className="text-lg">Magistratisches Bezirksamt für den 1. Bezirk, Wien</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Kammerzugehörigkeit
                </h2>
                <p className="text-lg">Mitglied der Wirtschaftskammer Wien</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Haftungsausschluss
                </h2>
                <p className="text-lg leading-relaxed">
                  Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
                  Vollständigkeit und Aktualität der Inhalte wird jedoch keine Haftung übernommen. Trotz sorgfältiger
                  inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der
                  verlinkten Seiten sind ausschließlich deren Betreiber:innen verantwortlich.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Urheberrecht
                </h2>
                <p className="text-lg leading-relaxed">
                  Alle Inhalte (Texte, Bilder, Grafiken, Design) dieser Website sind urheberrechtlich geschützt. Jede
                  Form der Nutzung oder Vervielfältigung ist ohne ausdrückliche Zustimmung der Rechteinhaber:innen
                  unzulässig.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter onNavigate={handleNavigate} />
    </div>
  );
};

export default Impressum;
