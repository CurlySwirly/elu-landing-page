import React from 'react';
import { ChevronDown, Home, ArrowRight, Download, Mail, Phone, User, Briefcase, Code } from 'lucide-react';

interface PressPageProps {
  onBack?: () => void;
}

const PressPage: React.FC<PressPageProps> = ({ onBack }) => {
  const founders = [
    {
      name: "Linda Breuer",
      role: "CEO & Produktmanagement",
      icon: <User className="w-6 h-6" />
    },
    {
      name: "Arnold Stelzer",
      role: "CTO & IT-Spezialist",
      icon: <Code className="w-6 h-6" />
    },
    {
      name: "Dominik Dorr",
      role: "Solution Architect & IT-Spezialist",
      icon: <Code className="w-6 h-6" />
    }
  ];

  const newsItems = [
    {
      title: "Elevate You sichert sich PreSeed-Förderung",
      link: "#"
    },
    {
      title: "Launch der Beta-Version für ausgewählte Nutzer:innen",
      link: "#"
    },
    {
      title: "Kooperation mit Gesundheitsnetzwerken in Wien",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Title - would be set via React Helmet in production */}
      {/* <title>Presse | Elevate You</title> */}
      
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
      <main className="mx-auto max-w-4xl px-4 py-12">
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
              <span className="ml-2 text-[#292B27] font-medium">Presse</span>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#292B27] mb-6 tracking-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Presse
          </h1>
          <p className="text-lg md:text-xl text-[#292B27] opacity-80 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Hier finden Sie Pressemitteilungen, Medienmaterialien und die wichtigsten Informationen über Elevate You.
          </p>
        </div>

        {/* Press Kit Section */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
            <h2 className="text-3xl font-bold mb-4 text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Pressekit
            </h2>
            <p className="text-[#292B27] opacity-80 mb-6 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Logos, Bilder und Hintergrundinformationen zum Download.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#326779] text-white rounded-lg hover:bg-[#2a5566] focus:outline-none focus:ring-2 focus:ring-[#326779] focus:ring-offset-2 transition-colors duration-200 font-medium"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                <Download className="w-4 h-4" />
                Logo & Brand Assets
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#326779] text-white rounded-lg hover:bg-[#2a5566] focus:outline-none focus:ring-2 focus:ring-[#326779] focus:ring-offset-2 transition-colors duration-200 font-medium"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                <Download className="w-4 h-4" />
                Founder Fotos
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#326779] text-white rounded-lg hover:bg-[#2a5566] focus:outline-none focus:ring-2 focus:ring-[#326779] focus:ring-offset-2 transition-colors duration-200 font-medium"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                <Download className="w-4 h-4" />
                Pitch Deck (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
            <h2 className="text-3xl font-bold mb-4 text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Über Elevate You
            </h2>
            <div className="mb-8">
              <div className="bg-[#F8F9FA] rounded-lg p-4 mb-6">
                <h3 className="text-xl font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Elevate You FlexKapG (in Gründung), Wien
                </h3>
                <p className="text-[#292B27] opacity-80 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Digitale Plattform zur Vermittlung von qualitätsgesicherten Gesundheits- und Präventionsangeboten
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Unser Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {founders.map((founder, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-16 h-16 bg-[#326779] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">
                      {founder.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {founder.name}
                  </h4>
                  <p className="text-[#292B27] opacity-80 text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {founder.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact Section */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
            <h2 className="text-3xl font-bold mb-4 text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Pressekontakt
            </h2>
            <div className="bg-[#F8F9FA] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#326779] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Linda Breuer
                  </h3>
                  <p className="text-[#292B27] opacity-80" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    CEO & Produktmanagement
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <a
                  href="mailto:info@elevateyou.app"
                  className="inline-flex items-center gap-2 text-[#326779] hover:text-[#2a5566] transition-colors duration-200 font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <Mail className="w-4 h-4" />
                  info@elevateyou.app
                </a>
                <div className="inline-flex items-center gap-2 text-[#326779] font-medium">
                  <Phone className="w-4 h-4" />
                  +43 699 171 80071
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
            <h2 className="text-3xl font-bold mb-4 text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Aktuelle Mitteilungen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="block bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#326779] group"
                >
                  <h3 className="text-lg font-semibold text-[#292B27] mb-3 group-hover:text-[#326779] transition-colors duration-200" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    {item.title}
                  </h3>
                  <div className="flex items-center text-[#326779] group-hover:text-[#2a5566] transition-colors duration-200">
                    <span className="text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      Mehr erfahren
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <section className="text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="#"
              className="text-[#326779] hover:text-[#2a5566] hover:underline transition-colors duration-200"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Impressum
            </a>
            <a
              href="#"
              className="text-[#326779] hover:text-[#2a5566] hover:underline transition-colors duration-200"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Datenschutzerklärung
            </a>
            <a
              href="#"
              className="text-[#326779] hover:text-[#2a5566] hover:underline transition-colors duration-200"
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

export default PressPage;
