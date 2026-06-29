/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif TC"', 'Georgia', 'serif'],
      },
      colors: {
        parchment: {
          50: '#FDF8EF',
          100: '#F2EBE0',
          200: '#DDD0BC',
          300: '#A8906E',
          400: '#7A5C3E',
          500: '#2C1A0E',
        },
        gold: {
          DEFAULT: '#8B6418',
          dark: '#C9A84C',
        },
      },
    },
  },
  plugins: [],
}
