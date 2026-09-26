/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: '#0B0E14',
        foreground: '#F8FAFC',
        card: {
          DEFAULT: '#151B28',
          foreground: '#F8FAFC'
        },
        popover: {
          DEFAULT: '#151B28',
          foreground: '#F8FAFC'
        },
        primary: {
          DEFAULT: '#00C26F',
          foreground: '#0B0E14',
          hover: '#00A859'
        },
        secondary: {
          DEFAULT: '#1E2638',
          foreground: '#CBD5E1'
        },
        muted: {
          DEFAULT: '#111622',
          foreground: '#94A3B8'
        },
        accent: {
          DEFAULT: '#1B2334',
          foreground: '#00C26F'
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF'
        },
        border: '#222B3D',
        input: '#1E2638',
        ring: '#00C26F',
        stockbit: {
          500: '#00C26F',
          600: '#00A859',
        }
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      }
    }
  },
  plugins: [],
}