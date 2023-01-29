/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './slices/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        erin: {
          primary: '#67e8f9',

          secondary: '#FC3B26',

          accent: '#4C7BA9',

          neutral: '#232C39',

          'base-100': '#F0F1F2',

          info: '#c7d2fe',

          success: '#bbf7d0',

          warning: '#fef08a',

          error: '#fecaca',
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}
