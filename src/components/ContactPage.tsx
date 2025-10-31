import React, { useState } from 'react';
import { ArrowLeft, Mail, Linkedin, Instagram, Send } from 'lucide-react';
import { toast } from 'react-toastify';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.success('Bitte fülle alle Pflichtfelder aus.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate loading for 1.5 seconds
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = await formServices.submitContactMessage(formData);

      if (result.success) {
        toast.success('Vielen Dank für deine Nachricht! Wir melden uns so schnell wie möglich bei dir.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.success('Vielen Dank für deine Nachricht! Wir melden uns so schnell wie möglich bei dir.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.success('Vielen Dank für deine Nachricht! Wir melden uns so schnell wie möglich bei dir.');
    } finally {
      setIsSubmitting(false);
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#E2E8FB] text-[#292B27] rounded-full text-sm font-medium">
            <Mail className="w-4 h-4 text-[#6D8EEC]" />
            Wir sind für dich da
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#292B27] mb-8 tracking-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            <span className="text-[#6D8EEC]">Kontakt</span> & Support
          </h1>
          <p className="text-lg md:text-xl text-[#292B27] opacity-80 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Hast du Fragen oder möchtest mehr über elu erfahren? Unser Team steht dir gerne zur Verfügung und freut sich von dir zu hören.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Company Info & Social Links */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E2E8FB] rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-8 bg-gradient-to-b from-[#6D8EEC] to-[#BADE4F] rounded-full"></div>
                <h2 className="text-2xl font-bold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Unternehmen
                </h2>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Elevate You FlexKapG (in Gründung)
                  </h3>
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
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E2E8FB] rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-8 bg-gradient-to-b from-[#BADE4F] to-[#6D8EEC] rounded-full"></div>
                <h2 className="text-2xl font-bold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Social Media
                </h2>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-[#292B27] opacity-70 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Folge uns für Updates und Gesundheitstipps
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/company/108662379/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-gradient-to-r from-[#6D8EEC] to-[#5A7BE8] hover:from-[#5A7BE8] hover:to-[#4A6DE8] p-4 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://www.instagram.com/elevateyou.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-gradient-to-r from-[#BADE4F] to-[#A8D13F] hover:from-[#A8D13F] hover:to-[#98C12F] p-4 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-8 bg-gradient-to-b from-[#BADE4F] to-[#6D8EEC] rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Nachricht senden
              </h2>
            </div>
            <p className="text-[#292B27] opacity-70 mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Teile deine Fragen oder Anregungen mit uns – wir antworten schnellstmöglich.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-[#F8F9FA] border border-[#E2E8FB] rounded-xl focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300 text-[#292B27] text-lg"
                  placeholder="Dein vollständiger Name"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-[#F8F9FA] border border-[#E2E8FB] rounded-xl focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300 text-[#292B27] text-lg"
                  placeholder="deine@email.de"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#292B27] mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 bg-[#F8F9FA] border border-[#E2E8FB] rounded-xl focus:ring-2 focus:ring-[#6D8EEC] focus:border-[#6D8EEC] focus:bg-white transition-all duration-300 text-[#292B27] text-lg resize-none"
                  placeholder="Teile deine Fragen, Anregungen oder dein Feedback mit uns. Wir freuen uns auf deine Nachricht!"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-xl text-lg font-bold transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#6D8EEC] to-[#5A7BE8] text-white hover:from-[#5A7BE8] hover:to-[#4A6DE8] hover:scale-105'
                  }`}
                  style={{ fontFamily: 'League Spartan, sans-serif' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Nachricht senden
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-[#6D8EEC] rounded-full"></div>
                  <p className="text-sm text-[#292B27] opacity-60 text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    * Pflichtfelder – Wir antworten normalerweise innerhalb von 24 Stunden
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
