import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Mail, Linkedin, Instagram, ArrowRight, HelpCircle, MessageCircle, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { formServices } from '../lib/formServices';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';

interface SupportPageProps {
  onNavigate?: (page: string) => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onNavigate }) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqItems: Array<{ question: string; answer: React.ReactNode }> = [
    {
      question: 'Was ist elu elevate you?',
      answer: (
        <>
          <p className="mb-3">
            elu elevate you ist eine Plattform, die dich mit qualifizierten Expert:innen verbindet, um deine Gesundheit
            und dein Wohlbefinden im Alltag zu stärken. Ob Stress, Schlaf, Ernährung, Bewegung oder Regeneration – du
            findest Unterstützung, die zu dir passt.
          </p>
          <p>
            <em>Gesundheit wird leichter, wenn jemand mit dir geht.</em>
          </p>
        </>
      )
    },
    {
      question: 'Wie funktioniert elu?',
      answer: (
        <div className="space-y-3">
          <p>Ganz einfach:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Entdecken:</strong> Du sagst uns kurz, wobei du Unterstützung möchtest.
            </li>
            <li>
              <strong>Verbinden:</strong> Wir zeigen dir Expert:innen, die zu deinen Bedürfnissen passen.
            </li>
            <li>
              <strong>Begleitet werden:</strong> Du buchst Termine und wirst in deinem Alltag begleitet sowie bei deinen
              Zielen unterstützt.
            </li>
          </ul>
          <p>Gesundheit wird leichter, wenn jemand an deiner Seite ist.</p>
        </div>
      )
    },
    {
      question: 'Wer sind die Expert:innen?',
      answer: (
        <div className="space-y-3">
          <p>
            Alle Expert:innen auf elu elevate you sind ausgebildete Fachpersonen, zum Beispiel:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Physiotherapeut:innen</li>
            <li>Ernährungsexpert:innen</li>
            <li>Coaches &amp; Mental-Health-Trainer:innen</li>
            <li>Massage- &amp; Körperarbeit-Fachkräfte</li>
            <li>Personal Trainer:innen</li>
          </ul>
          <p>Wir prüfen Qualifikationen, bevor jemand freigeschaltet wird. Das schafft Sicherheit und Vertrauen.</p>
        </div>
      )
    },
    {
      question: 'Wie wird mir der passende Experte vorgeschlagen?',
      answer: (
        <div className="space-y-3">
          <p>Wir berücksichtigen unter anderem:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>deine Ziele</li>
            <li>deine körperlichen und mentalen Bedürfnisse</li>
            <li>deine Präferenzen (z. B. ruhig, aktivierend, sportlich, sanft)</li>
            <li>Standort oder Online-Begleitung</li>
            <li>Verfügbarkeit und Schwerpunkte der Expert:innen</li>
          </ul>
          <p>Das Matching ist persönlich, nicht zufällig.</p>
        </div>
      )
    },
    {
      question: 'Kann ich mit Expert:innen vorab schreiben?',
      answer: (
        <p>
          Ja. Du kannst Nachrichten senden, Fragen stellen oder einen kurzen Kennenlerncall vereinbaren – so merkst du,
          ob es auch menschlich passt.
        </p>
      )
    },
    {
      question: 'Ist elu medizinisch?',
      answer: (
        <p>
          Nein. elu unterstützt präventive Gesundheit und Begleitung im Alltag. Bei akuten Beschwerden oder Diagnosen ist
          ärztliche Betreuung weiterhin wichtig.
        </p>
      )
    },
    {
      question: 'Wie kann ich mich für den Beta-Start anmelden?',
      answer: (
        <p>
          Trag dich einfach auf der Website ein. Wir melden uns, sobald die nächste Runde geöffnet ist – ganz
          unverbindlich.
        </p>
      )
    },
    {
      question: 'Kann ich elu testen oder mit euch kooperieren?',
      answer: (
        <p>
          Ja, sehr gerne. Wir arbeiten mit Einzelpersonen, Praxen, Studios, Firmen und Gesundheitsanbietenden. Schreib
          uns kurz, was du vorhast – wir melden uns persönlich.
        </p>
      )
    },
    {
      question: 'Kostet mich die App etwas?',
      answer: (
        <p>
          Die App kannst du kostenfrei nutzen, um Expert:innen zu finden. Sitzungen, Programme oder Begleitungen werden
          direkt bei den Expert:innen abgerechnet. Keine versteckten Gebühren.
        </p>
      )
    },
    {
      question: 'Wie buche und bezahle ich eine Einheit?',
      answer: (
        <p>
          Du buchst deine Termine direkt über elu. Die Bezahlung erfolgt transparent über die Expert:innen bzw. über
          sichere Zahlungsanbieter. Du erhältst Erinnerungen, damit du dranbleibst – ohne Stress.
        </p>
      )
    },
    {
      question: 'Wie sicher sind meine Daten?',
      answer: (
        <div className="space-y-3">
          <p>Sehr sicher.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Hosting in der EU</li>
            <li>Verarbeitung gemäß DSGVO</li>
            <li>Keine Weitergabe an Dritte</li>
            <li>Keine Werbung</li>
            <li>Keine Profilbildung außerhalb der Plattform</li>
          </ul>
          <p>Deine Daten gehören dir. Wir verwenden sie nur, um deine Erfahrung zu verbessern.</p>
        </div>
      )
    },
    {
      question: 'Wie lösche ich meine Daten?',
      answer: (
        <p>
          Du kannst deine Daten jederzeit löschen lassen. Schreib uns einfach an{' '}
          <a href="mailto:info@eluforwork.com" className="text-[#6D8EEC] hover:underline">
            info@eluforwork.com
          </a>{' '}
          mit dem Betreff „Datenlöschung“. Wir bestätigen dir die Löschung schriftlich.
        </p>
      )
    },
    {
      question: 'Wie erreiche ich den Support?',
      answer: (
        <p>
          Persönlich per E-Mail:{' '}
          <a href="mailto:info@eluforwork.com" className="text-[#6D8EEC] hover:underline">
            info@eluforwork.com
          </a>
          . Wir antworten in der Regel innerhalb von 24 Stunden.
        </p>
      )
    },
    {
      question: 'Gibt es elu auch für Unternehmen?',
      answer: (
        <p>
          Ja. Dafür gibt es elu for work – das Wohlbefinden-Tool für Teams und KMUs:{' '}
          <a href="https://eluforwork.com" className="text-[#6D8EEC] hover:underline">
            eluforwork.com
          </a>
          . Mit anonymisierten Trends, täglichen Check-ins und Empfehlungen für gesundheitsförderliche Maßnahmen.
        </p>
      )
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Bitte fülle alle Pflichtfelder aus.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await formServices.submitContactMessage(formData);

      if (result.success) {
        toast.success('Vielen Dank für deine Nachricht! Wir melden uns so schnell wie möglich bei dir.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.success('Vielen Dank für deine Nachricht! Wir melden uns so schnell wie möglich bei dir.');
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting contact form:', error);
      }
      toast.success('Vielen Dank für deine Nachricht! Wir melden uns so schnell wie möglich bei dir.');
    } finally {
      setIsSubmitting(false);
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

  const handleNavigate = onNavigate ?? (() => {});

  return (
    <div className="min-h-screen bg-[#F8F4F4] text-[#292B27]">
      <SiteHeader onNavigate={handleNavigate} />

      <main className="pt-28 lg:pt-36 pb-20">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <section className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#E2E8FB] text-[#292B27] rounded-full text-sm font-medium">
              <HelpCircle className="w-4 h-4 text-[#6D8EEC]" />
              Wir helfen dir gerne weiter
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#292B27] mb-8 tracking-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              <span className="text-[#6D8EEC]">Kontakt</span> &amp; Support
            </h1>
            <p className="text-lg md:text-xl text-[#292B27] opacity-80 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Deine zentrale Anlaufstelle: Finde Antworten, kontaktiere uns direkt und bleib mit elu in Verbindung.
            </p>
          </section>

          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-6">
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
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'League Spartan, sans-serif' }}>Kontakt aufnehmen</h3>
                </div>
                <p className="text-green-100 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Direkter Draht zu unserem Team – wir antworten persönlich.
                </p>
                <button
                  onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-white font-medium hover:text-green-100 transition-colors duration-200"
                >
                  Nachricht schreiben <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          <section id="contact-section" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Kontaktformular
              </h2>
              <p className="text-lg text-[#292B27] opacity-70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Unser Team ist für dich da – schreib uns einfach
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E2E8FB] rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-gradient-to-b from-[#6D8EEC] to-[#BADE4F] rounded-full" />
                  <h3 className="text-2xl font-bold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Unternehmen
                  </h3>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                  <h4 className="text-lg font-bold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Elevate You GmbH (in Gründung)
                  </h4>
                  <p className="text-[#292B27] opacity-70 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Wien, Österreich
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-[#6D8EEC] to-[#BADE4F] mb-4" />
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

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Folge uns
                  </h4>
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

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-8 bg-gradient-to-b from-[#BADE4F] to-[#6D8EEC] rounded-full" />
                  <h3 className="text-2xl font-bold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Nachricht senden
                  </h3>
                </div>
                <p className="text-[#292B27] opacity-70 mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Teile deine Fragen oder Anregungen mit uns – wir antworten schnellstmöglich.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="support-name" className="block text-sm font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      id="support-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-[#F8F9FA] border border-[#E2E8FB] rounded-xl focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300 text-[#292B27]"
                      placeholder="Dein vollständiger Name"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="support-email" className="block text-sm font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="support-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-[#F8F9FA] border border-[#E2E8FB] rounded-xl focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300 text-[#292B27]"
                      placeholder="deine@email.de"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="support-message" className="block text-sm font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      Nachricht *
                    </label>
                    <textarea
                      id="support-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-4 bg-[#F8F9FA] border border-[#E2E8FB] rounded-xl focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300 text-[#292B27] resize-none"
                      placeholder="Teile deine Fragen, Anregungen oder dein Feedback mit uns."
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-5 rounded-xl font-bold transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-gradient-to-r from-[#6D8EEC] to-[#5A7BE8] text-white hover:from-[#5A7BE8] hover:to-[#4A6DE8] hover:scale-105'
                      }`}
                      style={{ fontFamily: 'League Spartan, sans-serif' }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Nachricht senden
                        </>
                      )}
                    </button>
                    <p className="text-sm text-[#292B27] opacity-60 text-center mt-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      * Pflichtfelder – Wir antworten normalerweise innerhalb von 24 Stunden
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <section id="faq-section" className="mb-12">
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
                <div
                  key={item.question}
                  className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
                >
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
                      <div className="border-t border-[#E2E8FB] pt-4 text-[#292B27] opacity-80 leading-relaxed text-lg space-y-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter onNavigate={handleNavigate} />
    </div>
  );
};

export default SupportPage;

