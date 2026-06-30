/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"TASA Orbiter"', '"Noto Sans TC"', 'sans-serif'],
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
        read: { DEFAULT: '#D8CEC2', dark: '#3A3026' },
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInScale: { '0%': { opacity: '0', transform: 'scale(0.75)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        bounceOnce: { '0%': { transform: 'translateY(0)' }, '35%': { transform: 'translateY(-10px)' }, '60%': { transform: 'translateY(-5px)' }, '80%': { transform: 'translateY(-2px)' }, '100%': { transform: 'translateY(0)' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(14px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        streakPulse: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.55' } },
      },
      animation: {
        'pop-in': 'pop-in 0.4s ease-out forwards',
        'pulse': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        fadeInScale: 'fadeInScale 0.3s ease-out',
        bounceOnce: 'bounceOnce 0.55s ease-out',
        slideUp: 'slideUp 0.25s ease-out',
        streakPulse: 'streakPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
