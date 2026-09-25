import React, { useEffect } from 'react';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';

interface UeberUnsPageProps {
  onNavigate: (page: string) => void;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D8EEC]';

const SHOW_ELU_FOR_WORK = false;

const founders = [
  {
    name: 'Linda Breuer',
    role: 'Mitgründerin & Geschäftsführerin · Produkt, Marke & Community',
    image: '/images/founder-linda.png',
    bio: 'Über zehn Jahre als Health- und Performance-Coach, davor Leistungsbasketball: Linda kennt die Gesundheitsbranche von beiden Seiten. Sie weiß, wie schwer es ist, die passende Unterstützung zu finden, und wie viel Zeit Selbstständige mit Terminen, Rechnungen und Marketing verlieren. Bei elu gestaltet sie Produkt, Marke und Community. Ihr Ziel: Prävention soll so selbstverständlich werden wie der Arztbesuch.',
  },
  {
    name: 'Dominik Dorr',
    role: 'Mitgründer & Geschäftsführer · Technologie & Plattform',
    image: '/images/founder-dominik.png',
    bio: 'Hinter jeder Buchung auf elu steckt Dominiks Arbeit. Der Software-Engineer baut die technische Basis der Plattform, vom Backend über die Zahlungsabwicklung bis zur Datensicherheit. Sein Anspruch: Alles muss im Hintergrund zuverlässig laufen, damit sich Klient:innen und Expert:innen ganz aufeinander konzentrieren können. Ausgleich findet er beim Laufen.',
  },
  {
    name: 'Arnold Stelzer',
    role: 'Mitgründer & Geschäftsführer · App & User Experience',
    image: '/images/founder-arnold.png',
    bio: 'Arnold denkt Software vom Menschen aus. Als Software-Engineer entwickelt er die elu-App und sorgt dafür, dass sich Suchen, Chatten und Buchen intuitiv anfühlen, auch für alle, die sonst wenig mit Technik am Hut haben. Vom Klettern bringt er Geduld und Präzision mit: Gute Lösungen entstehen Schritt für Schritt.',
  },
];

