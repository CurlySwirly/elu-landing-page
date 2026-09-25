const introEndsAt = '2026-12-31';

export const EXPERT_PRICING = {
  introEndsAt,
  introEndsLabel: '31. Dezember 2026',
  introEndsShort: introEndsAt.split('-').reverse().join('.'),
  introSlots: 50,
  starter: {
    price: '€0',
    period: 'Monat',
    feePercent: '15 %',
    freeBookings: 3,
  },
  monthly: {
    regular: '€99,99',
    intro: '€19,99',
    period: 'Monat',
    worthwhileFrom: '€134',
  },
  yearly: {
    regular: '€999,90',
    intro: '€199,90',
    period: 'Jahr',
    monthlyEquivalent: '€16,66',
    savingsVsMonthlyRegular: '€199,98',
  },
} as const;
