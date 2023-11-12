import { copyFileSync, writeFileSync, readFileSync } from "fs";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import cloudflare from "@astrojs/cloudflare";

const site = "https://vencord.dev";

// canvaskit has code like
// `if (runtimeCheck) { nodeCode } else { browserCode }`
// which makes the bundler choke on require of node inbuilts
// this patches canvaskit to change it to `if (false) { nodeCode } else { browserCode }`
if (process.env.IS_PROD_BUILD) {
    let wasmKitJs = readFileSync(
        "./node_modules/canvaskit-wasm/bin/canvaskit.js",
        "utf-8"
    );
    wasmKitJs = wasmKitJs.replace(
        /if\(.{0,3}\)(?={var fs=require\("fs"\))/,
        "if(false)"
    );
    writeFileSync("./node_modules/canvaskit-wasm/bin/canvaskit.js", wasmKitJs);
}

copyFileSync(
    "./node_modules/canvaskit-wasm/bin/canvaskit.wasm",
    "./public/canvaskit.wasm"
);

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
