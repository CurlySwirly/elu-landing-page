import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, Settings } from 'lucide-react';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
  onCustomize: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline, onCustomize }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (!cookieChoice) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    onDecline();
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
    onCustomize();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {/* Cookie Icon and Main Text */}
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 bg-[#BADE4F] rounded-full flex items-center justify-center">
                <Cookie className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#292B27] mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                Wir verwenden Cookies
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Wir verwenden Cookies und ähnliche Technologien, um Ihre Erfahrung auf unserer Website zu verbessern, 
                den Verkehr zu analysieren und personalisierte Inhalte bereitzustellen. 
                Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={handleAccept}
              className="px-6 py-3 bg-[#BADE4F] text-white font-medium rounded-lg hover:bg-[#A8D13F] transition-colors duration-200 shadow-sm hover:shadow-md"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Alle akzeptieren
            </button>
            <button
              onClick={handleCustomize}
              className="px-6 py-3 bg-white text-[#292B27] font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <Settings className="w-4 h-4" />
              Anpassen
            </button>
            <button
              onClick={handleDecline}
              className="px-6 py-3 bg-gray-100 text-[#292B27] font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Ablehnen
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={handleDecline}
            className="lg:flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Cookie-Einstellungen schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Detailed Cookie Information */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Essential Cookies */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-[#6D8EEC]" />
                  <h4 className="font-semibold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Notwendige Cookies
                  </h4>
                </div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
                </p>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 bg-[#6D8EEC] text-white text-xs rounded-full">
                    Immer aktiv
                  </span>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Cookie className="w-5 h-5 text-[#BADE4F]" />
                  <h4 className="font-semibold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Analyse-Cookies
                  </h4>
                </div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem Informationen anonym gesammelt werden.
                </p>
                <div className="mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-[#BADE4F] border-gray-300 rounded focus:ring-[#BADE4F]"
                    />
                    <span className="text-sm text-gray-700">Aktivieren</span>
                  </label>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Cookie className="w-5 h-5 text-[#F59E0B]" />
                  <h4 className="font-semibold text-[#292B27]" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                    Marketing-Cookies
                  </h4>
                </div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Werden verwendet, um Besuchern relevante Anzeigen und Marketingkampagnen bereitzustellen.
                </p>
                <div className="mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#F59E0B] border-gray-300 rounded focus:ring-[#F59E0B]"
                    />
                    <span className="text-sm text-gray-700">Aktivieren</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy Policy Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Weitere Informationen finden Sie in unserer{' '}
                <a href="#" className="text-[#6D8EEC] hover:underline font-medium">
                  Datenschutzerklärung
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
