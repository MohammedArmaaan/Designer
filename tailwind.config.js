/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f4f1ea',
        ink: '#0a0a0a',
        ember: {
          DEFAULT: '#ff4d1c',
          soft: '#ff6a3d',
          deep: '#d63a10',
        },
        sand: '#e8e2d4',
        stone: '#9a9489',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.2em',
      },
    },
  },
  plugins: [],
};
