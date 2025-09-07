/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Keep dark mode based on class
  theme: {
    extend: {
      colors: {
        // Core palette
        'cosmic-dark': '#0a0a14',
        'cosmic-light': '#e0e0ff',
        'space-blue': {
          DEFAULT: '#1e3a8a',
          light: '#2563eb',
          dark: '#1e40af',
        },
        // Neon accents
        'neon-purple': '#a855f7',
        'neon-teal': '#2dd4bf',
        'neon-blue': '#38bdf8',
        'glow-start': '#f472b6',
        'glow-end': '#a78bfa',
      },
      fontFamily: {
        'sans': ['Rajdhani', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'mono': ['Source Code Pro', 'monospace'],
      },
      keyframes: {
        // For cinematic intro text
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // For starfield background
        'star-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        // For floating elements
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        // For glowing CTA button
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px 5px rgba(168, 85, 247, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 30px 10px rgba(168, 85, 247, 0.5)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'star-flicker': 'star-flicker 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      textShadow: {
        'glow-neon': '0 0 5px #a855f7, 0 0 10px #a855f7, 0 0 20px #a855f7',
        'glow-white': '0 0 8px rgba(255, 255, 255, 0.8)',
      },
      // For custom theme variants
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.cosmic-light'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.cosmic-light'),
            '--tw-prose-links': theme('colors.neon-teal'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.cosmic-light'),
            '--tw-prose-bullets': theme('colors.neon-purple'),
            '--tw-prose-hr': theme('colors.space-blue.dark'),
            '--tw-prose-quotes': theme('colors.cosmic-light'),
            '--tw-prose-quote-borders': theme('colors.neon-purple'),
            '--tw-prose-captions': theme('colors.cosmic-light'),
            '--tw-prose-code': theme('colors.neon-teal'),
            '--tw-prose-pre-code': theme('colors.neon-teal'),
            '--tw-prose-pre-bg': theme('colors.cosmic-dark'),
            '--tw-prose-th-borders': theme('colors.space-blue.dark'),
            '--tw-prose-td-borders': theme('colors.space-blue.dark'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-textshadow'),
  ],
}
