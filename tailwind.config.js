/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Rose sakura (fleur de cerisier) — remplace l'ancien doré.
        // La clé reste "gold" pour rester compatible avec toutes les classes existantes.
        gold: {
          DEFAULT: '#f19bb3',
          light: '#ffc9dc',
          dark: '#c76f92',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#242424',
          500: '#2e2e2e',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
}
