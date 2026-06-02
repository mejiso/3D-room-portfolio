import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#16181d',
        paper: '#f8f4ec',
        moss: '#586b4f',
        coral: '#d96b5f',
        teal: '#2d7d83',
      },
      boxShadow: {
        modal: '0 24px 80px rgba(22, 24, 29, 0.28)',
      },
    },
  },
  plugins: [],
} satisfies Config;
