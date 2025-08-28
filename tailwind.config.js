/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      textShadow: {
        'glow-purple': '0 0 5px rgba(192, 132, 252, 0.5), 0 0 10px rgba(192, 132, 252, 0.5), 0 0 20px rgba(192, 132, 252, 0.4), 0 0 40px rgba(129, 140, 248, 0.4), 0 0 80px rgba(99, 102, 241, 0.3)',
      },
      colors: {
        'galaxy': {
          '900': '#0f0f1a',
          '800': '#1a1a2e',
          '700': '#16213e',
          '600': '#1f4068',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-textshadow'),
  ],
}