const UeberUnsPage: React.FC<UeberUnsPageProps> = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const targetTitle = 'Über uns – elu | Elevate You GmbH';
    document.title = targetTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content') ?? '';
    const targetDescription =
      'elu ist die Marke der Elevate You GmbH in Wien. Wir verbinden Menschen mit qualifizierten Expert:innen für Bewegung, Ernährung und Prävention.';

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
          'email': 'info@elevateyou.app',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Petrusgasse 16/1',
            'postalCode': '1030',
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
        ...(SHOW_ELU_FOR_WORK
          ? [{
              '@type': 'Product',
              'name': 'elu for work',
              'brand': {
                '@type': 'Brand',
                'name': 'elu'
              },
              'sameAs': ['https://eluforwork.com']
            }]
          : [])
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
    <div className="min-h-screen bg-light text-[#292B27]">
      <SiteHeader />

      <main className="pt-28 lg:pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol
              className="flex items-center gap-2 text-sm text-[#292B27]/70"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <li>
                <a href="/" className={`${focusRing} rounded-sm hover:underline`}>
                  Home
                </a>
              </li>
              <li aria-hidden="true">›</li>
              <li className="font-semibold text-[#292B27]">Über uns</li>
            </ol>
          </nav>

          <section className="mb-12 lg:mb-16">
            <div className="rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 md:p-10">
              <p
                className="inline-flex items-center rounded-full bg-[#E2E8FB] px-4 py-1.5 mb-5 text-sm font-medium text-[#6D8EEC]"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Elevate You GmbH · Wien
              </p>
              <h1
                className="text-[32px] md:text-[44px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-[#292B27] mb-4"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                elu – Elevating Health &amp; Wellbeing
              </h1>
              <p
                className="text-base md:text-lg leading-relaxed text-[#292B27]/75 max-w-2xl mb-6"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                elu ist die Marke der Elevate You GmbH in Wien. Unsere Mission: präventive Gesundheit zugänglich,
                alltagstauglich und menschlich machen.
              </p>
              <div className="flex flex-wrap gap-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {['EU-Hosting', 'DSGVO-konform', 'Sichere Zahlung'].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full bg-[#E2E8FB] px-4 py-1.5 text-sm font-medium text-[#6D8EEC]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12 lg:mb-16">
            <div className="mb-8">
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Das Gründungsteam
              </h2>
              <p
                className="text-base text-[#292B27]/70 max-w-2xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Drei Geschäftsführer:innen, ein Ziel: Prävention alltagstauglich machen.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {founders.map((founder) => (
                <article
                  key={founder.name}
                  className="card-lift rounded-3xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col"
                >
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-24 h-24 mb-5"
                  />
                  <h3
                    className="text-xl font-bold text-[#292B27] mb-2"
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                  >
                    {founder.name}
                  </h3>
                  <p
                    className="text-sm font-medium text-[#6D8EEC] mb-4 leading-snug"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {founder.role}
                  </p>
                  <p
                    className="text-sm leading-relaxed text-[#292B27]/75"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {founder.bio}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12 lg:mb-16">
            <div className="mb-6">
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Unsere Lösungen
              </h2>
              <p
                className="text-base text-[#292B27]/70 max-w-2xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {SHOW_ELU_FOR_WORK
                  ? 'Zwei Angebote, ein Ziel: Menschen mit qualifizierten Expert:innen verbinden – persönlich und im Arbeitsumfeld.'
                  : 'Wir verbinden Menschen mit qualifizierten Expert:innen – persönlich und alltagstauglich.'}
              </p>
            </div>

            <div className={`grid gap-5 ${SHOW_ELU_FOR_WORK ? 'md:grid-cols-2' : ''}`}>
              <article className="rounded-3xl bg-white p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ fontFamily: 'League Spartan, sans-serif' }}
                >
                  <span className="font-bold">elu.</span>{' '}
                  <span className="italic font-extralight">elevate you</span>
                </h3>
                <ul
                  className="space-y-2.5 text-sm md:text-base text-[#292B27]/80"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <li>Plattform für präventive Gesundheitsdienstleistungen (Physiotherapie, Personal Training, Massage, Ernährung, Yoga, Coaching)</li>
                  <li>Intelligentes Matching, einfache Buchung und digitale Begleitung</li>
                  <li>Qualitätsgesichert durch kuratierte Expert:innen-Profile</li>
                  <li>Digitaler Assistent für Expert:innen inklusive Termin- und Klient:innenverwaltung</li>
                </ul>
                <div className="mt-6">
                  <a
                    href="https://elevateyou.app"
                    className={`btn-primary px-6 py-3 text-sm ${focusRing}`}
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    Zu elu elevate you
                  </a>
                </div>
              </article>

              {SHOW_ELU_FOR_WORK && (
              <article className="rounded-3xl bg-white p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ fontFamily: 'League Spartan, sans-serif' }}
                >
                  <span className="font-bold">elu.</span>{' '}
                  <span className="italic font-extralight">for work</span>
                </h3>
                <ul
                  className="space-y-2.5 text-sm md:text-base text-[#292B27]/80"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <li>Tägliche Check-ins für Mitarbeitende – niederschwellig und anonym</li>
                  <li>Anonymisierte Trends für Führungsteams ohne personenbezogene Daten</li>
                  <li>Konkrete Empfehlungen für präventive Maßnahmen im Unternehmen</li>
                  <li>Ideal für KMU bis rund 100 Mitarbeitende</li>
                </ul>
                <div className="mt-6">
                  <a
                    href="https://eluforwork.com"
                    className={`btn-primary px-6 py-3 text-sm ${focusRing}`}
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    Zu elu for work
                  </a>
                </div>
              </article>
              )}
            </div>
          </section>

          <section className="mb-12 lg:mb-16">
            <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Warum elu?
              </h2>
              <p
                className="text-base text-[#292B27]/75 mb-6 max-w-3xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Wir verbinden präventive Gesundheitsangebote mit echter Menschlichkeit. Unser Ansatz schafft Vertrauen, Transparenz und nachhaltige Wirkung – für Klient:innen und Expert:innen.
              </p>
              <ul
                className="grid gap-3 sm:grid-cols-3"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {[
                  'Verbindung von Mensch & Gesundheit',
                  'Expertise & Alltag',
                  'Individuum & Gemeinschaft'
                ].map((pillar) => (
                  <li
                    key={pillar}
                    className="rounded-2xl bg-light px-5 py-4 text-sm font-semibold text-[#292B27]"
                  >
                    {pillar}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-12 lg:mb-16">
            <div className="mb-6">
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                So funktioniert&apos;s
              </h2>
              <p
                className="text-base text-[#292B27]/70 max-w-2xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Drei Schritte, die Menschen mit der passenden Expertise verbinden – digital begleitet, persönlich umgesetzt.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
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
                    className="text-lg font-bold mb-2"
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#292B27]/75"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="marke">
            <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Marke &amp; Trägerunternehmen
              </h2>
              <p
                className="text-base text-[#292B27]/75 mb-3"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                elu ist eine Marke der Elevate You GmbH.
              </p>
              <p
                className="text-sm text-[#292B27]/70"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Elevate You GmbH, Petrusgasse 16/1, 1030 Wien · FN 688469f ·{' '}
                <a
                  href="mailto:info@elevateyou.app"
                  className={`font-semibold text-[#6D8EEC] hover:underline ${focusRing} rounded-sm`}
                >
                  info@elevateyou.app
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default UeberUnsPage;

