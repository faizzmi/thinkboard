import daisyui from 'daisyui'

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        'page-title': ['1.75rem', { lineHeight: '2.1rem', fontWeight: '700', letterSpacing: '-0.02em' }],
        'section-title': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        'body-sm': ['0.875rem', { lineHeight: '1.35rem' }],
        'caption': ['0.75rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        glass: "1.25rem",
      },
      backdropBlur: {
        glass: "20px",
        "glass-strong": "32px",
      },
      boxShadow: {
        "glass-sm": "0 2px 12px -2px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        glass: "0 8px 32px -4px rgba(0, 0, 0, 0.10), 0 2px 8px -2px rgba(0, 0, 0, 0.06)",
        "glass-lg": "0 16px 48px -8px rgba(0, 0, 0, 0.16), 0 4px 16px -4px rgba(0, 0, 0, 0.08)",
      },
      transitionTimingFunction: {
        glass: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: true,
  },
}