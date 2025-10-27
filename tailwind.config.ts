import type { Config } from 'tailwindcss'
export default {
  darkMode: ['class'],
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { bg: '#0b0f1a', fg: '#e6edf7', muted: '#9aa6b2' },
      boxShadow: { glow: '0 10px 30px rgba(0,0,0,0.4)' }
    }
  },
  plugins: []
} satisfies Config
