import type { Config } from "tailwindcss";
import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
      },
      fontFamily:{
        "youtube" : "var(--font-youtube)"
      }
    },
  },
  plugins: [
    lineClamp

  ],
} satisfies Config;
