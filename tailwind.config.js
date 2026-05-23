/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['EB Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          50:  '#e8eef7',
          100: '#c5d4ee',
          200: '#9db6e2',
          300: '#6a90d1',
          400: '#3d6fbf',
          500: '#1a3a6b',
          600: '#152f58',
          700: '#102244',
          800: '#0a1630',
          900: '#050b1c',
        },
        forest: {
          50:  '#e4f5ed',
          100: '#b0dfc5',
          200: '#7ac8a0',
          300: '#3dae76',
          400: '#0d9455',
          500: '#0d6b3a',
          600: '#0a5630',
          700: '#074025',
          800: '#042b19',
          900: '#02150d',
        },
        cream: '#faf8f5',
        rose: {
          gold: '#b76e79',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
