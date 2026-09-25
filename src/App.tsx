import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Shield, 
  Users, 
  Target,
  User,
  Search,
  Calendar,
  Award,
  MapPin,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Dumbbell,
  Apple
} from 'lucide-react';
import { toast } from 'react-toastify';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import Reveal from './components/Reveal';
import Impressum from './components/Impressum';
import FAQ from './components/FAQ';
import Datenschutz from './components/Datenschutz';
import Nutzungsbedingungen from './components/Nutzungsbedingungen';
import ExpertPage from './components/ExpertPage';
import SupportPage from './components/SupportPage';
// import PressPage from './components/PressPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import { formServices } from './lib/formServices';
import { getPageFromPath, pageToPath } from './lib/navigation';
import UeberUnsPage from './components/UeberUnsPage';
import SiteHeader from './components/layout/SiteHeader';
import SiteFooter from './components/layout/SiteFooter';
import { useLocale } from './i18n';

function App() {
  const { t, messages } = useLocale();
  const [currentPage, setCurrentPage] = useState<string>(() => getPageFromPath(window.location.pathname));
  const [currentExpert, setCurrentExpert] = useState(0);
  const [blogPostSlug, setBlogPostSlug] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    userType: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);

    if (window.location.pathname === '/agb') {
      window.history.replaceState({}, '', '/nutzungsbedingungen');
    }

    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (currentPage === 'home' && window.location.hash === '#signup') {
      requestAnimationFrame(() => {
        document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigate = (page: string) => {
    const path = pageToPath(page);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPage(page);
  };

  const experts = [
    {
      name: 'Dominik Weber',
      specialty: 'Physiotherapie',
      image: '/images/expert-dominik.jpg',
      rating: '4.9',
      specialtyInfo: 'Rückengesundheit & Haltung',
      focus: 'Knieverletzungen & Rehabilitation',
      experience: '8+ Jahre Praxis',
      availability: 'Praxis & Online',
      usp: 'Spezialist für Büroarbeiter',
      certificationLevel: 'Master',
      location: 'Wien-Innere Stadt',
      languages: 'Deutsch, Englisch',
      consultationType: 'Einzel- & Gruppentherapie',
      specializations: ['Bandscheibenvorfall', 'Skoliose', 'Büroergonomie']
    },
    {
      name: 'Anna Schmidt, MSc.',
      specialty: 'Ernährungsberatung',
      image: '/images/expert-anna.jpg',
      rating: '4.8',
      specialtyInfo: 'Diabetes & Gewichtsmanagement',
      focus: 'Adipositas & Diabetes',
      experience: '12+ Jahre Praxis',
      availability: 'Online & Praxis',
      usp: 'Zertifizierte Diabetesberaterin',
      certificationLevel: 'Master',
      location: 'Wien-Landstraße',
      languages: 'Deutsch, Englisch, Französisch',
      consultationType: 'Persönlich & Online',
      specializations: ['Typ 2 Diabetes', 'Gewichtsreduktion', 'Sportlerernährung']
    },
    {
      name: 'Julian Müller',
      specialty: 'Personal Training',
      image: '/images/expert-julian.jpg',
      rating: '5.0',
      specialtyInfo: 'Muskelaufbau & Fitness',
      focus: 'Krafttraining & Mobility',
      experience: '6+ Jahre Praxis',
      availability: 'Studio & Outdoor',
      usp: 'Zertifizierter Functional Trainer',
      certificationLevel: 'Diploma',
      location: 'Wien-Mariahilf',
      languages: 'Deutsch, Englisch',
      consultationType: 'Einzeltraining & Kleingruppen',
      specializations: ['Kraftaufbau', 'Mobility Training', 'Rehabilitation']
    },
    {
      name: 'Marie Chen',
      specialty: 'Yoga',
      image: '/images/expert-marie.jpg',
      rating: '4.9',
      specialtyInfo: 'Stressabbau & Entspannung',
      focus: 'Stressmanagement & Meditation',
      experience: '10+ Jahre Praxis',
      availability: 'Online & Studio',
      usp: 'Zertifiziert in Mindful Yoga',
      certificationLevel: 'Bachelor',
      location: 'Wien-Wieden',
      languages: 'Deutsch, Englisch, Mandarin',
      consultationType: 'Privat & Gruppenkurse',
      specializations: ['Stressmanagement', 'Rückengesundheit', 'Meditation']
    },
    {
      name: 'Robert Novak',
      specialty: 'Massage',
      image: '/images/expert-robert.jpg',
      rating: '4.8',
      specialtyInfo: 'Verspannungen & Schmerzen',
      focus: 'Triggerpunktmassage',
      experience: '15+ Jahre Praxis',
      availability: 'Praxis',
      usp: 'Spezialist für Tiefengewebsmassage',
      certificationLevel: 'Diploma',
      location: 'Wien-Josefstadt',
      languages: 'Deutsch, Englisch, Tschechisch',
      consultationType: 'Einzelbehandlung',
      specializations: ['Tiefengewebsmassage', 'Triggerpunkt-Therapie', 'Wellness']
    },
    {
      name: 'Sophie Bauer',
      specialty: 'Physiotherapie',
      image: '/images/expert-sophie.jpg',
      rating: '4.9',
      specialtyInfo: 'Knieschmerzen & Rehabilitation',
      focus: 'Sportverletzungen & Prävention',
      experience: '7+ Jahre Praxis',
      availability: 'Praxis & Online',
      usp: 'Sportphysiotherapie für Senior:innen',
      certificationLevel: 'Master',
      location: 'Wien-Rudolfsheim',
      languages: 'Deutsch, Englisch',
      consultationType: 'Einzel- & Gruppentherapie',
      specializations: ['Knieverletzungen', 'Sportrehabilitation', 'Prävention']
    },
    {
      name: 'David Wagner, MA',
      specialty: 'Leistungscoaching',
      image: '/images/expert-david.jpg',
      rating: '5.0',
      specialtyInfo: 'Burnout & Stressmanagement',
      focus: 'Burnout-Prävention & Resilienz',
      experience: '9+ Jahre Praxis',
      availability: 'Online & Praxis',
      usp: 'Spezialist für Work-Life-Balance',
      certificationLevel: 'Master',
      location: 'Wien-Neubau',
      languages: 'Deutsch, Englisch, Spanisch',
      consultationType: 'Einzelcoaching & Workshops',
      specializations: ['Burnout-Prävention', 'Stressbewältigung', 'Achtsamkeit']
    },
    {
      name: 'Tom Fischer',
      specialty: 'Personal Training',
      image: '/images/expert-tom.jpg',
      rating: '4.7',
      specialtyInfo: 'Beweglichkeit & Koordination',
      focus: 'Beweglichkeitstraining & Koordination',
      experience: '5+ Jahre Praxis',
      availability: 'Studio & Outdoor',
      usp: 'Spezialist für Einsteiger',
      certificationLevel: 'Diploma',
      location: 'Wien-Leopoldstadt',
      languages: 'Deutsch, Englisch',
      consultationType: 'Einzel- & Gruppentraining',
      specializations: ['Beweglichkeitstraining', 'Koordination', 'Kraftaufbau']
    },
    {
      name: 'Petra Hoffmann',
      specialty: 'Ernährungsberatung',
      image: '/images/expert-petra.jpg',
      rating: '4.8',
      specialtyInfo: 'Naturheilkunde & Prävention',
      focus: 'Phytotherapie & Prävention',
      experience: '20+ Jahre Praxis',
      availability: 'Praxis & Online',
      usp: 'Ganzheitliche Gesundheitsberatung',
      certificationLevel: 'Diploma',
      location: 'Wien-Hietzing',
      languages: 'Deutsch, Englisch',
      consultationType: 'Einzelberatung & Therapie',
      specializations: ['Phytotherapie', 'Ernährungsberatung', 'Prävention']
    },
    {
      name: 'Lisa Kim',
      specialty: 'Yoga',
      image: '/images/expert-lisa.jpg',
      rating: '4.9',
      specialtyInfo: 'Core-Training & Haltung',
      focus: 'Core-Stabilität & Haltungskorrektur',
      experience: '8+ Jahre Praxis',
      availability: 'Studio & Online',
      usp: 'Zertifizierte Pilates-Instructorin',
      certificationLevel: 'Bachelor',
      location: 'Wien-Margareten',
      languages: 'Deutsch, Englisch, Koreanisch',
      consultationType: 'Einzel- & Gruppenkurse',
      specializations: ['Core-Training', 'Haltungskorrektur', 'Rückengesundheit']
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExpert((prev) => (prev + 1) % experts.length);
    }, 5000); // Change every 5 seconds
    
    return () => clearInterval(interval);
  }, [experts.length]);

  const nextExpert = () => {
    setCurrentExpert((prev) => (prev + 1) % experts.length);
  };

  const prevExpert = () => {
    setCurrentExpert((prev) => (prev - 1 + experts.length) % experts.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.userType || !formData.privacy) {
      toast.error(t('forms.fillAll'));
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate loading for 1.5 seconds
      await new Promise(resolve => setTimeout(resolve, 1500));

      const submissionData = {
        email: formData.email,
        source: formData.userType
      };

      const result = await formServices.submitBetaSignup(submissionData);

      // Check if it's a duplicate email error
      if (result.error && typeof result.error === 'object' && 'code' in result.error && result.error.code === '23505') {
        toast.info(t('forms.alreadyWaitlist'));
      } else if (result.success) {
        toast.success(t('forms.waitlistThanks'));
      } else {
        console.error('Form submission error:', result.error);
        toast.error(t('forms.genericError'));
        return;
      }

      setFormData({ firstName: '', email: '', userType: '', privacy: false });

    } catch (error) {
      console.error('Form submission exception:', error);
      toast.error(t('forms.genericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render different pages based on currentPage state
  if (currentPage === 'impressum') {
    return <Impressum />;
  }
  
  if (currentPage === 'datenschutz') {
    return <Datenschutz />;
  }
  
  if (currentPage === 'nutzungsbedingungen' || currentPage === 'agb') {
    return <Nutzungsbedingungen />;
  }

  if (currentPage === 'expert') {
    return <ExpertPage />;
  }

  if (currentPage === 'support') {
    return <SupportPage onNavigate={navigate} />;
  }

  if (currentPage === 'ueber-uns') {
    return <UeberUnsPage onNavigate={navigate} />;
  }

  if (currentPage === 'blog') {
    return (
      <BlogPage 
        onBack={() => navigate('home')} 
        onPostSelect={(slug) => {
          setBlogPostSlug(slug);
          navigate('blogpost');
        }}
        onNavigate={navigate}
      />
    );
  }

  if (currentPage === 'blogpost' && blogPostSlug) {
    return (
      <BlogPostPage 
        slug={blogPostSlug}
        onBack={() => navigate('blog')}
        onRelatedPostClick={(slug) => {
          setBlogPostSlug(slug);
          window.scrollTo(0, 0);
        }}
        onNavigate={navigate}
      />
    );
  }

  // if (currentPage === 'press') {
  //   return <PressPage onBack={() => setCurrentPage('home')} />;
  // }

  return (
    <div className="min-h-screen bg-light">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <Hero />
        <CategoryGrid />

      {/* How it Works Section */}
      <section id="how-it-works" className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292B27] mb-3 md:mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              {t('how.title')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('how.sub')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
            <Reveal className="text-center group">
              <div className="bg-[#E2E8FB] rounded-full w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <Search className="w-7 h-7 md:w-10 md:h-10 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {t('how.step1Title')}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {t('how.step1Body')}
                </p>
              </div>
            </Reveal>
            
            <Reveal className="text-center group" delay={80}>
              <div className="bg-[#E2E8FB] rounded-full w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <User className="w-7 h-7 md:w-10 md:h-10 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {t('how.step2Title')}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {t('how.step2Body')}
                </p>
              </div>
            </Reveal>
            
            <Reveal className="text-center group" delay={160}>
              <div className="bg-[#E2E8FB] rounded-full w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <Calendar className="w-7 h-7 md:w-10 md:h-10 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  {t('how.step3Title')}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {t('how.step3Body')}
                </p>
              </div>
            </Reveal>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary gap-2 px-6 py-3 md:px-8 md:py-4 text-sm md:text-lg"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('how.cta')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Experts Carousel */}
      <section className="py-12 md:py-16 lg:py-24 bg-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292B27] mb-3 md:mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              {t('carousel.title')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('carousel.sub')}
            </p>
            <div className="mt-5 md:mt-8">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#BADE4F]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('carousel.tagline')}
              </p>
            </div>
          </div>
          
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevExpert}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label={t('carousel.prev')}
            >
              <ChevronLeft className="w-6 h-6 text-[#6D8EEC] group-hover:text-[#5a7ae8]" />
            </button>
            
            <button
              onClick={nextExpert}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label={t('carousel.next')}
            >
              <ChevronRight className="w-6 h-6 text-[#6D8EEC] group-hover:text-[#5a7ae8]" />
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ 
                  transform: `translateX(-${currentExpert * (320 + 24)}px)` // 320px card width + 24px gap
                }}
              >
                {experts.map((expert, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex-shrink-0 w-80"
                  >
                    <div className="aspect-[3/2] relative overflow-hidden">
                                              <img
                          src={expert.image}
                          alt={`${expert.name} - ${expert.specialty}`}
                          className={`w-full h-full object-cover ${
                            expert.name.includes('Anna') ? 'object-center' : 'object-top'
                          }`}

                        />
                      {/* TODO: Sterne nur anzeigen, wenn sie aus echten elu-Bewertungen stammen. */}
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#6D8EEC] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {t('carousel.newOnElu')}
                      </p>
                      {/* First Name */}
                      <h3 className="text-xl font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        {expert.name.split(' ')[0]}
                      </h3>
                      
                      {/* Profession Name */}
                      <p className="text-[#6D8EEC] font-medium text-sm mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {messages.expertsData.specialties[expert.specialty as keyof typeof messages.expertsData.specialties] ?? expert.specialty}
                      </p>
                      
                      {/* Icons with Information */}
                      <div className="space-y-3">
                                                  {/* Specification */}
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-[#BADE4F]" />
                            <span className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                              {messages.expertsData.focus[expert.focus as keyof typeof messages.expertsData.focus] ?? expert.focus}
                            </span>
                          </div>
                        
                        {/* Location/Availability */}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#BADE4F]" />
                          <span className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                            {messages.expertsData.availability[expert.availability as keyof typeof messages.expertsData.availability] ?? expert.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-center mt-8 gap-2">
              {experts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentExpert(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    index === currentExpert ? 'bg-[#6D8EEC] scale-110' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why elu Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292B27] mb-3 md:mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              {t('why.title')}
            </h2>
            <p className="text-2xl font-bold text-[#6D8EEC] mb-8" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              {t('why.claim')}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('why.p1')}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('why.p2')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#E2E8FB] p-5 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#6D8EEC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('why.card1Title')}
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('why.card1Body')}
              </p>
            </div>
            
            <div className="bg-[#E2E8FB] p-5 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center">
                <Award className="w-8 h-8 text-[#6D8EEC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('why.card2Title')}
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('why.card2Body')}
              </p>
            </div>
            
            <div className="bg-[#E2E8FB] p-5 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#6D8EEC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('why.card3Title')}
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('why.card3Body')}
              </p>
            </div>
            
            <div className="bg-[#E2E8FB] p-5 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-[#6D8EEC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('why.card4Title')}
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('why.card4Body')}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('why.closer')}
            </p>
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary gap-2 px-6 py-3 md:px-8 md:py-4 text-sm md:text-lg"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('why.cta')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Beta Launch Benefits */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-light to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292B27] mb-3 md:mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              {t('beta.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('beta.sub')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#BADE4F]">
              <div className="flex items-start gap-4">
                <div className="bg-[#BADE4F] rounded-full p-2 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {t('beta.b1Title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {t('beta.b1Body')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#BADE4F]">
              <div className="flex items-start gap-4">
                <div className="bg-[#BADE4F] rounded-full p-2 mt-1">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {t('beta.b2Title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {t('beta.b2Body')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#BADE4F]">
              <div className="flex items-start gap-4">
                <div className="bg-[#BADE4F] rounded-full p-2 mt-1">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {t('beta.b3Title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {t('beta.b3Body')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#BADE4F]">
              <div className="flex items-start gap-4">
                <div className="bg-[#BADE4F] rounded-full p-2 mt-1">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {t('beta.b4Title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {t('beta.b4Body')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary gap-2 px-6 py-3 md:px-8 md:py-4 text-sm md:text-lg"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('beta.cta')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292B27] mb-3 md:mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              {t('testimonials.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-light p-5 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/testimonial-katrin.jpg"
                  alt="Katrin"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Katrin
                  </h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                “{t('testimonials.katrin')}”
              </p>
            </div>
            
            <div className="bg-light p-5 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/testimonial-thomas.jpg"
                  alt="Thomas"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Thomas
                  </h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                “{t('testimonials.thomas')}”
              </p>
            </div>
            
            <div className="bg-light p-5 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/testimonial-mona.jpg"
                  alt="Mona"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Mona
                  </h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                “{t('testimonials.mona')}”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292B27] mb-4 md:mb-8" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              {t('audience.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('audience.sub')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#E2E8FB] p-5 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 group">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <HeartPulse className="w-8 h-8 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('audience.a1Title')}
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('audience.a1Body')}
              </p>
            </div>
            
            <div className="bg-[#E2E8FB] p-5 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 group">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <Dumbbell className="w-8 h-8 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('audience.a2Title')}
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('audience.a2Body')}
              </p>
            </div>
            
            <div className="bg-[#E2E8FB] p-5 sm:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 group">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <Apple className="w-8 h-8 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                {t('audience.a3Title')}
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('audience.a3Body')}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('audience.closer')}
            </p>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-light to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292B27] mb-3 md:mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              {t('expertsHome.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('expertsHome.p1')}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('expertsHome.p2')}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('expertsHome.p3')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#6D8EEC]">
              <div className="flex items-start gap-4">
                <div className="bg-[#6D8EEC] rounded-full p-2 mt-1">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {t('expertsHome.c1')}
                  </h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#6D8EEC]">
              <div className="flex items-start gap-4">
                <div className="bg-[#6D8EEC] rounded-full p-2 mt-1">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {t('expertsHome.c2')}
                  </h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#6D8EEC]">
              <div className="flex items-start gap-4">
                <div className="bg-[#6D8EEC] rounded-full p-2 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {t('expertsHome.c3')}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="/experts"
              className="btn-primary gap-2 px-6 py-3 md:px-8 md:py-4 text-sm md:text-lg"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              {t('expertsHome.cta')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Final Signup Section */}
      <section id="signup" className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-[#6D8EEC] to-[#5a7ae8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              {t('signup.title')}
            </h2>
            <p className="text-lg sm:text-xl text-white mb-4 md:mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              {t('signup.claim')}
            </p>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto mb-6 md:mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('signup.sub')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-2xl max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {t('signup.firstName')}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#E2E8FB] rounded-lg focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {t('signup.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#E2E8FB] rounded-lg focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="userType" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {t('signup.role')}
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#E2E8FB] rounded-lg focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  required
                >
                  <option value="">{t('signup.choose')}</option>
                  <option value="client">{t('signup.client')}</option>
                  <option value="expert">{t('signup.expert')}</option>
                </select>
              </div>
              
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-[#6D8EEC] border-gray-300 rounded focus:ring-[#6D8EEC] transition-colors duration-300"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {t('signup.privacy').split('{privacy}')[0]}
                  <a 
                    href="/datenschutz" 
                    className="text-[#6D8EEC] hover:underline"
                  >
                    {t('signup.privacyLink')}
                  </a>
                  {t('signup.privacy').split('{privacy}')[1]}
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-lg gap-2 ${
                  isSubmitting
                    ? 'inline-flex items-center justify-center rounded-full bg-gray-400 text-white font-semibold cursor-not-allowed'
                    : 'btn-primary'
                }`}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                <div 
                  className={`w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin transition-opacity duration-300 ${
                    isSubmitting ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                ></div>
                <span className="select-none">
                  {isSubmitting ? t('signup.submitting') : t('signup.submit')}
                </span>
              </button>
            </form>
            <p className="mt-6 text-sm text-gray-500 text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('signup.note')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
