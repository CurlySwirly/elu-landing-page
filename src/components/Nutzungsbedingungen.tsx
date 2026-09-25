import React from 'react';
import { ArrowLeft } from 'lucide-react';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';
import LegalLanguageNote from './layout/LegalLanguageNote';
import { useLocale } from '../i18n';

const Nutzungsbedingungen: React.FC = () => {
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
          Nutzungsbedingungen für Website und Warteliste
        </h1>
        <p className="text-gray-600 mb-12" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Stand: September 2026
        </p>

        <div className="space-y-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              1. Geltungsbereich
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Diese Bedingungen gelten für die Nutzung der Website elevateyou.app und die Eintragung in die Warteliste. Buchungen sind über diese Website noch nicht möglich. Für die Nutzung der elu-Plattform gelten gesonderte Allgemeine Geschäftsbedingungen, die du vor deiner Registrierung ausdrücklich akzeptierst.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              2. Warteliste
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Die Eintragung ist kostenlos und unverbindlich. Sie begründet keinen Anspruch auf Zugang zur Plattform zu einem bestimmten Zeitpunkt oder zu bestimmten Konditionen. Du kannst dich jederzeit per E-Mail an{' '}
              <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">info@elevateyou.app</a>
              {' '}oder über den Abmeldelink austragen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              3. Deine Angaben
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Bitte gib bei der Eintragung korrekte Daten und ausschließlich deine eigene E-Mail-Adresse an.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              4. Inhalte der Website
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Die Inhalte dienen der allgemeinen Information und ersetzen keine ärztliche Beratung, Diagnose oder Behandlung.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              5. Haftung
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wir haften für Schäden nur bei Vorsatz oder grober Fahrlässigkeit. Dieser Ausschluss gilt nicht für Personenschäden sowie in Fällen, in denen eine Haftung gesetzlich zwingend vorgesehen ist.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              6. Urheberrecht
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Alle Inhalte der Website sind urheberrechtlich geschützt. Eine Nutzung oder Vervielfältigung ist ohne vorherige Zustimmung nicht gestattet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              7. Änderungen
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wir können diese Bedingungen für die Zukunft anpassen. Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              8. Anwendbares Recht und Gerichtsstand
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Es gilt österreichisches Recht unter Ausschluss der Verweisungsnormen. Für Verbraucher:innen bleiben zwingende Schutzbestimmungen des Staates, in dem sie ihren gewöhnlichen Aufenthalt haben, unberührt. Gerichtsstand für Unternehmer:innen ist Wien; für Verbraucher:innen gelten die gesetzlichen Gerichtsstände.
            </p>
          </section>
        </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Nutzungsbedingungen;
