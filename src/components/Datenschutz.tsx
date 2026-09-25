import React from 'react';
import { ArrowLeft } from 'lucide-react';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';

const Datenschutz: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-28 lg:pt-36">
        <a
          href="/"
          className="flex items-center gap-2 text-[#6D8EEC] hover:text-[#5a7ae0] transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück zur Startseite
        </a>

        <h1 className="text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          Datenschutzerklärung
        </h1>
        <p className="text-gray-600 mb-12" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Stand: September 2026
        </p>

        <div className="space-y-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              1. Verantwortliche
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Elevate You GmbH, Petrusgasse 16/1, 1030 Wien, Österreich
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              E-Mail: <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">info@elevateyou.app</a>
            </p>
            <p className="text-gray-700 leading-relaxed">
              Diese Datenschutzerklärung gilt für die Website elevateyou.app und die Warteliste. Für die elu-Plattform (Buchungen, Zahlungen, Chat) gilt eine gesonderte Datenschutzerklärung, die vor der Registrierung bereitgestellt wird.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              2. Hosting und Server-Logfiles
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unsere Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf der Website werden technisch notwendige Daten verarbeitet: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL, Browsertyp und Betriebssystem.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zweck: Auslieferung, Stabilität und Sicherheit der Website.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Rechtsgrundlage: berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Speicherdauer: Die Logfiles werden von Vercel nur kurzfristig für Betrieb und Sicherheit gespeichert und anschließend automatisch gelöscht.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Mit Vercel besteht ein Auftragsverarbeitungsvertrag. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert; ergänzend gelten Standardvertragsklauseln.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              3. Warteliste
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wenn du dich für die Warteliste einträgst, verarbeiten wir: Vorname bzw. Name, E-Mail-Adresse und ob du dich als Klient:in oder Expert:in einträgst. Bei Expert:innen zusätzlich deine Fachgebiete. Beim Newsletter erfassen wir deine E-Mail-Adresse.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zweck: Wir informieren dich über den Start von elu und schicken dir Informationen zur Plattform und zum Zugang.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Rechtsgrundlage: deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst sie jederzeit per E-Mail an{' '}
              <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">info@elevateyou.app</a>
              {' '}oder über den Abmeldelink in unseren E-Mails widerrufen. Die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt davon unberührt.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Speicherdauer: bis zu deinem Widerruf, längstens 12 Monate nach dem Start der Plattform, sofern du dich nicht registrierst.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Die Daten werden in einer Datenbank von Supabase Inc. gespeichert. Mit Supabase besteht ein Auftragsverarbeitungsvertrag.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              4. Kontakt per E-Mail
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wenn du uns per E-Mail kontaktierst, verarbeiten wir deine Angaben zur Bearbeitung deiner Anfrage (Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen Anfragen, sonst Art. 6 Abs. 1 lit. f DSGVO). Wir löschen die Daten, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              5. Cookies und Analyse
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Tools. Schriftarten und Bilder werden von unserem eigenen Server ausgeliefert.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              6. Links zu sozialen Netzwerken
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Auf unserer Website verlinken wir auf unsere Profile bei Instagram, Facebook und LinkedIn. Es handelt sich um einfache Links, keine eingebetteten Plugins. Erst wenn du einen Link anklickst, gelangst du auf die Seite des jeweiligen Anbieters, für die dessen Datenschutzbestimmungen gelten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              7. Empfänger
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wir geben deine Daten nicht an Dritte weiter, außer an die oben genannten Auftragsverarbeiter (Vercel, Supabase) oder wenn wir gesetzlich dazu verpflichtet sind. Wir verkaufen keine Daten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              8. Deine Rechte
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, erteilte Einwilligungen jederzeit zu widerrufen. Schreib uns dazu an{' '}
              <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">info@elevateyou.app</a>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Du hast außerdem das Recht, dich bei der Aufsichtsbehörde zu beschweren: Österreichische Datenschutzbehörde, Barichgasse 40–42, 1030 Wien,{' '}
              <a href="mailto:dsb@dsb.gv.at" className="text-[#6D8EEC] hover:underline">dsb@dsb.gv.at</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              9. Datensicherheit
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Die Übertragung erfolgt verschlüsselt (TLS). Wir setzen angemessene technische und organisatorische Maßnahmen ein, um deine Daten vor Verlust und unbefugtem Zugriff zu schützen.
            </p>
          </section>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Datenschutz;
