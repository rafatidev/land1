import type { Config } from 'tailwindcss'
// FIX: Changed `require` to `import` to be compliant with TypeScript module syntax.
import tailwindcssRtl from 'tailwindcss-rtl';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssRtl,
  ],
}
export default config