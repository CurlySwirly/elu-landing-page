import React from 'react';
import Reveal from './Reveal';
import {
  Activity,
  Award,
  Brain,
  Check,
  Flower2,
  Heart,
  MessageCircle,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useLocale } from '../i18n';

const categoryIcons = [
  Activity,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Flower2,
  Shield,
  Brain,
  Award,
  Check,
];

const CategoryGrid: React.FC = () => {
  const { t, messages } = useLocale();

  return (
    <section className="bg-white px-4 py-12 md:py-16 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-8 md:mb-10 lg:mb-14">
          <h2
            className="text-[22px] sm:text-3xl lg:text-4xl font-bold text-[#292B27] mb-3"
            style={{ fontFamily: 'League Spartan, sans-serif' }}
          >
            {t('categories.titleLead')}
            <br className="sm:hidden" />{' '}
            {t('categories.titleTail')}
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg text-[#292B27]/60 max-w-3xl mx-auto"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            {t('categories.sub')}
          </p>
        </Reveal>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {messages.categories.items.map((label, index) => {
            const Icon = categoryIcons[index];
            return (
              <li key={label}>
                <Reveal delay={index * 40} className="h-full">
                  <div className="card-lift flex flex-col items-center justify-center gap-2.5 sm:gap-3 rounded-2xl bg-light px-3 py-5 sm:px-4 sm:py-6 md:py-7 h-full">
                    <Icon className="w-5 h-5 text-[#6D8EEC]" strokeWidth={1.75} />
                    <span
                      className="text-xs sm:text-sm font-medium text-[#292B27] text-center"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                      {label}
                    </span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default CategoryGrid;
