import { useState } from 'react';
import { Mail } from 'lucide-react';
import { formServices } from '../../lib/formServices';
import { useLocale } from '../../i18n';

export default function Newsletter() {
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError(t('forms.invalidEmail'));
        setLoading(false);
        return;
      }

      if (import.meta.env.DEV) {
        console.log('Newsletter form submitting:', { email: email.trim().toLowerCase(), source: 'blog_page' });
      }

      // Check if formServices is available
      if (!formServices || !formServices.submitNewsletterSubscription) {
        setError(t('forms.genericError'));
        setLoading(false);
        return;
      }

      const result = await formServices.submitNewsletterSubscription({
        email: email.trim().toLowerCase(),
        source: 'blog_page'
      });

      if (result.success) {
        setSubmitted(true);
        setEmail('');
        setError(null);
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        const errorMsg = typeof result.error === 'string'
          ? result.error
          : t('forms.genericError');
        setError(errorMsg);
      }
    } catch (err: unknown) {
      if (import.meta.env.DEV) {
        console.error('Newsletter subscription error:', err);
      }
      setError(t('forms.genericError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#6D8EEC] to-[#BADE4F] py-14 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-8">
          <Mail className="w-8 h-8 text-white" />
        </div>

        <h2 className="font-['League_Spartan'] font-bold text-white text-[28px] md:text-[38px] mb-4 tracking-tight">
          {t('blog.newsletterTitle')}
        </h2>

        <p className="font-['Open_Sans'] text-white/90 text-base md:text-lg mb-10 leading-[1.7] max-w-2xl mx-auto">
          {t('blog.newsletterSub')}
        </p>

        {submitted ? (
          <div className="bg-white text-[#6D8EEC] font-['Open_Sans'] font-semibold px-8 py-5 rounded-2xl inline-flex items-center gap-3 shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t('blog.newsletterThanks')}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="flex-1">
              <input
                type="email"
                placeholder="deine@email.de"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                required
                disabled={loading}
                className="w-full px-5 py-3.5 sm:px-6 sm:py-5 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 font-['Open_Sans'] focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {error && (
                <p className="mt-2 text-white/90 text-sm font-['Open_Sans']">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="bg-white text-[#6D8EEC] font-['Open_Sans'] font-bold px-6 py-3.5 sm:px-8 sm:py-5 rounded-2xl hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:scale-[1.02] transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? t('blog.newsletterSending') : t('blog.newsletterCta')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
