import React, { useEffect } from 'react';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';

interface UeberUnsPageProps {
  onNavigate: (page: string) => void;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D8EEC]';

const UeberUnsPage: React.FC<UeberUnsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    const previousTitle = document.title;
    const targetTitle = 'Über uns – elu | Elevate You GmbH';
    document.title = targetTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content') ?? '';
    const targetDescription =
      'elu ist die Marke der Elevate You GmbH. Wir verbinden Menschen und Teams mit qualifizierten Expert:innen für präventive Gesundheitsleistungen – inklusive B2B-Lösung elu for work.';

    if (metaDescription) {
      metaDescription.setAttribute('content', targetDescription);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.setAttribute('name', 'description');
      newMeta.setAttribute('content', targetDescription);
      document.head.appendChild(newMeta);
    }

    const jsonLdId = 'ueber-uns-jsonld';
    const existingJsonLd = document.getElementById(jsonLdId);

    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.id = jsonLdId;

    const pageUrl = `${window.location.origin}/ueber-uns`;

    jsonLdScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          'name': 'Elevate You GmbH',
          'url': pageUrl,
          'email': 'info@eluforwork.com',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Osterleitengasse 11',
            'postalCode': '1190',
            'addressLocality': 'Wien',
            'addressCountry': 'AT'
          }
        },
        {
          '@type': 'Brand',
          'name': 'elu',
          'url': pageUrl
        },
        {
          '@type': 'Product',
          'name': 'elu elevate you',
          'brand': {
            '@type': 'Brand',
            'name': 'elu'
          },
          'sameAs': ['https://elevateyou.app']
        },
        {
          '@type': 'Product',
          'name': 'elu for work',
          'brand': {
            '@type': 'Brand',
            'name': 'elu'
          },
          'sameAs': ['https://eluforwork.com']
        }
      ]
    });

    document.head.appendChild(jsonLdScript);

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', previousDescription);
      }
      document.getElementById(jsonLdId)?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4F4] text-[#292B27]">
      <SiteHeader onNavigate={onNavigate} />

      <main className="pt-28 lg:pt-36 pb-20">
        <nav
          aria-label="Breadcrumb"
          className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 mb-8"
        >
          <ol
            className="flex items-center gap-2 text-sm text-[#292B27]/80"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            <li>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className={`${focusRing} hover:underline hover:text-[#1f211d] transition-colors`}
              >
                Home
              </button>
            </li>
            <li aria-hidden="true">›</li>
            <li className="font-semibold">Über uns</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mb-20">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8 md:p-12 lg:p-16">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#292B27]"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                elu – Elevating Health &amp; Wellbeing
              </h1>
              <p
                className="text-lg md:text-xl leading-relaxed text-[#292B27]/90 max-w-3xl mb-10"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                elu ist die Marke der Elevate You GmbH in Wien. Unsere Mission: präventive Gesundheit zugänglich,
                alltagstauglich und menschlich machen – für Einzelpersonen ebenso wie für Teams.
              </p>
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-semibold text-[#292B27]"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {['EU-Hosting', 'DSGVO-konform', 'Sichere Zahlung'].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-[#E2E8FB] px-4 py-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Unsere Lösungen */}
        <section className="mb-20">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Unsere Lösungen
              </h2>
              <p
                className="text-lg text-[#292B27]/80 max-w-2xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Zwei Angebote, ein Ziel: Menschen mit qualifizierten Expert:innen verbinden – persönlich und im Arbeitsumfeld.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <article className="rounded-3xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <header className="mb-6">
                  <h3
                    className="text-2xl font-semibold"
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                  >
                    <span className="font-bold">elu.</span>{' '}
                    <span className="italic font-extralight">elevate you</span>
                  </h3>
                </header>
                <ul
                  className="space-y-3 text-[#292B27]/90"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <li>Plattform für präventive Gesundheitsdienstleistungen (Coaching, Ernährung, Physio, Massage)</li>
                  <li>Intelligentes Matching, einfache Buchung und digitale Begleitung</li>
                  <li>Qualitätsgesichert durch kuratierte Expert:innen-Profile</li>
                  <li>Digitaler Assistent für Expert:innen inklusive Termin- und Kund:innenmanagement</li>
                </ul>
                <div className="mt-8">
                  <a
                    href="https://elevateyou.app"
                    className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(109,142,236,0.25)] ${focusRing}`}
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    Zu elu elevate you
                  </a>
                </div>
              </article>

              <article className="rounded-3xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <header className="mb-6">
                  <h3
                    className="text-2xl font-semibold"
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                  >
                    <span className="font-bold">elu.</span>{' '}
                    <span className="italic font-extralight">for work</span>
                  </h3>
                </header>
                <ul
                  className="space-y-3 text-[#292B27]/90"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <li>Tägliche Check-ins für Mitarbeitende – niederschwellig und anonym</li>
                  <li>Anonymisierte Trends für Führungsteams ohne personenbezogene Daten</li>
                  <li>Konkrete Empfehlungen für präventive Maßnahmen im Unternehmen</li>
                  <li>Ideal für KMU bis rund 100 Mitarbeitende</li>
                </ul>
                <div className="mt-8">
                  <a
                    href="https://eluforwork.com"
                    className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(109,142,236,0.25)] ${focusRing}`}
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    Zu elu for work
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Warum elu */}
        <section className="mb-20">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#E2E8FB] p-8 md:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Warum elu?
              </h2>
              <p
                className="text-lg text-[#292B27]/85 mb-8 max-w-3xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Wir verbinden präventive Gesundheitsangebote mit echter Menschlichkeit. Unser Ansatz schafft Vertrauen, Transparenz und nachhaltige Wirkung – für Einzelpersonen, Teams und Expert:innen.
              </p>
              <ul
                className="grid gap-4 sm:grid-cols-3 text-[#292B27]"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {[
                  'Verbindung von Mensch & Gesundheit',
                  'Expertise & Alltag',
                  'Individuum & Gemeinschaft'
                ].map((pillar) => (
                  <li
                    key={pillar}
                    className="rounded-2xl bg-white/80 px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
                  >
                    <span className="font-semibold">{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* So funktioniert's */}
        <section className="mb-20">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                So funktioniert&apos;s
              </h2>
              <p
                className="text-lg text-[#292B27]/80 max-w-2xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Drei Schritte, die Menschen mit der passenden Expertise verbinden – digital begleitet, persönlich umgesetzt.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: '1) Ziele klären',
                  description:
                    'Bedarfe verstehen, Gesundheitsziele definieren und die Ausgangslage einschätzen.'
                },
                {
                  title: '2) Passende Expertise finden',
                  description:
                    'Mit kuratierten Expert:innen matchen – transparent, sicher und DSGVO-konform.'
                },
                {
                  title: '3) Dranbleiben mit Begleitung',
                  description:
                    'Kontinuierliche Check-ins, Feedback und Unterstützung für nachhaltige Wirkung.'
                }
              ].map((step) => (
                <article
                  key={step.title}
                  className="rounded-3xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[#292B27]/80"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="#marke"
                className={`inline-flex items-center text-sm font-semibold text-[#292B27] hover:text-[#1f211d] hover:underline transition-colors ${focusRing}`}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Mehr über unsere Markenlogik
              </a>
            </div>
          </div>
        </section>

        {/* Marke & Unternehmen */}
        <section id="marke" className="pt-12">
          <div className="w-full h-[2px] bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] mb-8" aria-hidden="true" />
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white p-8 md:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Marke &amp; Trägerunternehmen
              </h2>
              <p
                className="text-lg text-[#292B27]/85 mb-6"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                elu ist eine Marke der Elevate You GmbH.
              </p>
              <p
                className="text-[#292B27]/85 mb-6"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Elevate You GmbH, Osterleitengasse 11, 1190 Wien ·{' '}
                <a
                  href="mailto:info@elevateyou.app"
                  className={`font-semibold text-[#292B27] hover:text-[#1f211d] hover:underline transition-colors ${focusRing}`}
                >
                  info@elevateyou.app
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
};

export default UeberUnsPage;

