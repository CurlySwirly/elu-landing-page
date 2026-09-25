export const EXPERT_PRICING = {
  introEndsAt: '2026-12-31',
  introEndsLabel: '31. Dezember 2026',
  introSlots: 50,
  starter: {
    feePercent: '15 %',
    freeBookings: 3,
  },
  monthly: {
    regular: '€99,99',
    intro: '€19,99',
    period: 'Monat',
  },
  yearly: {
    regular: '€999,90',
    intro: '€199,90',
    period: 'Jahr',
    savingsVsMonthlyRegular: '€199,98',
  },
} as const;
