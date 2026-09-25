import React, { useState } from 'react';
import { 
  Eye, 
  FileText, 
  Shield, 
  CreditCard, 
  Calendar, 
  MessageCircle, 
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  User
} from 'lucide-react';
import { formServices } from '../lib/formServices';
import { GENERIC_FORM_ERROR } from '../lib/formErrors';
import { EXPERT_PRICING } from '../lib/pricing';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';

interface ExpertPageProps {
  onBack?: () => void;
}

const ExpertPage: React.FC<ExpertPageProps> = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToBereitLoszulegen = () => {
    const element = document.getElementById('bereit-loszulegen');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize carousel to show first card
  React.useEffect(() => {
    setCurrentCard(0); // Start at first card
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await formServices.submitExpertApplication({
        name,
        email,
        phone: '', // Not collected in this form
        expertise,
        experience_years: 0, // Not collected in this form
        message: '' // Not collected in this form
      });

      if (result.success) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setName('');
          setEmail('');
          setExpertise([]);
        }, 3000);
      } else {
        alert(GENERIC_FORM_ERROR);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting expert application:', error);
      }
      alert(GENERIC_FORM_ERROR);
    }
  };

  const handleExpertiseChange = (value: string) => {
    setExpertise(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
    // Don't auto-close for multi-select, but provide better UX
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('.expertise-dropdown')) {
      setIsDropdownOpen(false);
    }
  };

  // Add click outside listener
  React.useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  const expertiseOptions = [
    'Personal Training',
    'Ernährungsberatung',
    'Coaching',
    'Physiotherapie',
    'Massage',
    'Yoga',
    'Andere'
  ];

  const appBenefits = [
    {
      icon: CreditCard,
      title: "Sichere Zahlungsabwicklung",
      description: "Klient:innen bezahlen bei der Buchung über Stripe."
    },
    {
      icon: Calendar,
      title: "Flexible Terminverwaltung",
      description: "Verfügbarkeiten und Buchungen an einem Ort."
    },
    {
      icon: Eye,
      title: "Sichtbarkeit bei deiner Zielgruppe",
      description: "Klient:innen finden dich über Fachgebiet, Standort und Schwerpunkte."
    },
    {
      icon: FileText,
      title: "Weniger Papierkram",
      description: "Rechnungen und Übersichten werden automatisch erstellt."
    },
    {
      icon: MessageCircle,
      title: "Direkter Chat",
      description: "Ende-zu-Ende-verschlüsselt mit deinen Klient:innen."
    },
    {
      icon: Shield,
      title: "Absicherung bei kurzfristigen Absagen",
      description: "Sagen Klient:innen weniger als 24 Stunden vor dem Termin ab, behältst du dein Honorar."
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => {
      const next = prev + 1;
      if (next >= appBenefits.length) {
        return 0; // Loop back to first card
      }
      return next;
    });
  };

  const prevCard = () => {
    setCurrentCard((prev) => {
      const next = prev - 1;
      if (next < 0) {
        return appBenefits.length - 1; // Loop to last card
      }
      return next;
    });
  };

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      orderClass: 'order-3 md:order-1',
      highlighted: false,
      badge: null as string | null,
      regular: null as string | null,
      price: EXPERT_PRICING.starter.price,
      period: EXPERT_PRICING.starter.period,
      priceNote: `+ ${EXPERT_PRICING.starter.feePercent} pro Buchung`,
      description: 'Ideal zum Ausprobieren',
      features: [
        `Die ersten ${EXPERT_PRICING.starter.freeBookings} Buchungen ohne Gebühr`,
        'Professionelles Profil',
        'Buchung, Zahlung & Chat',
        'Keine Fixkosten, keine Bindung',
      ],
      footer: null as string | null,
    },
    {
      id: 'monthly',
      name: 'Monatsabo',
      orderClass: 'order-1 md:order-2',
      highlighted: true,
      badge: 'Beliebt',
      regular: EXPERT_PRICING.monthly.regular,
      price: EXPERT_PRICING.monthly.intro,
      period: EXPERT_PRICING.monthly.period,
      priceNote: null,
      description: `Lohnt sich ab ca. ${EXPERT_PRICING.monthly.worthwhileFrom} Umsatz im Monat`,
      features: [
        '0 % Plattformgebühr',
        'Alles aus Starter',
        'Monatlich kündbar',
      ],
      footer: `Aktionspreis gilt bis ${EXPERT_PRICING.introEndsShort}, danach ${EXPERT_PRICING.monthly.regular} / ${EXPERT_PRICING.monthly.period}.`,
    },
    {
      id: 'yearly',
      name: 'Jahresabo',
      orderClass: 'order-2 md:order-3',
      highlighted: false,
      badge: null,
      regular: EXPERT_PRICING.yearly.regular,
      price: EXPERT_PRICING.yearly.intro,
      period: EXPERT_PRICING.yearly.period,
      priceNote: `entspricht ${EXPERT_PRICING.yearly.monthlyEquivalent} / Monat`,
      description: 'Für alle, die regelmäßig über elu arbeiten',
      features: [
        '0 % Plattformgebühr',
        'Alles aus Starter',
        'Preis für 12 Monate gesichert',
      ],
      footer: `Bei Abschluss bis ${EXPERT_PRICING.introEndsShort}. Danach ${EXPERT_PRICING.yearly.regular} / ${EXPERT_PRICING.yearly.period}.`,
    },
  ];

  const faqData = [
    {
      question: "Wie funktioniert die Abrechnung?",
      answer: "Deine Klient:innen bezahlen bei der Buchung über Stripe. Dein Honorar wird auf dein Stripe-Konto ausgezahlt, die Plattformgebühr wird dabei automatisch abgezogen. Im Abo zahlst du keine Plattformgebühr. In deinem Dashboard siehst du alle Buchungen und Einnahmen im Überblick."
    },
    {
      question: "Wie werde ich auf der Plattform sichtbar?",
      answer: "Klient:innen finden dich über dein Fachgebiet, deinen Standort und deine Schwerpunkte. Je vollständiger dein Profil, desto besser passen die Anfragen."
    },
    {
      question: "Kann ich mein Abo kündigen?",
      answer: "Ja. Das Monatsabo kannst du zum Ende des jeweiligen Monats kündigen, das Jahresabo zum Ende des Abojahres. Danach buchst du einfach im Provisionsmodell weiter – dein Profil bleibt aktiv."
    },
    {
      question: "Wie sicher sind meine Daten?",
      answer: (
        <>
          Deine Daten werden verschlüsselt übertragen und auf Servern in der EU gespeichert. Nachrichten im Chat sind Ende-zu-Ende-verschlüsselt. Mehr dazu in unserer{' '}
          <a href="/datenschutz" className="text-[#6D8EEC] hover:underline">Datenschutzerklärung</a>.
          {' '}[TODO: EU-Serverstandort für alle Systeme bestätigen]
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-light">
      <SiteHeader />

      <main className="pt-28 lg:pt-32 pb-16">
      <section className="bg-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#6D8EEC] hover:text-[#5a7ae8] mb-8 font-medium"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </a>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-10 md:mb-14">
            <div>
              <p
                className="inline-flex items-center rounded-full bg-[#E2E8FB] px-5 py-2 mb-6 text-sm font-medium text-[#6D8EEC]"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Für Expert:innen
              </p>
              <h1
                className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#292B27] leading-[1.15] tracking-tight mb-4"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Mehr Klient:innen.
                <br />
                <span className="whitespace-nowrap">Weniger Verwaltung.</span>
              </h1>
              <p
                className="text-base md:text-lg text-[#292B27]/75 leading-relaxed mb-8 max-w-xl"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Werde von Menschen gefunden, die gezielt nach deiner Expertise suchen – online oder vor Ort. Buchung, Zahlung und Rechnung laufen über elu.
              </p>
              <button
                type="button"
                onClick={scrollToBereitLoszulegen}
                className="btn-primary gap-2 px-7 py-3.5 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BADE4F]"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Jetzt Platz sichern
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-24px_rgba(41,43,39,0.25)]">
              <img
                src="/images/hero-pt.jpg"
                alt="Personal Trainer:in begleitet eine Klientin beim Training"
                className="w-full aspect-[4/3] max-h-[280px] sm:max-h-none object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
            </div>
          </div>

          <div className="md:hidden">
            <div className="bg-white p-6 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              {(() => {
                const benefit = appBenefits[currentCard];
                const IconComponent: React.ElementType = benefit.icon;
                return (
                  <>
                    <div className="w-12 h-12 bg-[#E2E8FB] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <IconComponent className="text-[#6D8EEC] w-6 h-6" />
                    </div>
                    <h3
                      className="text-lg font-bold text-[#292B27] mb-2 text-center"
                      style={{ fontFamily: 'League Spartan, sans-serif' }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-[#292B27]/70 leading-relaxed text-sm text-center"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                      {benefit.description}
                    </p>
                  </>
                );
              })()}
            </div>
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={prevCard}
                className="w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center"
                aria-label="Vorheriger Vorteil"
              >
                <ChevronLeft className="text-[#6D8EEC] w-5 h-5" />
              </button>
              <div className="flex gap-1.5">
                {appBenefits.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCard(index)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      index === currentCard ? 'bg-[#6D8EEC] w-5' : 'bg-[#E2E8FB] w-2'
                    }`}
                    aria-label={`Zeige Vorteil ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextCard}
                className="w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center"
                aria-label="Nächster Vorteil"
              >
                <ChevronRight className="text-[#6D8EEC] w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {appBenefits.map((benefit) => {
              const IconComponent: React.ElementType = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white p-6 rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col"
                >
                  <div className="w-12 h-12 bg-[#E2E8FB] rounded-2xl flex items-center justify-center mb-4">
                    <IconComponent className="text-[#6D8EEC] w-6 h-6" />
                  </div>
                  <h3
                    className="text-lg font-bold text-[#292B27] mb-2"
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="text-sm text-[#292B27]/70 leading-relaxed"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-light pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
            <h2
              className="text-2xl md:text-3xl lg:text-[36px] font-bold text-[#292B27] tracking-tight mb-4"
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              Wähle, wie du mit elu arbeitest
            </h2>
            <p
              className="text-base text-[#292B27]/75 leading-relaxed"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Du startest ohne Fixkosten. Buchst du regelmäßig, sparst du mit einem Abo die Plattformgebühr. Wechseln geht jederzeit.
            </p>
          </div>

          <p
            className="max-w-3xl mx-auto mb-10 md:mb-12 rounded-2xl bg-[#E2E8FB] px-5 py-3.5 text-center text-sm leading-relaxed text-[#292B27]"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            Einführungsaktion: Die ersten {EXPERT_PRICING.introSlots} Expert:innen sichern sich den Abo-Preis ab {EXPERT_PRICING.monthly.intro}/{EXPERT_PRICING.monthly.period} – nur bis {EXPERT_PRICING.introEndsLabel}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto pt-4">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex h-full flex-col bg-white p-6 md:p-8 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border-2 ${
                  plan.highlighted ? 'border-[#BADE4F]' : 'border-gray-100'
                } ${plan.orderClass}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block whitespace-nowrap bg-[#BADE4F] text-[#292B27] px-3 py-1.5 rounded-full text-xs font-semibold">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <h3
                    className="text-2xl font-bold text-[#292B27] mb-3 tracking-tight"
                    style={{ fontFamily: 'League Spartan, sans-serif' }}
                  >
                    {plan.name}
                  </h3>
                  <div className="mb-3">
                    {plan.regular && (
                      <del
                        aria-label={`regulärer Preis ${plan.regular}`}
                        className="block text-base text-[#292B27]/45 mb-0.5"
                      >
                        {plan.regular}
                      </del>
                    )}
                    <div>
                      <span
                        className="text-4xl font-bold text-[#6D8EEC]"
                        style={{ fontFamily: 'League Spartan, sans-serif' }}
                      >
                        {plan.price}
                      </span>
                      <span className="text-[#292B27]/60"> / {plan.period}</span>
                    </div>
                    {plan.priceNote && (
                      <p
                        className="mt-1 text-sm text-[#292B27]/60"
                        style={{ fontFamily: 'Open Sans, sans-serif' }}
                      >
                        {plan.priceNote}
                      </p>
                    )}
                  </div>
                  <p
                    className="text-sm text-[#292B27]/75"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-2.5 flex-1 text-left" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#BADE4F] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-[#292B27]/80 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.footer && (
                  <p
                    className="mt-auto pt-6 text-xs text-[#292B27]/50 leading-relaxed text-center"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {plan.footer}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={scrollToBereitLoszulegen}
              className="bg-[#6D8EEC] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#5A7BE8] transition-colors duration-200"
            >
              Jetzt Platz sichern
            </button>
          </div>
        </div>
      </section>

      <section className="bg-light py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-bold text-[#292B27] text-center mb-8 md:mb-10 tracking-tight"
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            Häufige Fragen
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <button
                  className="w-full px-4 md:px-8 py-4 md:py-6 text-left flex justify-between items-center hover:bg-gray-50 rounded-2xl transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-${index}`}
                >
                  <span className="text-base md:text-lg font-semibold text-[#292B27] pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="text-[#6D8EEC] flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-[#6D8EEC] flex-shrink-0" size={24} />
                  )}
                </button>
                {openFaq === index && (
                  <div id={`faq-${index}`} className="px-4 md:px-8 pb-4 md:pb-6">
                    <p className="text-[#292B27] opacity-75 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="bereit-loszulegen" className="bg-light py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl md:text-3xl lg:text-[36px] font-bold text-[#292B27] mb-4 md:mb-6 tracking-tight"
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            Bereit loszulegen?
          </h2>
          <p className="text-base md:text-lg text-[#292B27] opacity-80 mb-8 md:mb-12 max-w-2xl mx-auto">
            Werde Teil einer Community, die Qualität schätzt und neue Wege geht- melde dich jetzt zur Warteliste an.
          </p>
          
          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <div className="bg-[#BADE4F] bg-opacity-20 border-2 border-[#BADE4F] rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-[#BADE4F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-[#292B27]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#292B27] mb-2">
                  Vielen Dank!
                </h3>
                <p className="text-[#292B27] opacity-75">
                  Du stehst jetzt auf unserer Warteliste. Wir melden uns bald bei dir.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name-final" className="block text-sm font-semibold text-[#292B27] mb-2">
                      Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#292B27] opacity-40" size={20} />
                      <input
                        type="text"
                        id="name-final"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full focus:border-[#6D8EEC] focus:outline-none transition-colors duration-200 text-[#292B27]"
                        placeholder="Dein vollständiger Name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email-final" className="block text-sm font-semibold text-[#292B27] mb-2">
                      E-Mail *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#292B27] opacity-40" size={20} />
                      <input
                        type="email"
                        id="email-final"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-full focus:border-[#6D8EEC] focus:outline-none transition-colors duration-200 text-[#292B27]"
                        placeholder="deine@email.de"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="expertise-final" className="block text-sm font-semibold text-[#292B27] mb-2">
                    Wähle deine Fachgebiete (Mehrfachauswahl möglich)
                  </label>
                  <div className="relative expertise-dropdown">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full px-4 py-4 border-2 rounded-full focus:outline-none transition-all duration-200 text-[#292B27] min-h-[56px] flex items-center justify-center ${
                        isDropdownOpen 
                          ? 'border-[#6D8EEC] bg-[#F8F9FA]' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <span className="text-left">
                        {expertise.length === 0 
                          ? 'Fachgebiete auswählen...' 
                          : expertise.length === 1 
                            ? expertise[0]
                            : `${expertise.length} Fachgebiete ausgewählt`
                        }
                      </span>
                      <ChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto">
                        {expertiseOptions.map((option) => (
                          <label
                            key={option}
                            className="block px-4 py-3 hover:bg-gray-50 cursor-pointer first:rounded-t-2xl last:rounded-b-2xl"
                          >
                            <input
                              type="checkbox"
                              checked={expertise.includes(option)}
                              onChange={() => handleExpertiseChange(option)}
                              className="w-4 h-4 text-[#6D8EEC] border-2 border-gray-300 rounded focus:ring-[#6D8EEC] focus:ring-2"
                            />
                            <span className="ml-3 text-[#292B27]">{option}</span>
                          </label>
                        ))}
                        
                        {/* Done button */}
                        <div className="border-t border-gray-200 p-3">
                          <button
                            type="button"
                            onClick={() => setIsDropdownOpen(false)}
                            className="w-full bg-[#6D8EEC] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#5A7BE8] transition-colors duration-200"
                          >
                            Fertig ({expertise.length} ausgewählt)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="bg-[#6D8EEC] text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-[#5A7BE8] transition-colors duration-200 inline-flex items-center gap-2 md:gap-3 shadow-lg"
                  >
                    Abschicken
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <p className="text-sm text-[#292B27] opacity-60 mt-4">
                    * Pflichtfelder. Wir respektieren deine Privatsphäre.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ExpertPage;

