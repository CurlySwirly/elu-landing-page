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
import { GENERIC_FORM_ERROR } from './lib/formErrors';
import { getPageFromPath, pageToPath } from './lib/navigation';
import UeberUnsPage from './components/UeberUnsPage';
import SiteHeader from './components/layout/SiteHeader';
import SiteFooter from './components/layout/SiteFooter';

function App() {
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
      toast.error('Bitte fülle alle Felder aus und stimme der Datenschutzerklärung zu.');
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
        toast.info('Du stehst bereits auf der Warteliste! Wir melden uns bei dir, sobald der Beta-Start verfügbar ist.');
      } else if (result.success) {
        // Success - added to waitlist
        toast.success('Vielen Dank! Du wurdest erfolgreich zur Warteliste hinzugefügt.');
      } else {
        console.error('Form submission error:', result.error);
        toast.error(GENERIC_FORM_ERROR);
        return;
      }

      setFormData({ firstName: '', email: '', userType: '', privacy: false });

    } catch (error) {
      console.error('Form submission exception:', error);
      toast.error(GENERIC_FORM_ERROR);
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
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-16 lg:pt-20">
        <Hero showDoodles={false} />

      {/* How it Works Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              So einfach funktioniert elu.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Gesundheit beginnt mit der richtigen Verbindung.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
            <div className="text-center group">
              <div className="bg-[#E2E8FB] rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <Search className="w-10 h-10 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  1. Expert:in finden
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Filtere nach Bereich, Standort und Format.
                </p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-[#E2E8FB] rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <User className="w-10 h-10 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  2. Kennenlernen
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Profile, Bewertungen und Chat helfen dir bei der Wahl.
                </p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-[#E2E8FB] rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <Calendar className="w-10 h-10 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  3. Termin buchen
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  direkt in der App, sicher bezahlt.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#6D8EEC] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#5a7ae8] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Beta-Platz sichern
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Experts Carousel */}
      <section className="py-16 lg:py-24 bg-[#F0F0F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Expert:innen auf elu
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Entdecke qualifizierte Fachpersonen in deiner Nähe und online.
            </p>
            <div className="mt-8">
              <p className="text-2xl font-bold text-[#BADE4F]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Gesund bleiben liegt bei dir. Die richtigen Expert:innen findest du hier.
              </p>
            </div>
          </div>
          
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevExpert}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-[#6D8EEC] group-hover:text-[#5a7ae8]" />
            </button>
            
            <button
              onClick={nextExpert}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
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
                        Neu auf elu
                      </p>
                      {/* First Name */}
                      <h3 className="text-xl font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                        {expert.name.split(' ')[0]}
                      </h3>
                      
                      {/* Profession Name */}
                      <p className="text-[#6D8EEC] font-medium text-sm mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {expert.specialty}
                      </p>
                      
                      {/* Icons with Information */}
                      <div className="space-y-3">
                                                  {/* Specification */}
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-[#BADE4F]" />
                            <span className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                              {expert.focus}
                            </span>
                          </div>
                        
                        {/* Location/Availability */}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#BADE4F]" />
                          <span className="text-sm text-gray-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                            {expert.availability}
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
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Warum elu?
            </h2>
            <p className="text-2xl font-bold text-[#6D8EEC] mb-8" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Weil Gesundheit Vertrauen verdient.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Flexibel vor Ort oder online – du entscheidest, welches Format zu dir passt. Erst kennenlernen, dann buchen: Stell deine Fragen vorab im verschlüsselten Chat.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Jede Qualifikation wird vor der Freischaltung geprüft.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#E2E8FB] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#6D8EEC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Persönliche Vorschläge
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Wir zeigen dir Expert:innen, die zu deinen Zielen, deinem Standort und deinen Vorlieben passen.
              </p>
            </div>
            
            <div className="bg-[#E2E8FB] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center">
                <Award className="w-8 h-8 text-[#6D8EEC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Vielfältige Bereiche
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Physiotherapie, Personal Training, Massage, Ernährung, Yoga und Coaching.
              </p>
            </div>
            
            <div className="bg-[#E2E8FB] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#6D8EEC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Sichere Bezahlung
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Du bezahlst bei der Buchung über Stripe. Alle Kosten siehst du vorher.
              </p>
            </div>
            
            <div className="bg-[#E2E8FB] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-[#6D8EEC]" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Geprüfte Qualifikation
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Jede Qualifikation wird vor der Freischaltung geprüft.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              elu bringt dich mit Menschen zusammen, die dich verstehen und unterstützen – für mehr Energie, Beweglichkeit und Lebensqualität.
            </p>
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#6D8EEC] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#5a7ae8] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Mehr über elu erfahren
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Beta Launch Benefits */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#F0F0F0] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Sei von Anfang an dabei.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Werde Teil der Beta. Sichere dir Vorteile, teste neue Funktionen und gestalte elu mit deinem Feedback aktiv mit.
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
                    Als Erste:r dabei
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Du erfährst vor allen anderen, wenn elu in deiner Region startet.
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
                    Frühzeitiger Zugang zu geprüften Expert:innen
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Buche als Erste:r, sobald deine Region freigeschaltet ist.
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
                    Mitgestaltung durch dein Feedback
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Gestalte elu aktiv mit und hilf dabei, Gesundheit für alle zugänglich zu machen.
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
                    Früher Zugang zu neuen Funktionen
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Teste neue Features und Updates, bevor sie offiziell veröffentlicht werden.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#BADE4F] text-[#292B27] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#a8c943] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Beta-Platz sichern
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Was unsere Testpersonen sagen
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F0F0F0] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
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
                "Ich habe endlich die richtige Ernährungsberaterin gefunden – in nur 2 Minuten."
              </p>
            </div>
            
            <div className="bg-[#F0F0F0] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
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
                "Endlich eine App, die wirklich hilft. Mein Physiotherapeut war nur einen Klick entfernt."
              </p>
            </div>
            
            <div className="bg-[#F0F0F0] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
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
                "Ich liebe die Einfachheit – keine endlosen Recherchen mehr."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#292B27] mb-8" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Persönliche Begleitung statt Standardprogramm
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Immer mehr Menschen suchen individuelle Unterstützung statt generischer Programme. elu hilft dir, Expert:innen zu finden, die wirklich zu dir passen.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#E2E8FB] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 group">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <HeartPulse className="w-8 h-8 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Bei Beschwerden
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                mit Physiotherapie und Massage
              </p>
            </div>
            
            <div className="bg-[#E2E8FB] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 group">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <Dumbbell className="w-8 h-8 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Für mehr Energie und Kraft
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                mit Personal Training, Yoga und Bewegungsprogrammen
              </p>
            </div>
            
            <div className="bg-[#E2E8FB] p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 group">
              <div className="bg-white rounded-full w-16 h-16 mb-6 flex items-center justify-center group-hover:bg-[#6D8EEC] transition-all duration-300">
                <Apple className="w-8 h-8 text-[#6D8EEC] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Für langfristige Gesundheit
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                mit Ernährungsberatung, Coaching und nachhaltigen Routinen
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              elu macht es leichter, gesunde Entscheidungen in deinen Alltag zu integrieren.
            </p>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#F0F0F0] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#292B27] mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Für Expert:innen, die Gesundheit mitgestalten.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              elu bringt qualifizierte Gesundheitsprofis mit Menschen zusammen, die aktiv an ihrem Wohlbefinden arbeiten möchten.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Wenn du in den Bereichen Physiotherapie, Personal Training, Massage, Ernährung, Yoga oder Coaching tätig bist, erhältst du über elu eine Bühne, auf der Qualität und Vertrauen im Mittelpunkt stehen.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Werde Teil einer Plattform, die Prävention neu denkt und Expert:innen sichtbar macht, die wirklich etwas bewirken wollen.
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
                    Werde von Klient:innen gefunden, die zu deinem Angebot passen
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
                    Buchung, Zahlung und Rechnung laufen über elu
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
                    Die ersten 3 Buchungen ohne Plattformgebühr
                  </h3>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="/experts"
              className="bg-[#6D8EEC] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#5a7ae8] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Mehr für Expert:innen
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Final Signup Section */}
      <section id="signup" className="py-16 lg:py-24 bg-gradient-to-br from-[#6D8EEC] to-[#5a7ae8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Finde deine Expert:in
            </h2>
            <p className="text-xl text-white mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Stöbern geht ohne Login – ein Konto brauchst du erst beim Buchen.
            </p>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Melde dich jetzt für den Beta-Zugang an und erhalte als Erste:r Zugang zur Plattform.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Vorname*
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
                    E-Mail*
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
                  Ich bin...*
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
                  <option value="">Bitte wählen</option>
                  <option value="client">Klient:in</option>
                  <option value="expert">Expert:in</option>
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
                  Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                  <a 
                    href="/datenschutz" 
                    className="text-[#6D8EEC] hover:underline"
                  >
                    Datenschutzerklärung
                  </a>{' '}
                  zu.*
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#6D8EEC] text-white hover:bg-[#5a7ae8] transform hover:scale-105'
                }`}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                <div 
                  className={`w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin transition-opacity duration-300 ${
                    isSubmitting ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                ></div>
                <span className="select-none">
                  {isSubmitting ? 'Wird verarbeitet...' : 'Kostenlos vormerken'}
                </span>
              </button>
            </form>
            <p className="mt-6 text-sm text-gray-500 text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              (Kostenlos und unverbindlich. Wir melden uns, sobald es losgeht.)
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
      </main>

      <SiteFooter />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
        <button 
          onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-gradient-to-r from-[#6D8EEC] to-[#5A7BE8] text-white py-4 rounded-full text-lg font-bold shadow-2xl hover:from-[#5A7BE8] hover:to-[#4A6DE8] transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
          style={{ fontFamily: 'League Spartan, sans-serif' }}
        >
          Kostenlos vormerken
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default App;// Force deploy update - Mobile header fix applied
