import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";

const site = "https://vencord.vendicated.dev";

// https://astro.build/config
export default defineConfig({
    site,
    vite: {
        build: {
            sourcemap: true,
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
    adapter: vercel(),
});
