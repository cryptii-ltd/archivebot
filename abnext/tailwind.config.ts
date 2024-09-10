import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      accent: 'hsl(234, 70%, 58%)',

      nav: 'hsl(240, 13%, 3%, 80%)',

      sectionDark: 'hsl(240, 13%, 3%)',
      sectionDarkText: 'hsl(0, 0%, 100%)',
      sectionDarkTextSecondary: 'hsl(240, 1%, 62%)',
      sectionLight: 'hsl(0, 0%, 96%)',
      sectionLightText: 'hsl(0, 0%, 9%)',

      badge: 'hsl(0, 0%, 100%, 5%)',

      buttonPrimary: 'hsl(0, 0%, 85%)',
      buttonPrimaryText: 'hsl(246, 17%, 12%)',
      buttonSecondary: 'hsl(0, 0%, 100%, 5%)',
      buttonSecondaryText: 'hsl(0, 0%, 80%)',
      buttonInvertedSecondary: 'hsl(0, 0%, 0%, 10%)',
      buttonInvertedSecondaryText: 'hsl(240, 1%, 42%)',
      buttonInvertedPrimaryText: 'hsl(0, 0%, 100%)',

      glassSurfaceHighlightBorder: 'hsl(0, 0%, 100%, 35%)'
    },
    extend: {},
  },
  plugins: [],
}
export default config