// uno.config.ts
import { 
  defineConfig, 
  presetUno, 
  presetAttributify, 
  presetIcons 
} from "unocss";

import { presetWind } from "@unocss/preset-wind3";
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetWind(),
    presetAnimations(),
    presetShadcn(),
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        "(components|src)/**/*.{js,ts}",
      ],
    },
  },
  shortcuts: [
    // [
    //   "btn",
    //   "px-4 py-1 rounded inline-block bg-pink-400 text-white cursor-pointer !outline-none hover:bg-pink-500 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
    // ],
    [
      "icon-btn",
      "text-8 inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:opacity-100",
    ],
  ],
});