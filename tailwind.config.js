/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#09090b',
        surface: '#101012',
        'surface-2': '#17171a',
        line: 'rgba(255,255,255,0.08)',
        'line-strong': 'rgba(255,255,255,0.16)',
        primary: '#ff6a00',
        'primary-soft': '#ffb066',
        fg: '#f5f5f4',
        muted: '#a3a3a3',
        dim: '#6b6b70',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: { wrap: '76rem' },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,106,0,0.35), 0 12px 48px -12px rgba(255,106,0,0.45)',
        card: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 24px 64px -32px rgba(0,0,0,0.8)',
      },
      letterSpacing: { tightest: '-0.045em' },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
}
