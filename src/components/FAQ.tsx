import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Wie wird mir der passende Experte vorgeschlagen?",
    answer: "Unsere Matching-Funktion berücksichtigt deine Angaben zu Zielen, Standort und Präferenzen. So erhältst du personalisierte Vorschläge und findest schnell die richtige Expertin oder den richtigen Experten für dein Anliegen."
  },
  {
    question: "Kostet mich die App etwas?",
    answer: "Die App selbst ist kostenlos. Du zahlst nur für gebuchte Leistungen. Es fällt keine zusätzliche Buchungsgebühr für dich an – der Preis ist transparent und entspricht dem, was die Expert:innen angeben."
  },
  {
    question: "Kann ich mit den Expert:innen vorab schreiben?",
    answer: "Ja, du kannst über die integrierte Chat-Funktion Fragen stellen, Details abklären und Vertrauen aufbauen, bevor du buchst."
  },
  {
    question: "Wie buche und bezahle ich eine Einheit?",
    answer: "Du wählst die Expertin oder den Experten, entscheidest dich für eine Leistung und buchst direkt in der App. Die Zahlung läuft sicher über unseren Zahlungsdienstleister, sodass alles transparent und geschützt ist."
  },
  {
    question: "Was passiert, wenn ein Termin abgesagt wird?",
    answer: "Sollten Expert:innen einen Termin absagen müssen, wirst du sofort informiert. In diesem Fall kannst du kostenlos umbuchen oder erhältst dein Geld automatisch zurück."
  },
  {
    question: "Kann ich Bewertungen anderer Kund:innen sehen?",
    answer: "Ja, nach jeder Einheit geben Kund:innen Feedback. Diese Bewertungen helfen dir, die Qualität besser einzuschätzen und die passende Wahl zu treffen."
  },
  {
    question: "Ist elu nur für Fitness?",
    answer: "Nein, bei uns findest du ein breites Angebot – von Personal Training über Physiotherapie und Massage bis hin zu Ernährungsberatung und Coaching."
  }
];

const AccordionItem: React.FC<{ item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }> = ({ 
  item, 
  index, 
  isOpen, 
  onToggle 
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(isOpen ? contentHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full px-5 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6D8EEC] focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`faq-content-${index}`}
      >
        <h3 className="text-lg font-semibold text-[#292B27] pr-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          {item.question}
        </h3>
        <div className="flex-shrink-0">
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            {isOpen ? (
              <Minus className="w-5 h-5 text-[#6D8EEC]" />
            ) : (
              <Plus className="w-5 h-5 text-[#6D8EEC]" />
            )}
          </div>
        </div>
      </button>
      
      <div
        id={`faq-content-${index}`}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: height ? `${height}px` : '0px' }}
      >
        <div ref={contentRef} className="px-5 pb-5">
          <div className="pt-2 border-t border-gray-100">
            <p className="text-base text-[#292B27] leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-[#F0F0F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#292B27] mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            FAQ – Häufig gestellte Fragen
          </h2>
          <p className="text-lg md:text-xl text-[#292B27] max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Hier findest du Antworten auf die wichtigsten Fragen rund um deine Nutzung von elu. So weißt du genau, was dich erwartet, bevor du deine erste Buchung machst.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
