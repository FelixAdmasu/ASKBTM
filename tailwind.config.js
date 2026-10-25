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
        stone: {
          950: '#0c0a09',
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #1c1917',
        'brutal-sm': '2px 2px 0px 0px #1c1917',
        'brutal-lg': '6px 6px 0px 0px #1c1917',
        'brutal-xl': '8px 8px 0px 0px #1c1917',
        'brutal-hover': '1px 1px 0px 0px #1c1917',
      }
    },
  },
  plugins: [],
};
