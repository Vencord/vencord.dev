import { defineCollection, z } from "astro:content";

const faq = defineCollection({
    schema: z.object({
        title: z.string(),
    })
});

export const collections = {
    faq
};
