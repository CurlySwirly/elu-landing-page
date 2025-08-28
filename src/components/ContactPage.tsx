import React, { useState } from 'react';
import { ArrowLeft, Mail, Linkedin, Instagram, Send } from 'lucide-react';
import { formServices } from '../lib/formServices';

interface ContactPageProps {
  onBack?: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await formServices.submitContactMessage(formData);

      if (result.success) {
        alert('Vielen Dank für deine Nachricht! Wir melden uns so schnell wie möglich bei dir.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Es gab einen Fehler beim Senden der Nachricht. Bitte versuche es erneut.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Es gab einen Fehler beim Senden der Nachricht. Bitte versuche es erneut.');
    }
  };

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
              <span className="font-bold">elu.</span> <span className="font-extralight italic">elevate you</span>
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
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#292B27] mb-6 tracking-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            Kontakt
          </h1>
          <p className="text-lg md:text-xl text-[#292B27] opacity-80 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Hast du Fragen oder möchtest mehr über elu erfahren? Wir freuen uns von dir zu hören.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Company Info & Social Links */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Unternehmen
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Elevate You FlexKapG (in Gründung)
                  </h3>
                  <p className="text-[#292B27] opacity-80" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Wien, Österreich
                  </p>
                </div>
                <div className="pt-4">
                  <a 
                    href="mailto:info@elevateyou.app"
                    className="inline-flex items-center gap-3 text-[#6D8EEC] hover:text-[#5a7ae8] transition-colors duration-200 font-medium"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    <Mail className="w-5 h-5" />
                    info@elevateyou.app
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Social Media
              </h2>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/108662379/" target="_blank" rel="noopener noreferrer" className="bg-[#BADE4F] hover:bg-[#A8D13F] p-3 rounded-full transition-colors duration-300">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.instagram.com/elevateyou.app/" target="_blank" rel="noopener noreferrer" className="bg-[#BADE4F] hover:bg-[#A8D13F] p-3 rounded-full transition-colors duration-300">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
              Nachricht senden
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6D8EEC] focus:outline-none transition-colors duration-200 text-[#292B27]"
                  placeholder="Dein vollständiger Name"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6D8EEC] focus:outline-none transition-colors duration-200 text-[#292B27]"
                  placeholder="deine@email.de"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#6D8EEC] focus:outline-none transition-colors duration-200 text-[#292B27] resize-none"
                  placeholder="Deine Nachricht an uns..."
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#6D8EEC] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#5A7BE8] transition-colors duration-200 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <Send className="w-5 h-5" />
                  Absenden
                </button>
                <p className="text-sm text-[#292B27] opacity-60 mt-3 text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  * Pflichtfelder
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
