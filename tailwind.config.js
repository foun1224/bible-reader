/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif TC"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
