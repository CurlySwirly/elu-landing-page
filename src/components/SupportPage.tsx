import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Mail, Linkedin, Instagram, ArrowRight, HelpCircle, MessageCircle, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { formServices } from '../lib/formServices';
import { GENERIC_FORM_ERROR } from '../lib/formErrors';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';

interface SupportPageProps {
  onNavigate?: (page: string) => void;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BADE4F]';

const fieldClass =
  'w-full px-5 py-3.5 bg-light border border-[#E2E8FB] text-[#292B27] focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300';

const SupportPage: React.FC<SupportPageProps> = () => {
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
          <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">
            info@elevateyou.app
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
          <a href="mailto:info@elevateyou.app" className="text-[#6D8EEC] hover:underline">
            info@elevateyou.app
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
        toast.error(GENERIC_FORM_ERROR);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting contact form:', error);
      }
      toast.error(GENERIC_FORM_ERROR);
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

  return (
    <div className="min-h-screen bg-light text-[#292B27]">
      <SiteHeader />

      <main className="pt-28 lg:pt-36 pb-20">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol
              className="flex items-center gap-2 text-sm text-[#292B27]/80"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <li>
                <a href="/" className={`${focusRing} rounded-sm hover:underline`}>
                  Home
                </a>
              </li>
              <li aria-hidden="true">›</li>
              <li className="font-semibold">Kontakt &amp; Support</li>
            </ol>
          </nav>

          <section className="mb-16">
            <div className="rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8 md:p-12 lg:p-16">
              <p
                className="inline-flex items-center gap-2 rounded-full bg-light px-4 py-1.5 mb-6 text-sm font-medium text-[#292B27]"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                <HelpCircle className="w-4 h-4 text-[#6D8EEC]" />
                Wir helfen dir gerne weiter
              </p>
              <h1
                className="text-[36px] md:text-[48px] lg:text-[54px] font-bold text-[#292B27] leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                Kontakt &amp; Support
              </h1>
              <p
                className="text-lg text-[#292B27]/80 max-w-2xl leading-relaxed"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Deine zentrale Anlaufstelle: Finde Antworten, kontaktiere uns direkt und bleib mit elu in Verbindung.
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6 mb-16">
            <button
              type="button"
              onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-left rounded-3xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(109,142,236,0.12)] transition-shadow duration-300 ${focusRing}`}
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-light mb-5">
                <HelpCircle className="w-6 h-6 text-[#6D8EEC]" />
              </span>
              <h2 className="text-xl font-bold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                FAQ
              </h2>
              <p className="text-[#292B27]/70 mb-5" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Schnelle Antworten auf häufige Fragen
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#6D8EEC]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Zur FAQ <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-left rounded-3xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(109,142,236,0.12)] transition-shadow duration-300 ${focusRing}`}
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-light mb-5">
                <MessageCircle className="w-6 h-6 text-[#6D8EEC]" />
              </span>
              <h2 className="text-xl font-bold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Kontakt aufnehmen
              </h2>
              <p className="text-[#292B27]/70 mb-5" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Direkter Draht zu unserem Team – wir antworten persönlich.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#6D8EEC]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Nachricht schreiben <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </section>

          <section id="contact-section" className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#292B27] mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Nachricht senden
              </h2>
              <p className="text-lg text-[#292B27]/70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Unser Team ist für dich da – schreib uns einfach
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-3xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <h3 className="text-2xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Unternehmen
                </h3>
                <p className="text-lg font-semibold text-[#292B27] mb-1" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Elevate You GmbH
                </p>
                <p className="text-[#292B27]/70 mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Petrusgasse 16/1<br />
                  1030 Wien
                </p>
                <a
                  href="mailto:info@elevateyou.app"
                  className={`inline-flex items-center gap-3 text-[#6D8EEC] font-medium hover:text-[#5a7ae8] ${focusRing} rounded-full`}
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-light">
                    <Mail className="w-5 h-5" />
                  </span>
                  info@elevateyou.app
                </a>
                <p className="text-sm text-[#292B27]/60 mt-3 mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Antwortzeit: 1–2 Werktage
                </p>

                <h4 className="text-lg font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Folge uns
                </h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/108662379/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className={`flex items-center justify-center w-12 h-12 rounded-full bg-light text-[#6D8EEC] hover:bg-[#E2E8FB] ${focusRing}`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/elevateyou.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className={`flex items-center justify-center w-12 h-12 rounded-full bg-light text-[#6D8EEC] hover:bg-[#E2E8FB] ${focusRing}`}
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="support-name" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      id="support-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`${fieldClass} rounded-full`}
                      placeholder="Dein vollständiger Name"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="support-email" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="support-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`${fieldClass} rounded-full`}
                      placeholder="deine@email.de"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="support-message" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      Nachricht *
                    </label>
                    <textarea
                      id="support-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`${fieldClass} rounded-2xl resize-none`}
                      placeholder="Teile deine Fragen, Anregungen oder dein Feedback mit uns."
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 gap-2 ${
                      isSubmitting
                        ? 'inline-flex items-center justify-center rounded-full bg-gray-400 text-white font-semibold cursor-not-allowed'
                        : 'btn-primary'
                    }`}
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Nachricht senden
                      </>
                    )}
                  </button>
                  <p className="text-sm text-[#292B27]/60 text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    * Pflichtfelder – wir antworten in der Regel innerhalb von 24 Stunden
                  </p>
                </form>
              </div>
            </div>
          </section>

          <section id="faq-section">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#292B27] mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Häufig gestellte Fragen
              </h2>
              <p className="text-lg text-[#292B27]/70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Die Antworten auf die wichtigsten Fragen rund um elu
              </p>
            </div>
            <div className="space-y-3 max-w-4xl mx-auto">
              {faqItems.map((item, index) => (
                <div
                  key={item.question}
                  className="rounded-3xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  <button
                    className={`w-full px-6 py-5 text-left bg-white hover:bg-light focus:bg-light transition-colors duration-200 ${focusRing}`}
                    onClick={() => toggleAccordion(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-expanded={openAccordionIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-[#292B27] text-lg" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#6D8EEC] shrink-0 transition-transform duration-300 ${
                          openAccordionIndex === index ? 'rotate-180' : ''
                        }`}
                      />
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
                    <div className="px-6 pb-6">
                      <div className="border-t border-[#E2E8FB] pt-4 text-[#292B27]/80 leading-relaxed space-y-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
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

      <SiteFooter />
    </div>
  );
};

export default SupportPage;

