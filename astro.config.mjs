import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import cloudflare from "@astrojs/cloudflare";
const site = "https://vencord.dev";

// https://astro.build/config
export default defineConfig({
    site,
    vite: {
        build: {
            sourcemap: true,
        },
    },
    markdown: {
        shikiConfig: {
            theme: "css-variables",
        },
    },
    integrations: [
        mdx(),
        sitemap({
            customPages: [site + "/discord", site + "/github"],
        }),
        svelte(),
    ],
    output: "server",
    adapter: cloudflare(),
});
