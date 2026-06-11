import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#E0A82E',
          light: '#F0B83C',
          dark: '#C4941A',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          card: '#111111',
          hover: '#181818',
          border: 'rgba(224,168,46,0.15)',
        },
      },
      fontFamily: {
        jakarta: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E0A82E 0%, #F0B83C 100%)',
        'hero-gradient':
          'linear-gradient(135deg, #0a0a0a 0%, #1a1200 50%, #0a0a0a 100%)',
      },
      boxShadow: {
        gold: '0 0 20px rgba(224,168,46,0.25)',
        'gold-lg': '0 0 40px rgba(224,168,46,0.35)',
        card: '0 4px 24px rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(224,168,46,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(224,168,46,0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
