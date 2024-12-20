/** @type {import('tailwindcss').Config} */
module.exports = {
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
