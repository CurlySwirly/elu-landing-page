import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface AGBProps {
  onBack?: () => void;
}

const AGB: React.FC<AGBProps> = ({ onBack }) => {

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
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#292B27] mb-8 text-center" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>

          {/* Table of Contents */}
          <div className="bg-[#E2E8FB] rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Inhaltsverzeichnis
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Geltungsbereich',
                'Leistungen',
                'Registrierung und Nutzung',
                'Vermittlungs- und Buchungsprozess',
                'Preise und Gebühren',
                'Storno und Ausfälle',
                'Haftung',
                'Datenschutz',
                'Urheberrecht',
                'Schlussbestimmungen'
              ].map((title, index) => (
                <a
                  key={index}
                  href={`#section-${index + 1}`}
                  className="text-[#6D8EEC] hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2 rounded px-2 py-1"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  {index + 1}. {title}
                </a>
              ))}
            </nav>
          </div>

          {/* Content Sections */}
          <div className="space-y-12 text-[#292B27] leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            
            <section id="section-1">
              <h2 className="text-3xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                1. Geltungsbereich
              </h2>
              <p className="text-lg leading-relaxed">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Besucher:innen und Nutzer:innen der Website elevateyou.app sowie für alle Leistungen, die durch die Elevate You FlexKapG (in Gründung) erbracht werden. Mit der Nutzung der Website bzw. der Registrierung auf unserer Plattform akzeptieren Sie diese AGB in der jeweils gültigen Fassung.
              </p>
            </section>

            <section id="section-2">
              <h2 className="text-3xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                2. Leistungen
              </h2>
              <p className="text-lg leading-relaxed">
                Elevate You bietet eine digitale Plattform zur Vermittlung von qualitätsgesicherten Gesundheits- und Präventionsangeboten (Trainer:innen, Coaches, Therapeut:innen). Die Plattform dient ausschließlich als Vermittler zwischen Expert:innen und Kund:innen. Verträge über Dienstleistungen kommen direkt zwischen den jeweiligen Expert:innen und den Kund:innen zustande.
              </p>
            </section>

            <section id="section-3">
              <h2 className="text-3xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                3. Registrierung und Nutzung
              </h2>
              <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed ml-4">
                <li>Die Nutzung bestimmter Funktionen (z. B. Warteliste oder zukünftige Buchungsfunktionen) erfordert eine Registrierung.</li>
                <li>Nutzer:innen sind verpflichtet, bei der Registrierung korrekte und vollständige Angaben zu machen.</li>
                <li>Zugangsdaten dürfen nicht an Dritte weitergegeben werden.</li>
              </ul>
            </section>

            <section id="section-4">
              <h2 className="text-3xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                4. Vermittlungs- und Buchungsprozess
              </h2>
              <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed ml-4">
                <li>Elevate You stellt die technische Infrastruktur für die Suche, Auswahl und Kontaktaufnahme bereit.</li>
                <li>Buchungen und Zahlungen erfolgen – sobald die Plattform live ist – über einen integrierten Zahlungsanbieter mit Treuhandfunktion (z. B. Stripe Connect).</li>
                <li>Elevate You tritt nicht als Vertragspartner oder Zahlungsdienstleister auf.</li>
              </ul>
            </section>

            <section id="section-5">
              <h2 className="text-3xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                5. Preise und Gebühren
              </h2>
              <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed ml-4">
                <li>Die Nutzung der Website ist für Kund:innen kostenfrei.</li>
                <li>Für Expert:innen können Gebühren (z. B. Provision pro Buchung oder Abonnement) anfallen. Diese werden transparent im jeweiligen Buchungsprozess bzw. im Benutzerkonto ausgewiesen.</li>
              </ul>
            </section>

            <section id="section-6">
              <h2 className="text-3xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                6. Storno und Ausfälle
              </h2>
              <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed ml-4">
                <li>Storno- und Ausfallregelungen werden klar und transparent im Buchungsprozess angezeigt.</li>
                <li>Im Falle einer Stornierung oder eines Ausfalls gelten die zwischen Kund:in und Expert:in vereinbarten Bedingungen.</li>
                <li>Elevate You haftet nicht für Nichterfüllung oder Ausfälle der gebuchten Leistungen.</li>
              </ul>
            </section>

            <section id="section-7">
              <h2 className="text-3xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                7. Haftung
              </h2>
              <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed ml-4">
                <li>Elevate You haftet ausschließlich für die ordnungsgemäße technische Bereitstellung der Plattform.</li>
                <li>Für die Qualität, Durchführung oder den Erfolg der vermittelten Leistungen sind die jeweiligen Expert:innen verantwortlich.</li>
                <li>Eine Haftung für Schäden, die aus der Nutzung der Plattform entstehen, ist ausgeschlossen, sofern diese nicht auf Vorsatz oder grober Fahrlässigkeit beruht.</li>
              </ul>
            </section>

            <section id="section-8">
              <h2 className="text-3xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                8. Datenschutz
              </h2>
              <p className="text-lg leading-relaxed">
                Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung.
              </p>
            </section>

            <section id="section-9">
              <h2 className="text-3xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                9. Urheberrecht
              </h2>
              <p className="text-lg leading-relaxed">
                Alle Inhalte auf der Website (Texte, Bilder, Grafiken, Design) sind urheberrechtlich geschützt. Jegliche Nutzung oder Vervielfältigung ohne vorherige schriftliche Zustimmung ist unzulässig.
              </p>
            </section>

            <section id="section-10">
              <h2 className="text-3xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                10. Schlussbestimmungen
              </h2>
              <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed ml-4">
                <li>Es gilt österreichisches Recht.</li>
                <li>Gerichtsstand ist Wien, soweit gesetzlich zulässig.</li>
                <li>Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AGB;
