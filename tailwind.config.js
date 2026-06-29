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
        stone: {
          50:  '#F5F2EC',
          100: '#E8E4DB',
          200: '#D4CEC4',
          300: '#A09890',
          400: '#6B6460',
          500: '#2A2725',
        },
        sage: {
          DEFAULT: '#4F7358',
          dark: '#7AAF87',
        },
        celebration: {
          DEFAULT: '#C17D3A',
          dark: '#D4935C',
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
