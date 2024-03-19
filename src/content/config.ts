import { defineCollection, reference, z } from "astro:content";

const faq = defineCollection({
    schema: z.object({
        title: z.string(),
        tags: z
            .string()
            .transform(value => value.split(",").map(s => s.trim())),
    }),
});

const docs = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: reference("docCategories"),
        author: z.string().optional(),
        order: z.number().default(1),
    }),
});

const docCategories = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        accent: z.string(),
    }),
});

export const collections = {
    faq,
    docs,
    docCategories,
};
