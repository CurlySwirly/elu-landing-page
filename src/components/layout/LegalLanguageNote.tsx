import React from 'react';
import { useLocale } from '../../i18n';

const LegalLanguageNote: React.FC = () => {
  const { locale, t } = useLocale();
  if (locale !== 'en') return null;

  return (
    <p
      className="mb-6 rounded-2xl bg-[#E2E8FB] px-4 py-3 text-sm text-[#292B27]/80"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      {t('legal.notice')}
    </p>
  );
};

export default LegalLanguageNote;
