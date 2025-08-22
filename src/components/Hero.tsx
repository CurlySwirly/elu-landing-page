import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface HeroProps {
  heroBg?: string;
  showDoodles?: boolean;
}

const services = [
  {
    id: 'massage',
    label: 'Massage',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    alt: 'Massage – Linderung bei Verspannungen'
  },
  {
    id: 'physio',
    label: 'Physiotherapie',
    image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    alt: 'Physiotherapie – Bewegung und Rehabilitation'
  },
  {
    id: 'pt',
    label: 'Personal Training',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    alt: 'Personal Training – Individuelles Fitnesstraining'
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
  }, [isHovered, isDragging]);

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
    
    const threshold = 100;
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
          <Check className="w-4 h-4 text-[#6D8EEC]" />
          Warteliste limitiert – sei von Anfang an dabei
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#292B27] mb-6 md:mb-8 leading-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          <span className="text-[#BADE4F]">Gesund bleiben</span> liegt in deiner Hand.
        </h1>

        {/* Subline */}
        <p className="text-lg md:text-xl text-[#292B27] mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          elu macht präventive Gesundheit leicht zugänglich – einfach, verlässlich und passend zu deinem Alltag.
        </p>

        {/* Services image strip */}
        <div className="mb-12 md:mb-16">
          <div 
            ref={stripRef}
            className="relative overflow-hidden"
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
            <div 
              className="flex gap-4 md:gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / services.length)}% - ${currentIndex * (isDragging ? 0 : 24)}px + ${dragOffset}px))`
              }}
            >
              {/* Duplicate services for infinite scroll effect */}
              {[...services, ...services, ...services].map((service, index) => {
                return (
                  <div
                    key={`${service.id}-${index}`}
                    className="flex-shrink-0 w-64 h-48 md:w-80 md:h-60 relative group cursor-grab active:cursor-grabbing"
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E2E8FB] text-[#292B27] rounded-full text-sm font-medium">
                          <div className="w-1 h-4 bg-[#BADE4F] rounded-full"></div>
                          {service.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)}
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
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2 ${
                    index === currentIndex ? 'bg-[#6D8EEC] w-6' : 'bg-[#F0F0F0] hover:bg-[#E2E8FB]'
                  }`}
                  aria-label={`Zu Service ${index + 1} wechseln`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % services.length)}
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#6D8EEC] text-white font-semibold rounded-full hover:bg-[#5A7BE8] transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-offset-2 shadow-lg hover:shadow-xl"
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
