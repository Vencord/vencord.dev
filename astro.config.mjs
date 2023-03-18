import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://vencord.vendicated.dev",
  vite: {
    build: {
      sourcemap: true
    }
  },
  integrations: [mdx(), sitemap()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});