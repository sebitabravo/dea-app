/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {

      background: {
        light: '#FFFFFF',
        light2: '#F9F9F9',
        dark: '#02010a',
      },
      white: '#FFFFFF',
      myYellow: '#F5F378',
      myOrange: '#EC704B',
      myLila: '#DCC1FF',

      myGray: '#171717',
      myGray2: '#272727',
      myGray3: '#212124',
      myGray4: '#181819',
      myGray5: '#111111',
      myGray6: '#232323',
      myBlack: '#1A1A1A',
      myBlack2: '#0D0D0D',
      myBlack3: '#0C0C0C',
      myPink: '#FF8AB5',
      myGreen: '#00B454',

      primaryGray: '#111112',

      transparent: 'transparent',
      current: 'currentColor',
      default: '#71717A',
      primary: '#006FEE',
      primaryLight: '#CCE3FD',
      primaryDark: '#002E62',
      secondary: '#9353D3',
      secondaryLight: '#C9A9E9',
      secondaryDark: '#301050',
      success: '#17C964',
      successLight: '#A2E9C1',
      successDark: '#095028',
      warning: '#EAB308',
      warningLight: '#fde047',
      warningDark: '#ca8a04',
      danger: '#EF4444',
      dangerLight: '#f87171',
      dangerDark: '#991b1b',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      red: colors.red,
      blue: colors.blue,
      indigo: colors.indigo,
      sky: colors.sky,

    },
    extend: {
      // Aquí añadimos la variante personalizada
      textColor: ['children'],
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('children', '& > *'); // Esto añade la variante para hijos directos
    },
  ],
}
