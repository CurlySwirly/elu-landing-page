import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface DatenschutzProps {
  onBack?: () => void;
}

const Datenschutz: React.FC<DatenschutzProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#292B27] text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
                <img 
                  src="/favicon.png" 
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
            Datenschutzerklärung
          </h1>
          
          <div className="space-y-8 text-[#292B27] leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            <p className="text-lg">
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
            </p>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                1. Verantwortlich für die Datenverarbeitung
              </h2>
              <div className="space-y-2">
                <p>Elevate You GmbH (in Gründung)</p>
                <p>Wien, Österreich</p>
                <p>E-Mail: <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">info@elevateyou.app</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                2. Erhebung und Speicherung personenbezogener Daten
              </h2>
              <p className="mb-4">
                Beim Besuch unserer Website werden automatisch bestimmte Informationen erfasst:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Browsertyp, Betriebssystem und Spracheinstellungen</li>
              </ul>
              <p className="mt-4">
                Diese Daten sind technisch erforderlich, um die Website darzustellen und die Stabilität und Sicherheit zu gewährleisten.
              </p>
              <p className="mt-4">
                Zusätzlich verarbeiten wir personenbezogene Daten, die Sie uns freiwillig übermitteln, z. B. durch die Anmeldung zur Warteliste oder über das Kontaktformular (Name, E-Mail-Adresse, Telefonnummer, Nachricht).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                3. Zweck der Datenverarbeitung
              </h2>
              <p className="mb-4">
                Wir verarbeiten Ihre personenbezogenen Daten zu folgenden Zwecken:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Zur Bereitstellung und Verbesserung unserer Website</li>
                <li>Zur Bearbeitung Ihrer Anfragen</li>
                <li>Zur Registrierung für die Warteliste unserer App</li>
                <li>Zur Erfüllung gesetzlicher Verpflichtungen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                4. Rechtsgrundlage
              </h2>
              <p className="mb-4">
                Die Verarbeitung erfolgt auf Basis der gesetzlichen Bestimmungen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Vertragserfüllung bzw. vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO)</li>
                <li>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO) zur Verbesserung unserer Services</li>
                <li>Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) für Newsletter oder Marketing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                5. Weitergabe von Daten
              </h2>
              <p>
                Ihre Daten werden von uns nicht an Dritte weitergegeben, außer es ist für die Vertragserfüllung notwendig (z. B. Newsletter-Anbieter, Hosting-Dienstleister) oder gesetzlich vorgeschrieben.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                6. Cookies & Tracking
              </h2>
              <p className="mb-4">
                Unsere Website verwendet Cookies, um die Nutzerfreundlichkeit zu verbessern und statistische Auswertungen zu ermöglichen.
                Sie können in den Cookie-Einstellungen Ihres Browsers festlegen, ob Sie Cookies zulassen oder nicht.
              </p>
              <p>
                Wir nutzen zudem Analyse-Tools (z. B. Google Analytics), um das Verhalten der Besucher:innen auszuwerten. Dabei werden Cookies gesetzt und Informationen (inkl. IP-Adresse) an Server übertragen und gespeichert. Diese Daten sind anonymisiert und lassen keine Rückschlüsse auf Einzelpersonen zu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                7. Speicherdauer
              </h2>
              <p>
                Personenbezogene Daten werden nur so lange gespeichert, wie dies zur Erreichung der genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                8. Ihre Rechte
              </h2>
              <p className="mb-4">
                Sie haben jederzeit das Recht auf:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Auskunft über Ihre gespeicherten Daten</li>
                <li>Berichtigung oder Löschung Ihrer Daten</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerruf Ihrer Einwilligung</li>
                <li>Widerspruch gegen die Verarbeitung</li>
              </ul>
              <p className="mt-4">
                Dazu wenden Sie sich bitte an: <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">info@elevateyou.app</a>
              </p>
              <p className="mt-4">
                Wenn Sie der Meinung sind, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich bei der Datenschutzbehörde beschweren.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#6D8EEC]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                9. Datensicherheit
              </h2>
              <p>
                Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen Manipulation, Verlust oder unbefugten Zugriff zu schützen.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Datenschutz;
