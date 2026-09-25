/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: '#F4F6FB',
        dark: '#292B27',
        brand: '#6D8EEC',
        lime: '#BADE4F',
        ice: '#E2E8FB',
      },
    },
  },
  plugins: [],
};
