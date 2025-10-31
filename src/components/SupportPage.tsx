import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Mail, Linkedin, Instagram, ArrowRight, ArrowLeft, HelpCircle, MessageCircle, Shield, CheckCircle } from 'lucide-react';

interface SupportPageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onBack, onNavigate }) => {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[#6D8EEC] hover:text-[#5a7ae8] transition-colors duration-200 font-medium"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </button>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#E2E8FB] text-[#292B27] rounded-full text-sm font-medium">
            <HelpCircle className="w-4 h-4 text-[#6D8EEC]" />
            Wir helfen dir gerne weiter
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#292B27] mb-8 tracking-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            <span className="text-[#6D8EEC]">Support</span> & Hilfe
          </h1>
          <p className="text-lg md:text-xl text-[#292B27] opacity-80 max-w-3xl mx-auto leading-relaxed mb-12" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Hier findest du schnelle Antworten auf häufige Fragen oder kannst direkt mit unserem Team Kontakt aufnehmen.
          </p>
        </div>

        {/* Quick Actions */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#6D8EEC] to-[#5A7BE8] rounded-2xl p-6 text-white hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-8 h-8" />
                <h3 className="text-xl font-bold" style={{ fontFamily: 'League Spartan, sans-serif' }}>FAQ</h3>
              </div>
              <p className="text-blue-100 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Schnelle Antworten auf häufige Fragen
              </p>
              <button 
                onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-white font-medium hover:text-blue-100 transition-colors duration-200"
              >
                Zur FAQ <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#BADE4F] to-[#A8D13F] rounded-2xl p-6 text-white hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-8 h-8" />
                <h3 className="text-xl font-bold" style={{ fontFamily: 'League Spartan, sans-serif' }}>Kontakt</h3>
              </div>
              <p className="text-green-100 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Direkter Kontakt zu unserem Team
              </p>
              <button 
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('contact');
                  } else {
                    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 text-white font-medium hover:text-green-100 transition-colors duration-200"
              >
                Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#292B27] to-[#1a1c19] rounded-2xl p-6 text-white hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8" />
                <h3 className="text-xl font-bold" style={{ fontFamily: 'League Spartan, sans-serif' }}>Status</h3>
              </div>
              <p className="text-gray-300 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Aktueller Systemstatus
              </p>
              <button 
                onClick={() => document.getElementById('status-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors duration-200"
              >
                Status prüfen <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section id="faq-section" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-[#292B27] opacity-70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Die Antworten auf die wichtigsten Fragen rund um elu
            </p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
                <button
                  className="w-full px-6 py-6 text-left bg-white hover:bg-[#F8F9FA] focus:bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2 transition-all duration-300"
                  onClick={() => toggleAccordion(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={openAccordionIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#292B27] text-lg pr-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      {item.question}
                    </span>
                    <div className="flex-shrink-0">
                      <ChevronDown 
                        className={`w-6 h-6 text-[#6D8EEC] transition-all duration-300 ${
                          openAccordionIndex === index ? 'rotate-180 text-[#BADE4F]' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  ref={(el) => (accordionRefs.current[index] = el)}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openAccordionIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={openAccordionIndex !== index}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="border-t border-[#E2E8FB] pt-4">
                      <p className="text-[#292B27] opacity-80 leading-relaxed text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-section" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Direkter Kontakt
            </h2>
            <p className="text-lg text-[#292B27] opacity-70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Unser Team ist für dich da
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Company Info */}
            <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E2E8FB] rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-8 bg-gradient-to-b from-[#6D8EEC] to-[#BADE4F] rounded-full"></div>
                <h3 className="text-2xl font-bold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Unternehmen
                </h3>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-bold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Elevate You FlexKapG (in Gründung)
                </h4>
                <p className="text-[#292B27] opacity-70 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Wien, Österreich
                </p>
                <div className="w-full h-px bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] mb-4"></div>
                <a
                  href="mailto:info@elevateyou.app"
                  className="inline-flex items-center gap-3 text-[#6D8EEC] hover:text-[#5a7ae8] transition-all duration-200 font-medium hover:scale-105 transform"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <div className="bg-[#E2E8FB] p-2 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  info@elevateyou.app
                </a>
                <p className="text-sm text-[#292B27] opacity-60 mt-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Antwortzeit: 1-2 Werktage
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-gradient-to-b from-[#BADE4F] to-[#6D8EEC] rounded-full"></div>
                  <h3 className="text-2xl font-bold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Schnellkontakt
                  </h3>
                </div>
                
                <button
                  type="button"
                  className="w-full mb-4 inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#6D8EEC] to-[#5A7BE8] text-white rounded-xl hover:from-[#5A7BE8] hover:to-[#4A6DE8] focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2 transition-all duration-300 font-bold transform hover:scale-105 shadow-lg"
                  style={{ fontFamily: 'League Spartan, sans-serif' }}
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('contact');
                    }
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Zur Kontaktseite
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/108662379/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-[#6D8EEC] to-[#5A7BE8] text-white rounded-xl hover:from-[#5A7BE8] hover:to-[#4A6DE8] focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2 transition-all duration-300 transform hover:scale-110 shadow-lg"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/elevateyou.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-[#BADE4F] to-[#A8D13F] text-white rounded-xl hover:from-[#A8D13F] hover:to-[#98C12F] focus:outline-none focus:ring-2 focus:ring-[#BADE4F] focus:ring-offset-2 transition-all duration-300 transform hover:scale-110 shadow-lg"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section id="status-section" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Systemstatus
            </h2>
            <p className="text-lg text-[#292B27] opacity-70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Aktuelle Verfügbarkeit unserer Dienste
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-500 rounded-full p-3">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Alle Systeme funktionsfähig
                  </h3>
                  <p className="text-green-700 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Status: Operativ
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h4 className="font-bold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      Website
                    </h4>
                  </div>
                  <p className="text-sm text-[#292B27] opacity-70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Verfügbar und funktionsfähig
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h4 className="font-bold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      E-Mail Support
                    </h4>
                  </div>
                  <p className="text-sm text-[#292B27] opacity-70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Verfügbar und funktionsfähig
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-100 rounded-xl">
                <p className="text-sm text-green-800 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  <strong>Hinweis:</strong> Geplante Wartungen und Updates werden rechtzeitig auf der Startseite und in unserem Newsletter angekündigt.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportPage;
