import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      text: 'hsl(0, 0%, 100%)',
      textSecondary: 'hsl(240, 1%, 62%)',
      nav: 'hsl(240, 20%, 2%, 80%)',
      plan: 'hsl(0, 0%, 100%, 1%)',

      'white-500': 'hsl(0, 0%, 90%)',
      'white-500-5': 'hsl(0, 0%, 90%, 5%)',
      'white-600': 'hsl(0, 0%, 85%)',
      'white-700': 'hsl(0, 0%, 80%)',
      'white-800': 'hsl(0, 0%, 75%)',
      'white-900': 'hsl(0, 0%, 70%)',

      'grey-500': 'hsl(0, 0%, 38%)',

      'black-100': 'hsl(240, 12%, 19%)',
      'black-200': 'hsl(240, 12%, 17%)',
      'black-300': 'hsl(240, 12%, 15%)',
      'black-400': 'hsl(240, 12%, 13%)',
      'black-500': 'hsl(240, 12%, 11%)',
      'black-600': 'hsl(240, 12%, 9%)',
      'black-700': 'hsl(240, 12%, 7%)',
      'black-800': 'hsl(240, 12%, 5%)',
      'black-900': 'hsl(240, 12%, 2%)',

      'purple-100': 'hsl(245, 83%, 83%)',
      'purple-200': 'hsl(245, 83%, 78%)',
      'purple-300': 'hsl(245, 83%, 73%)',
      'purple-400': 'hsl(245, 83%, 68%)',
      'purple-500': 'hsl(245, 83%, 63%)',
      'purple-500-10': 'hsl(245, 83%, 63%, 10%)',
      'purple-600': 'hsl(245, 73%, 58%)',
      'purple-700': 'hsl(245, 63%, 53%)',
      'purple-800': 'hsl(245, 53%, 48%)',
      'purple-900': 'hsl(245, 43%, 43%)',

      'ultrablue': 'hsl(245, 83%, 53%)',
    },
    extend: {},
  },
  plugins: [],
}
export default config