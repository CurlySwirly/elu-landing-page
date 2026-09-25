import React from 'react';
import { ArrowLeft } from 'lucide-react';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';
import LegalLanguageNote from './layout/LegalLanguageNote';
import { useLocale } from '../i18n';

const Impressum: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-light">
      <SiteHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 lg:pt-36">
        <a
          href="/"
          className="flex items-center gap-2 text-[#6D8EEC] hover:text-[#5a7ae0] transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('common.backHome')}
        </a>

        <div className="rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5 sm:p-8 md:p-12 break-words">
        <LegalLanguageNote />
        <h1 className="text-[28px] md:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          {t('footer.impressum')}
        </h1>
        <p className="text-gray-600 mb-12" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Informationen gemäß § 5 ECG, § 14 UGB, § 63 GewO und Offenlegung gemäß § 25 MedienG
        </p>

        <div className="space-y-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          <section>
            <p className="text-gray-700 leading-relaxed">Elevate You GmbH</p>
            <p className="text-gray-700 leading-relaxed">Petrusgasse 16/1</p>
            <p className="text-gray-700 leading-relaxed">1030 Wien</p>
            <p className="text-gray-700 leading-relaxed">Österreich</p>
            <p className="text-gray-700 leading-relaxed mt-4">
              E-Mail: <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">info@elevateyou.app</a>
            </p>
          </section>

          <section>
            <p className="text-gray-700 leading-relaxed">
              <strong>Unternehmensgegenstand:</strong> Entwicklung, Betrieb und Vermarktung von digitalen Plattformen und IT-Lösungen zur Vermittlung und Organisation von Gesundheits-, Trainings-, Therapie- und Präventionsdienstleistungen
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Rechtsform:</strong> Gesellschaft mit beschränkter Haftung
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Firmenbuchnummer:</strong> FN 688469f
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Firmenbuchgericht:</strong> Handelsgericht Wien
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Geschäftsführung:</strong> Linda Breuer, Dominik Dorr, Arnold Stelzer
            </p>
          </section>

          <section>
            <p className="text-gray-700 leading-relaxed">
              <strong>Gewerbeberechtigung:</strong> IT-Dienstleistungen zur Vermittlung von Fachpersonal
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Gewerbebehörde:</strong> Magistratisches Bezirksamt für den 3. Bezirk, Wien
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Kammerzugehörigkeit:</strong> Wirtschaftskammer Wien
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Anwendbare Rechtsvorschriften:</strong> Gewerbeordnung 1994 (GewO), abrufbar unter{' '}
              <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-[#6D8EEC] hover:underline">
                www.ris.bka.gv.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Offenlegung gemäß § 25 MedienG
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Medieninhaberin:</strong> Elevate You GmbH
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Gesellschafter:innen:</strong> Linda Breuer, Dominik Dorr und Arnold Stelzer
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Grundlegende Richtung:</strong> Information über die Plattform elu sowie über Angebote aus den Bereichen Gesundheit, Bewegung, Ernährung und Prävention.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Verbraucherstreitbeilegung
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Haftung für Inhalte
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Die Inhalte dieser Website wurden sorgfältig erstellt. Für Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr. Die Inhalte dienen der allgemeinen Information und ersetzen keine medizinische Beratung, Diagnose oder Behandlung.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Haftung für Links
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Für Inhalte verlinkter externer Seiten sind ausschließlich deren Betreiber:innen verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir entsprechende Links umgehend.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Urheberrecht
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Alle Inhalte dieser Website (Texte, Bilder, Grafiken, Design) sind urheberrechtlich geschützt. Eine Nutzung oder Vervielfältigung ist ohne vorherige Zustimmung nicht gestattet.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Bildnachweis: Pexels (pexels.com)
            </p>
          </section>
        </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Impressum;
