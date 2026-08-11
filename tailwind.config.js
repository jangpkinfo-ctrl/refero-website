/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0dfff',
          200: '#c1bfff',
          300: '#a29eff',
          400: '#837eff',
          500: '#6C63FF',
          600: '#5a52e0',
          700: '#4a43b8',
          800: '#3a3490',
          900: '#2a2568',
        },
        dark: {
          100: '#1a1a2e',
          200: '#2d2d44',
        },
      },
    },
  },
  plugins: [],
}