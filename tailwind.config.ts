import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        fsr: {
          DEFAULT: "hsl(var(--fsr1) / <alpha-value>)",
          foreground: "hsl(var(--fsr2) / <alpha-value>)",
          // Bordeaux unabhängig vom Theme, für gefüllte Flächen mit weißer Schrift
          deep: "hsl(350 63% 41% / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Hero-Einstiege (components/motion/enter.tsx)
        // "enter" ist schon von tailwindcss-animate belegt
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(0.25em)", clipPath: "inset(100% -10% 0 -10%)" },
          to: { opacity: "1", transform: "none", clipPath: "inset(-25% -10% -25% -10%)" },
        },
        "pop-in": {
          from: { opacity: "0", transform: "scale(0.85) rotate(-14deg)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        rise: "rise 0.85s cubic-bezier(0.22,1,0.36,1) both",
        "pop-in": "pop-in 0.9s cubic-bezier(0.34,1.56,0.64,1) both",
      },
    },
  },

  safelist: [
    'backdrop-blur-xl', // Füge diese Zeile hinzu, falls purge das Entfernen erzwingt
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config