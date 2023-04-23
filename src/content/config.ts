import { defineCollection, z } from "astro:content";

const faq = defineCollection({
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
