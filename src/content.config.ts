import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faq = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
    schema: z.object({
        title: z.string(),
        tags: z
            .string()
            .transform(value => value.split(",").map(s => s.trim())),
    }),
});

export const collections = {
    faq,
};
