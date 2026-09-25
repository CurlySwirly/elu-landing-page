import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Mail, Linkedin, Instagram, ArrowRight, HelpCircle, MessageCircle, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { formServices } from '../lib/formServices';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';
import { useLocale } from '../i18n';

interface SupportPageProps {
  onNavigate?: (page: string) => void;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BADE4F]';

const fieldClass =
  'w-full px-5 py-3.5 bg-light border border-[#E2E8FB] text-[#292B27] focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300';

const SupportPage: React.FC<SupportPageProps> = () => {
  const { t, messages } = useLocale();
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqItems = messages.support.items.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

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
      toast.error(t('forms.fillRequired'));
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await formServices.submitContactMessage(formData);

      if (result.success) {
        toast.success(t('forms.contactThanks'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(t('forms.genericError'));
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting contact form:', error);
      }
      toast.error(t('forms.genericError'));
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

      <main className="pt-24 lg:pt-32 pb-12 md:pb-16">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 md:mb-8">
            <ol
              className="flex items-center gap-2 text-sm text-[#292B27]/80"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <li>
                <a href="/" className={`${focusRing} rounded-sm hover:underline`}>
                  {t('common.home')}
                </a>
              </li>
              <li aria-hidden="true">›</li>
              <li className="font-semibold">{t('support.crumb')}</li>
            </ol>
          </nav>

          <section className="mb-10 md:mb-16">
            <div className="rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5 sm:p-8 md:p-12 lg:p-16">
              <p
                className="inline-flex items-center gap-2 rounded-full bg-light px-4 py-1.5 mb-6 text-sm font-medium text-[#292B27]"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                <HelpCircle className="w-4 h-4 text-[#6D8EEC]" />
                {t('support.badge')}
              </p>
              <h1
                className="text-[26px] sm:text-[36px] md:text-[48px] lg:text-[54px] font-bold text-[#292B27] leading-[1.2] tracking-tight mb-4 md:mb-6"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              >
                {t('support.title')}
              </h1>
              <p
                className="text-sm sm:text-base md:text-lg text-[#292B27]/80 max-w-2xl leading-relaxed"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {t('support.sub')}
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
            <button
              type="button"
              onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-left rounded-3xl bg-white p-5 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(109,142,236,0.12)] transition-shadow duration-300 ${focusRing}`}
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-light mb-5">
                <HelpCircle className="w-6 h-6 text-[#6D8EEC]" />
              </span>
              <h2 className="text-xl font-bold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('support.faqCardTitle')}
              </h2>
              <p className="text-[#292B27]/70 mb-5" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('support.faqCardBody')}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#6D8EEC]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('support.faqCardCta')} <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-left rounded-3xl bg-white p-5 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(109,142,236,0.12)] transition-shadow duration-300 ${focusRing}`}
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-light mb-5">
                <MessageCircle className="w-6 h-6 text-[#6D8EEC]" />
              </span>
              <h2 className="text-xl font-bold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('support.contactCardTitle')}
              </h2>
              <p className="text-[#292B27]/70 mb-5" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('support.contactCardBody')}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#6D8EEC]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('support.contactCardCta')} <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </section>

          <section id="contact-section" className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292B27] mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('support.formTitle')}
              </h2>
              <p className="text-lg text-[#292B27]/70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('support.formSub')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {t('support.company')}
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
                  {t('support.replyTime')}
                </p>

                <h4 className="text-lg font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {t('support.follow')}
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

              <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="support-name" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {t('support.name')}
                    </label>
                    <input
                      type="text"
                      id="support-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`${fieldClass} rounded-full`}
                      placeholder={t('support.namePh')}
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="support-email" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {t('support.email')}
                    </label>
                    <input
                      type="email"
                      id="support-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`${fieldClass} rounded-full`}
                      placeholder={t('support.emailPh')}
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="support-message" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {t('support.message')}
                    </label>
                    <textarea
                      id="support-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`${fieldClass} rounded-2xl resize-none`}
                      placeholder={t('support.messagePh')}
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
                        {t('support.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t('support.send')}
                      </>
                    )}
                  </button>
                  <p className="text-sm text-[#292B27]/60 text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {t('support.formNote')}
                  </p>
                </form>
              </div>
            </div>
          </section>

          <section id="faq-section">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292B27] mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('support.faqTitle')}
              </h2>
              <p className="text-lg text-[#292B27]/70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('support.faqSub')}
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
                      <div className="border-t border-[#E2E8FB] pt-4 text-[#292B27]/80 leading-relaxed whitespace-pre-line" style={{ fontFamily: 'Open Sans, sans-serif' }}>
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

