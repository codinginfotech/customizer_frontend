/** @type {import('tailwindcss').Config} */

/**
 * Makely design tokens.
 *
 * The chrome is deliberately neutral and warm (paper / ink) so that the real
 * colour in the product — the garment, the mug, the artwork — is the only
 * saturated thing on screen. A single ember accent carries interaction state.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Ember — the one accent. Used for state, never for large fills. */
        brand: {
          50: '#fdf6f2',
          100: '#fae9de',
          200: '#f3d0ba',
          300: '#e9ae8c',
          400: '#dc8459',
          500: '#cd6435',
          600: '#b94c24',
          700: '#9a3a1e',
          800: '#7c311e',
          900: '#652b1d',
          950: '#37130b'
        },
        /* Warm neutral ramp. Overrides Tailwind's cold gray everywhere. */
        gray: {
          50: '#faf9f7',
          100: '#f4f2ef',
          200: '#e8e4de',
          300: '#d7d1c8',
          400: '#a5a19b',
          500: '#78746e',
          600: '#57534e',
          700: '#413c38',
          800: '#2b2825',
          900: '#1a1816',
          950: '#0f0e0d'
        },
        /* Studio dark ramp (the designer chrome). Warm charcoal, not blue. */
        zinc: {
          50: '#f7f6f4',
          100: '#eeecea',
          200: '#dedbd6',
          300: '#bdb8b1',
          400: '#8f8981',
          500: '#6d6760',
          600: '#524d47',
          700: '#3b3733',
          800: '#272421',
          900: '#181615',
          950: '#100f0e'
        },
        studio: {
          base: '#100f0e',
          chrome: '#191716',
          raised: '#211e1c',
          canvas: '#232120',
          line: 'rgba(255,255,255,0.08)'
        },
        surface: {
          DEFAULT: '#f7f5f2',
          card: '#ffffff',
          sunken: '#f0ede8',
          bone: '#e9e5df'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
        display: ['clamp(2.25rem, 4.6vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.032em' }],
        title: ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }]
      },
      letterSpacing: {
        tightest: '-0.035em',
        label: '0.08em'
      },
      borderRadius: {
        DEFAULT: '5px',
        md: '6px',
        lg: '8px',
        xl: '11px',
        '2xl': '15px',
        '3xl': '22px'
      },
      boxShadow: {
        /* Hairline + soft ambient. No heavy drop shadows anywhere. */
        card: '0 0 0 1px rgba(26,24,22,.06), 0 1px 2px rgba(26,24,22,.04)',
        raised: '0 0 0 1px rgba(26,24,22,.07), 0 2px 4px rgba(26,24,22,.04), 0 8px 20px -8px rgba(26,24,22,.10)',
        panel: '0 0 0 1px rgba(26,24,22,.08), 0 12px 32px -8px rgba(26,24,22,.16)',
        overlay: '0 0 0 1px rgba(26,24,22,.08), 0 24px 60px -12px rgba(26,24,22,.28)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,.6)',
        focus: '0 0 0 2px #ffffff, 0 0 0 4px rgba(205,100,53,.55)'
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(.22,.61,.36,1)',
        spring: 'cubic-bezier(.34,1.4,.64,1)'
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'scale-in': {
          from: { opacity: '0', transform: 'translateY(6px) scale(.985)' },
          to: { opacity: '1', transform: 'none' }
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'none' }
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'bar-grow': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } }
      },
      animation: {
        'fade-in': 'fade-in .18s ease-out both',
        'scale-in': 'scale-in .18s cubic-bezier(.22,.61,.36,1) both',
        'slide-up': 'slide-up .32s cubic-bezier(.22,.61,.36,1) both',
        shimmer: 'shimmer 1.6s infinite'
      },
      spacing: {
        13: '3.25rem',
        18: '4.5rem'
      },
      maxWidth: {
        prose: '68ch',
        container: '1240px'
      }
    }
  },
  plugins: []
};
