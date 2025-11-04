import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

interface HeroProps {
  heroBg?: string;
  showDoodles?: boolean;
}

const services = [
  {
    id: 'massage',
    label: 'Massage',
    image: 'https://images.pexels.com/photos/275768/pexels-photo-275768.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    alt: 'Massage – Linderung bei Verspannungen'
  },
  {
    id: 'physio',
    label: 'Physiotherapie',
    image: 'https://images.pexels.com/photos/8219055/pexels-photo-8219055.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    alt: 'Physiotherapie – Therapeutische Behandlung und Taping'
  },
  {
    id: 'pt',
    label: 'Personal Training',
    image: 'https://images.pexels.com/photos/6455783/pexels-photo-6455783.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    alt: 'Personal Training – Individuelles Fitnesstraining und Workouts'
  },
  {
    id: 'ernaehrung',
    label: 'Ernährung',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    alt: 'Ernährung – Gesunde Ernährungsberatung'
  },
  {
    id: 'coaching',
    label: 'Coaching',
    image: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    alt: 'Coaching – Mentale Gesundheit und Beratung'
  }
];

const Hero: React.FC<HeroProps> = ({ heroBg, showDoodles = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  // Auto-rotate functionality
  useEffect(() => {
    if (!isHovered && !isDragging) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, 4500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, isDragging, currentIndex]); // Added currentIndex to dependencies

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch/drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStart;
    setDragOffset(diff);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50; // Reduced threshold for better responsiveness
    if (dragOffset > threshold) {
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    } else if (dragOffset < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24"
      style={{
        background: 'linear-gradient(135deg, rgba(186, 222, 79, 0.2) 0%, rgba(240, 240, 240, 0.3) 25%, rgba(240, 240, 240, 0.3) 75%, rgba(109, 142, 236, 0.2) 100%)'
      }}
    >
      {/* Hand-drawn arrows (optional) */}
      {showDoodles && (
        <>
          <svg 
            className="absolute top-1/3 left-8 w-16 h-12 text-[#292B27] opacity-30 hidden lg:block transform -rotate-12"
            viewBox="0 0 64 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M8 24c8-8 16-4 24 0s16 8 24 0" />
            <path d="M48 16l8 8-8 8" />
          </svg>
          
          <svg 
            className="absolute top-2/3 right-8 w-16 h-12 text-[#292B27] opacity-30 hidden lg:block transform rotate-12"
            viewBox="0 0 64 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M56 24c-8 8-16 4-24 0s-16-8-24 0" />
            <path d="M16 32l-8-8 8-8" />
          </svg>
        </>
      )}

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 md:mb-12 bg-[#E2E8FB] text-[#292B27] rounded-full text-sm font-medium">
          <AlertTriangle className="w-4 h-4 text-[#6D8EEC]" />
          Beta-Plätze limitiert
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#292B27] mb-6 md:mb-8 leading-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          <span className="text-[#BADE4F]">Gesund bleiben</span> beginnt hier.
        </h1>

        {/* Subline */}
        <p className="text-lg md:text-xl text-[#292B27] mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Finde geprüfte Expert:innen für Körper, Geist und Wohlbefinden – vereint auf einer Plattform.
        </p>
        
        {/* Additional subline */}
        <p className="text-base md:text-lg text-[#292B27] mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Ob Physiotherapie, Massage, Personal Training oder Ernährungsberatung – bei elu findest du professionelle Unterstützung, die zu dir und deinem Lebensstil passt. Einfach, sicher und ganzheitlich.
        </p>

        {/* Services carousel */}
        <div className="mb-12 md:mb-16">
          <div 
            ref={stripRef}
            className="relative h-72 md:h-80 flex items-center justify-center overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              handleDragEnd();
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
          >
            {/* Services with circular positioning */}
            {services.map((service, index) => {
              // Calculate position relative to current index
              let position = index - currentIndex;
              
              // Handle wrapping for infinite effect
              if (position > 2) {
                position -= services.length;
              } else if (position < -2) {
                position += services.length;
              }
              
              // Only show cards within visible range
              const isVisible = Math.abs(position) <= 2;
              
              const translateX = position * 280;
              let scale = 0.6;
              let zIndex = 1;
              let opacity = 0;
              let rotateY = 0;
              
              if (Math.abs(position) <= 2) {
                if (position === 0) {
                  // Active (center)
                  scale = 1;
                  zIndex = 20;
                  opacity = 1;
                  rotateY = 0;
                } else if (Math.abs(position) === 1) {
                  // Adjacent cards
                  scale = 0.85;
                  zIndex = 15;
                  opacity = 0.7;
                  rotateY = position < 0 ? 15 : -15;
                } else if (Math.abs(position) === 2) {
                  // Side cards
                  scale = 0.7;
                  zIndex = 10;
                  opacity = 0.4;
                  rotateY = position < 0 ? 25 : -25;
                }
              }
              
              return (
                <div
                  key={service.id}
                  className={`absolute transition-all duration-700 ease-out cursor-grab active:cursor-grabbing transform-style-preserve-3d ${
                    isVisible ? 'block' : 'hidden'
                  }`}
                  style={{
                    transform: `translateX(${translateX + (dragOffset * 0.5)}px) scale(${scale}) rotateY(${rotateY}deg)`,
                    zIndex,
                    opacity
                  }}
                  onClick={() => {
                    if (position !== 0 && !isDragging) {
                      // Clear existing interval to reset auto-scroll
                      if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                      }
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <div className="w-64 h-48 md:w-80 md:h-60 relative group">
                    <div className={`relative w-full h-full rounded-3xl overflow-hidden transition-all duration-700 ${
                      position === 0
                        ? 'shadow-2xl ring-4 ring-[#6D8EEC] ring-opacity-30' 
                        : 'shadow-lg hover:shadow-xl'
                    }`}>
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 transition-all duration-700 ${
                        position === 0 ? 'bg-gradient-to-t from-black/20 to-transparent' : 'bg-black/20'
                      }`} />
                      <div className="absolute bottom-4 left-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-700 ${
                          position === 0
                            ? 'bg-white text-[#292B27] shadow-lg' 
                            : 'bg-white/90 text-[#292B27]'
                        }`}>
                          <div className={`w-1 h-4 rounded-full transition-all duration-700 ${
                            position === 0 ? 'bg-[#6D8EEC]' : 'bg-[#BADE4F]'
                          }`}></div>
                          {service.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => {
                // Clear existing interval to reset auto-scroll
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                }
                const newIndex = currentIndex === 0 ? services.length - 1 : currentIndex - 1;
                setCurrentIndex(newIndex);
              }}
              className="p-2 rounded-full bg-[#F0F0F0] text-[#292B27] hover:bg-[#E2E8FB] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2"
              aria-label="Vorheriger Service"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination dots */}
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Clear existing interval to reset auto-scroll
                    if (intervalRef.current) {
                      clearInterval(intervalRef.current);
                    }
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2 ${
                    index === currentIndex ? 'bg-[#6D8EEC] w-6' : 'bg-[#F0F0F0] hover:bg-[#E2E8FB]'
                  }`}
                  aria-label={`Zu Service ${index + 1} wechseln`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                // Clear existing interval to reset auto-scroll
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                }
                const newIndex = currentIndex === services.length - 1 ? 0 : currentIndex + 1;
                setCurrentIndex(newIndex);
              }}
              className="p-2 rounded-full bg-[#F0F0F0] text-[#292B27] hover:bg-[#E2E8FB] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2"
              aria-label="Nächster Service"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="text-center">
          <button 
            onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6D8EEC] to-[#5A7BE8] text-white font-bold rounded-full hover:from-[#5A7BE8] hover:to-[#4A6DE8] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2 shadow-xl hover:shadow-2xl border border-white/20"
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            Beta-Zugang sichern
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <p className="mt-3 text-sm text-[#292B27] opacity-70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Kostenlos & unverbindlich
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
