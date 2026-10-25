/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-black': '#121212',
        'color-white': '#ffffff',
        'color-yellow': '#ffe68c',
        'color-green': '#a0e8a0',
        'color-blue': '#9ddcff',
        'color-cream': '#faf8f2',
        'color-pink': '#ffc5d3',
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        'primary': ['"Instrument Serif"', 'serif'],
        'secondary': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '32px',
        'xl': '48px',
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-sm': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-lg': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-xl': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-hover': '1px 1px 0px 0px rgba(0, 0, 0, 1)',
      }
    },
  },
  plugins: [],
};
