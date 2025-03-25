/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Uthman Taha"', 'Amiri', 'Scheherazade', 'Mothanna', 'Traditional Arabic', 'sans-serif'], // Arabic fonts
        english: ['Merriweather', 'Lora', 'Roboto', 'Open Sans', 'Georgia', 'serif'], // English fonts
      },
    },
  },
  plugins: [],
}
