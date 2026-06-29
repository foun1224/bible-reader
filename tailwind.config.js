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
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.4s ease-out forwards',
        'pulse': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
}
