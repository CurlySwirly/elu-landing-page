import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Mail, Linkedin, Instagram, Home, ArrowRight } from 'lucide-react';

interface SupportPageProps {
  onBack?: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onBack }) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqItems = [
    {
      question: "Wie kann ich mich für den Beta-Start anmelden?",
      answer: "Trage dich auf der Landingpage in die Warteliste ein. Du bekommst eine Bestätigung per Mail."
    },
    {
      question: "Wie erreiche ich den Support?",
      answer: "Schreibe an info@elevateyou.app. Wir melden uns so rasch wie möglich."
    },
    {
      question: "Wie lösche ich meine Daten?",
      answer: "Sende eine kurze Mail mit dem Betreff 'Datenauskunft' oder 'Datenlöschung' an info@elevateyou.app."
    },
    {
      question: "Wie kann ich kooperieren oder testen?",
      answer: "Sende uns deine Idee samt kurzer Beschreibung an info@elevateyou.app."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAccordion(index);
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenAccordionIndex(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Title - would be set via React Helmet in production */}
      {/* <title>Support | Elevate You</title> */}
      
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
          <ArrowRight className="w-4 h-4 rotate-180" />
          Zurück
        </button>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-[#6D8EEC] transition-colors duration-200 inline-flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </a>
            </li>
            <li className="flex items-center">
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              <span className="ml-2 text-[#292B27] font-medium">Support</span>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#292B27] mb-6 tracking-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Support
          </h1>
          <p className="text-lg md:text-xl text-[#292B27] opacity-80 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Wir helfen schnell und unkompliziert. Hier findest du Antworten und Kontaktmöglichkeiten.
          </p>
        </div>

        {/* FAQ Accordion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Schnellhilfe (FAQ)
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2 transition-all duration-200"
                  onClick={() => toggleAccordion(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={openAccordionIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#292B27] text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {item.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-[#6D8EEC] transition-transform duration-200 ${
                        openAccordionIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  ref={(el) => (accordionRefs.current[index] = el)}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordionIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={openAccordionIndex !== index}
                >
                  <div className="px-6 pb-4">
                    <p className="text-[#292B27] opacity-80 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Card */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm bg-white">
            <h2 className="text-2xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Kontakt
            </h2>
            
            {/* Company Info */}
            <div className="mb-6">
              <div className="bg-[#F8F9FA] rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Elevate You FlexKapG (in Gründung)
                </h3>
                <p className="text-[#292B27] opacity-80 mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Wien, Österreich
                </p>
                <a
                  href="mailto:info@elevateyou.app"
                  className="inline-flex items-center gap-2 text-[#6D8EEC] hover:text-[#5a7ae8] transition-colors duration-200 font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <Mail className="w-4 h-4" />
                  info@elevateyou.app
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#6D8EEC] text-white rounded-lg hover:bg-[#5a7ae8] focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2 transition-colors duration-200 font-medium"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Zur Kontaktseite
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#BADE4F] text-white rounded-lg hover:bg-[#A8D13F] focus:outline-none focus:ring-2 focus:ring-[#BADE4F] focus:ring-offset-2 transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#BADE4F] text-white rounded-lg hover:bg-[#A8D13F] focus:outline-none focus:ring-2 focus:ring-[#BADE4F] focus:ring-offset-2 transition-colors duration-200"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <p className="text-sm text-[#292B27] opacity-70 text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Wir antworten in der Regel innerhalb von 1–2 Werktagen.
            </p>
          </div>
        </section>

        {/* Status Callout */}
        <section className="mb-12">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Status
            </h2>
            <p className="text-[#292B27] leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Aktueller Systemstatus: <span className="font-semibold text-green-600">Online</span>. Geplante Wartungen werden auf der Startseite angekündigt.
            </p>
          </div>
        </section>

        {/* Footer Links */}
        <section className="text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="#"
              className="text-[#6D8EEC] hover:text-[#5a7ae8] hover:underline transition-colors duration-200"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Impressum
            </a>
            <a
              href="#"
              className="text-[#6D8EEC] hover:text-[#5a7ae8] hover:underline transition-colors duration-200"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Datenschutzerklärung
            </a>
            <a
              href="#"
              className="text-[#6D8EEC] hover:text-[#5a7ae8] hover:underline transition-colors duration-200"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              AGB
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportPage;
