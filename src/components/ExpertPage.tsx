import React, { useState } from 'react';
import { 
  Users, 
  Eye, 
  FileText, 
  Shield, 
  Star, 
  CreditCard, 
  Calendar, 
  MessageCircle, 
  TrendingUp,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  User
} from 'lucide-react';

interface ExpertPageProps {
  onBack?: () => void;
}

const ExpertPage: React.FC<ExpertPageProps> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [standardEmail, setStandardEmail] = useState('');
  const [proEmail, setProEmail] = useState('');
  const [standardEmailSubmitted, setStandardEmailSubmitted] = useState(false);
  const [proEmailSubmitted, setProEmailSubmitted] = useState(false);

  const scrollToBereitLoszulegen = () => {
    const element = document.getElementById('bereit-loszulegen');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pricing configuration - can be updated to show actual prices when available
  const pricingConfig = {
    beta: { price: "0", range: null },
    standard: { price: null, range: null },
    pro: { price: null, range: null }
  };

  // Initialize carousel to show first card
  React.useEffect(() => {
    setCurrentCard(0); // Start at first card
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Waitlist signup:', { name, email, expertise });
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setExpertise([]);
    }, 3000);
  };

  const handleExpertiseChange = (value: string) => {
    setExpertise(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleStandardEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Standard plan email:', standardEmail);
    setStandardEmailSubmitted(true);
    setTimeout(() => {
      setStandardEmailSubmitted(false);
      setStandardEmail('');
    }, 3000);
  };

  const handleProEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pro plan email:', proEmail);
    setProEmailSubmitted(true);
    setTimeout(() => {
      setProEmailSubmitted(false);
      setProEmail('');
    }, 3000);
  };

  const renderPriceDisplay = (planConfig: { price: string | null, range: string | null }) => {
    if (planConfig.price) {
      return (
        <div className="mb-4">
          <span className="text-4xl font-bold text-[#6D8EEC]">{planConfig.price} €</span>
          <span className="text-[#292B27] opacity-60"> / Monat</span>
        </div>
      );
    } else if (planConfig.range) {
      return (
        <div className="mb-4">
          <span className="text-4xl font-bold text-[#6D8EEC]">ab {planConfig.range} €</span>
          <span className="text-[#292B27] opacity-60">/Monat</span>
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <span className="text-2xl font-bold text-[#6D8EEC]">Preis in Arbeit</span>
        </div>
      );
    }
  };

  const expertiseOptions = [
    'Personal Training',
    'Ernährungsberatung',
    'Coaching',
    'Physiotherapie',
    'Massage',
    'Andere'
  ];

  const appBenefits = [
    {
      icon: CreditCard,
      title: "Sichere Zahlungsabwicklung",
      description: "Transparente und sichere Abwicklung aller Zahlungen über die Plattform."
    },
    {
      icon: Calendar,
      title: "Flexible Terminverwaltung",
      description: "Kalender-Integration für einfache Terminplanung und -verwaltung."
    },
    {
      icon: Eye,
      title: "Profil-Sichtbarkeit",
      description: "Optimale Sichtbarkeit bei deiner relevanten Zielgruppe."
    },
    {
      icon: FileText,
      title: "Vereinfachte Rechnungslegung",
      description: "Monatsübersicht und automatisierte Rechnungserstellung."
    },
    {
      icon: MessageCircle,
      title: "Direkter Chat",
      description: "Kommunikation mit deiner Kundschaft direkt über die App."
    },
    {
      icon: Shield,
      title: "Ausfallschutz inklusive",
      description: "Storno- und Ausfallschutz für deine finanzielle Sicherheit."
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

  const faqData = [
    {
      question: "Wie funktioniert die Abrechnung?",
      answer: "Die Abrechnung erfolgt automatisch über die App. Du erhältst eine übersichtliche Monatsabrechnung mit allen Details zu deinen Einnahmen und Buchungen."
    },
    {
      question: "Wie werde ich auf der Plattform sichtbar?",
      answer: "Dein Profil wird basierend auf deiner Expertise und den Suchkriterien der Nutzer:innen angezeigt. In der Beta-Phase profitierst du von einer besonders hohen Sichtbarkeit."
    },
    {
      question: "Kann ich jederzeit kündigen?",
      answer: "Ja, du kannst dein Abonnement jederzeit zum Monatsende kündigen. Es gibt keine Mindestlaufzeit oder versteckte Gebühren."
    },
    {
      question: "Wie sicher sind meine Daten?",
      answer: "Wir verwenden modernste Verschlüsselungstechnologien und erfüllen alle DSGVO-Anforderungen. Deine Daten werden sicher und vertraulich behandelt."
    }
  ];

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
          <ChevronLeft className="w-4 h-4" />
          Zurück
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#BADE4F]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 via-[#F0F0F0]/10 to-[#6D8EEC]/10"></div>
        <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#292B27] leading-tight tracking-tight mb-6">
              Dein Weg zu neuer Kundschaft – werde Teil von elu
            </h1>
            <p className="text-lg lg:text-xl text-[#292B27] opacity-80 leading-relaxed mb-16">
              elu bringt deine Expertise direkt zu den Menschen. Keine Selbstvermarktung mehr notwendig – wir übernehmen das.
            </p>
            
            {/* Carousel */}
            <div className="relative mb-8">
              {/* Left Arrow */}
              <button
                onClick={prevCard}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg border-2 border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                aria-label="Vorheriger Vorteil"
              >
                <ChevronLeft className="text-[#6D8EEC] w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextCard}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg border-2 border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                aria-label="Nächster Vorteil"
              >
                <ChevronRight className="text-[#6D8EEC] w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Carousel Container */}
              <div className="overflow-hidden px-8 md:px-16">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentCard * 100}%)` }}
                >
                  {appBenefits.map((benefit, index) => {
                    const IconComponent: React.ElementType = benefit.icon;
                    return (
                      <div
                        key={index}
                        className="w-full flex-shrink-0 px-2 md:px-4"
                      >
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-[#6D8EEC] h-48 md:h-64 max-w-sm mx-auto">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#6D8EEC] rounded-xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                            <IconComponent className="text-white w-6 h-6 md:w-8 md:h-8" />
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-[#292B27] mb-3 md:mb-4 tracking-tight text-center">
                            {benefit.title}
                          </h3>
                          <p className="text-[#292B27] opacity-75 leading-relaxed text-sm md:text-base text-center">
                            {benefit.description}
                          </p>
                          <div className="w-8 md:w-10 h-1 bg-[#BADE4F] rounded-full mt-3 md:mt-4 mx-auto"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Card indicators */}
            <div className="flex justify-center gap-2 mb-8">
              {appBenefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCard(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentCard ? 'bg-[#6D8EEC]' : 'bg-gray-300'
                  }`}
                  aria-label={`Zeige Vorteil ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Preise & Modelle */}
      <section className="bg-[#F0F0F0] py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#292B27] text-center mb-16 tracking-tight">
            Unsere Preismodelle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Beta */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-[#BADE4F] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#BADE4F] text-[#292B27] px-4 py-2 rounded-full text-sm font-semibold">
                  Jetzt verfügbar
                </span>
              </div>
              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-bold text-[#292B27] mb-4 tracking-tight">
                  Beta (jetzt verfügbar)
                </h3>
                {renderPriceDisplay(pricingConfig.beta)}
                <p className="text-sm text-[#292B27] opacity-75">
                  + 10 % Kommission pro Buchung
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-[#BADE4F] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Volle Profil-Sichtbarkeit</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#BADE4F] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Neue Kundschaft gewinnen</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#BADE4F] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Einfache Abrechnung & Stornoschutz</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#BADE4F] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Keine Selbstvermarktung nötig – wir übernehmen das</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#BADE4F] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Feedback geben und Plattform mitgestalten</span>
                </li>
              </ul>
              <button 
                onClick={scrollToBereitLoszulegen}
                className="w-full bg-[#6D8EEC] text-white py-4 rounded-full font-semibold hover:bg-[#5A7BE8] transition-colors duration-200"
              >
                Beta-Zugang sichern
              </button>
            </div>

            {/* Standard */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border-2 border-gray-100 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#E2E8FB] text-[#292B27] px-4 py-2 rounded-full text-sm font-semibold border border-gray-200">
                  Geplant
                </span>
              </div>
              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-bold text-[#292B27] mb-4 tracking-tight">
                  Standard
                </h3>
                {renderPriceDisplay(pricingConfig.standard)}
                <p className="text-sm text-[#292B27] opacity-75">
                  ab Launch
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-[#6D8EEC] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Bis zu 20 Buchungen pro Monat</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#6D8EEC] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Volle Sichtbarkeit</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#6D8EEC] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Komplette Abwicklung</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#6D8EEC] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Support inklusive</span>
                </li>
              </ul>
              {!pricingConfig.standard.price && !pricingConfig.standard.range ? (
                <div className="space-y-4">
                  {standardEmailSubmitted ? (
                    <div className="text-center p-3 bg-[#BADE4F] bg-opacity-20 rounded-xl" role="status" aria-live="polite">
                      <p className="text-sm text-[#292B27] font-semibold">Danke! Wir benachrichtigen dich.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleStandardEmailSubmit} className="space-y-3">
                      <input
                        type="email"
                        value={standardEmail}
                        onChange={(e) => setStandardEmail(e.target.value)}
                        placeholder="deine@email.de"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-[#6D8EEC] focus:outline-none transition-colors duration-200"
                        aria-label="E-Mail für Standard Plan Benachrichtigung"
                      />
                      <button
                        type="submit"
                        className="w-full border-2 border-[#6D8EEC] text-[#6D8EEC] py-3 rounded-full font-semibold hover:bg-[#E2E8FB] transition-colors duration-200"
                      >
                        Infos erhalten
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <button className="w-full border-2 border-[#6D8EEC] text-[#6D8EEC] py-4 rounded-full font-semibold hover:bg-[#E2E8FB] transition-colors duration-200">
                  Plan auswählen
                </button>
              )}
            </div>

            {/* Pro */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border-2 border-gray-100 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#E2E8FB] text-[#292B27] px-4 py-2 rounded-full text-sm font-semibold border border-gray-200">
                  Geplant
                </span>
              </div>
              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-bold text-[#292B27] mb-4 tracking-tight">
                  Pro
                </h3>
                {renderPriceDisplay(pricingConfig.pro)}
                <p className="text-sm text-[#292B27] opacity-75">
                  ab Launch
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-[#6D8EEC] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Unlimitierte Buchungen</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#6D8EEC] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Markt-Insights & Analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#6D8EEC] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Hilfreiche Business-Tipps</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-[#6D8EEC] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-[#292B27]">Priority Support</span>
                </li>
              </ul>
              {!pricingConfig.pro.price && !pricingConfig.pro.range ? (
                <div className="space-y-4">
                  {proEmailSubmitted ? (
                    <div className="text-center p-3 bg-[#BADE4F] bg-opacity-20 rounded-xl" role="status" aria-live="polite">
                      <p className="text-sm text-[#292B27] font-semibold">Danke! Wir benachrichtigen dich.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleProEmailSubmit} className="space-y-3">
                      <input
                        type="email"
                        value={proEmail}
                        onChange={(e) => setProEmail(e.target.value)}
                        placeholder="deine@email.de"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-[#6D8EEC] focus:outline-none transition-colors duration-200"
                        aria-label="E-Mail für Pro Plan Benachrichtigung"
                      />
                      <button
                        type="submit"
                        className="w-full border-2 border-[#6D8EEC] text-[#6D8EEC] py-3 rounded-full font-semibold hover:bg-[#E2E8FB] transition-colors duration-200"
                      >
                        Infos erhalten
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <button className="w-full border-2 border-[#6D8EEC] text-[#6D8EEC] py-4 rounded-full font-semibold hover:bg-[#E2E8FB] transition-colors duration-200">
                  Plan auswählen
                </button>
              )}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-[#292B27] opacity-60">
              Wir informieren dich, sobald die Preise feststehen. Keine Verpflichtung.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#292B27] text-center mb-16 tracking-tight">
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

      {/* Finaler CTA */}
      <section id="bereit-loszulegen" className="bg-[#E2E8FB] py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#292B27] mb-6 md:mb-8 tracking-tight">
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
                    Wähle dein Fachgebiet (Mehrfachauswahl möglich)
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-full focus:border-[#6D8EEC] focus:outline-none transition-colors duration-200 text-[#292B27] min-h-[56px] flex items-center justify-center bg-white"
                    >
                      <span className="text-left">
                        {expertise.length === 0 
                          ? 'Fachgebiet auswählen...' 
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
    </div>
  );
};

export default ExpertPage;

