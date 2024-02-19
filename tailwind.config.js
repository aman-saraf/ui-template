const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '1024px',
      md: '1024px',
      lg: '1024px',
      xl: '1024px',
      '2xl': '1024px',
      '3xl': '1024px',
    },
    fontSize: {
      '2xs': '8px',
      '1xs': '10px',
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '3.5xl': '44px',
      '4xl': '48px',
      '5xl': '64px,',
    },
    extend: {
      colors: {
        primary: {
          100: '#DBDEF5',
          DEFAULT: '#4d61fc',
        },
        secondary: {
          DEFAULT: '#0f897c',
        },
        success: colors.green[700],
      },
    }
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require('tailwind-capitalize-first-letter')],
}
