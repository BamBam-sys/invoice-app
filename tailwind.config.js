/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      lightBg: '#F8F8FB',
      transparent: 'transparent',
      white: '#fff',
      primary: {
        50: '#7C5DFA',
        100: '#9277FF',
        200: '#DFE3FA',
        300: '#888EB0',
        400: '#7E88C3',
        500: '#858BB2',
        600: '#F9FAFE',
        700: '#FF9797',
      },
      secondary: {
        50: '#1E2139',
        100: '#252945',
        200: '#0C0E16',
        300: '#141625',
        400: '#373B53',
      },
      tertiary: {
        50: '#EC5757',
        100: '#9277FF',
      },
      btn: {
        50: '#F9FAFE',
        100: '#9277FF',
      },
      btnDark: {
        50: '#252945',
        100: '#9277FF',
      },
      accent: {
        green: '#33D69F',
        bgGreen: 'rgba(51,214,159, 0.06)',
        orange: '#FF8F00',
        bgOrange: 'rgba(255,143,0, 0.06)',
        gray: '#373B53',
        bgGray: 'rgba(55,59,83, 0.06)',
        darkBgGray: 'rgba(223,227,250, 0.06)',
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
    extend: {
      boxShadow: {
        one: '0px 10px 20px rgba(72, 84, 159, 0.25)',
        three: '0px 10px 20px rgba(0, 0, 0, 0.25)',
        two: '0px 10px 10px -10px rgba(72, 84, 159, 0.100397)',
        four: '0 0 10px 100vw rgb(0 0 0 / 60%)',
        five: '0px -15px 0px  rgba(0, 0, 0, 0.05);',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('check', '.check &');
    }),
    require('tailwindcss-text-fill'),
  ],
};
