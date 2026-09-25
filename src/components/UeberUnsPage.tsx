import React, { useEffect } from 'react';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';
import { useLocale } from '../i18n';

interface UeberUnsPageProps {
  onNavigate: (page: string) => void;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D8EEC]';

const SHOW_ELU_FOR_WORK = false;

const UeberUnsPage: React.FC<UeberUnsPageProps> = () => {
  const { t } = useLocale();
  const founders = [
    {
      name: 'Linda Breuer',
      role: t('about.lindaRole'),
      image: '/images/founder-linda.png',
      bio: t('about.lindaBio'),
    },
    {
      name: 'Dominik Dorr',
      role: t('about.dominikRole'),
      image: '/images/founder-dominik.png',
      bio: t('about.dominikBio'),
    },
    {
      name: 'Arnold Stelzer',
      role: t('about.arnoldRole'),
      image: '/images/founder-arnold.png',
      bio: t('about.arnoldBio'),
    },
  ];

  useEffect(() => {
    const previousTitle = document.title;
    const targetTitle = t('about.title');
    document.title = targetTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content') ?? '';
    const targetDescription = t('about.description');

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
  }, [t]);

  return (
    <div className="min-h-screen bg-light text-[#292B27]">
      <SiteHeader />

      <main className="pt-24 lg:pt-32 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol
              className="flex items-center gap-2 text-sm text-[#292B27]/70"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <li>
                <a href="/" className={`${focusRing} rounded-sm hover:underline`}>
                  {t('common.home')}
                </a>
              </li>
              <li aria-hidden="true">›</li>
              <li className="font-semibold text-[#292B27]">{t('about.crumb')}</li>
            </ol>
          </nav>

          <section className="mb-10 md:mb-12 lg:mb-16">
            <div className="rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5 sm:p-6 md:p-10">
              <p
                className="inline-flex items-center rounded-full bg-[#E2E8FB] px-4 py-1.5 mb-5 text-sm font-medium text-[#6D8EEC]"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {t('about.badge')}
              </p>
              <h1
                className="text-[24px] sm:text-[32px] md:text-[44px] lg:text-[48px] font-bold leading-[1.2] tracking-tight text-[#292B27] mb-3 md:mb-4"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                {t('about.h1Lead')}
                <br className="sm:hidden" />{' '}
                {t('about.h1Tail')}
              </h1>
              <p
                className="text-sm sm:text-base md:text-lg leading-relaxed text-[#292B27]/75 max-w-2xl mb-5 md:mb-6"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {t('about.intro')}
              </p>
              <div className="flex flex-wrap gap-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {[t('about.chip1'), t('about.chip2'), t('about.chip3')].map((item) => (
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

          <section className="mb-10 md:mb-12 lg:mb-16">
            <div className="mb-8">
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                {t('about.teamTitle')}
              </h2>
              <p
                className="text-base text-[#292B27]/70 max-w-2xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {t('about.teamSub')}
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

          <section className="mb-10 md:mb-12 lg:mb-16">
            <div className="mb-6">
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                {t('about.solutionsTitle')}
              </h2>
              <p
                className="text-base text-[#292B27]/70 max-w-2xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {t('about.solutionsSub')}
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
                  <li>{t('about.sol1')}</li>
                  <li>{t('about.sol2')}</li>
                  <li>{t('about.sol3')}</li>
                  <li>{t('about.sol4')}</li>
                </ul>
                <div className="mt-6">
                  <a
                    href="https://elevateyou.app"
                    className={`btn-primary px-6 py-3 text-sm ${focusRing}`}
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {t('about.solCta')}
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

          <section className="mb-10 md:mb-12 lg:mb-16">
            <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                {t('about.whyTitle')}
              </h2>
              <p
                className="text-base text-[#292B27]/75 mb-6 max-w-3xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {t('about.whyBody')}
              </p>
              <ul
                className="grid gap-3 sm:grid-cols-3"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {[
                  t('about.pillar1'),
                  t('about.pillar2'),
                  t('about.pillar3')
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

          <section className="mb-10 md:mb-12 lg:mb-16">
            <div className="mb-6">
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                {t('about.howTitle')}
              </h2>
              <p
                className="text-base text-[#292B27]/70 max-w-2xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {t('about.howSub')}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: t('about.how1Title'),
                  description: t('about.how1Body')
                },
                {
                  title: t('about.how2Title'),
                  description: t('about.how2Body')
                },
                {
                  title: t('about.how3Title'),
                  description: t('about.how3Body')
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
                {t('about.brandTitle')}
              </h2>
              <p
                className="text-base text-[#292B27]/75 mb-3"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {t('about.brandBody')}
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

