import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLocale } from '../i18n';

interface FAQItem {
  question: string;
  answer: string;
}

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
        <h3 className="text-base sm:text-lg font-semibold text-[#292B27] pr-3 sm:pr-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
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
  const { t, messages } = useLocale();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const faqData = messages.faq.items;

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#292B27] mb-4 md:mb-6" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            {t('faq.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-[#292B27] max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            {t('faq.sub')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={item.q}
              item={{ question: item.q, answer: item.a }}
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
