import { defineCollection, reference, z } from "astro:content";

const faq = defineCollection({
    schema: z.object({
        title: z.string(),
        tags: z
            .string()
            .transform(value => value.split(",").map(s => s.trim())),
    }),
});

/*
title: "Album as Spotify Controls Background"
description: "Use album cover as SpotifyControls background"
author: Ethan, ImSkully
target: "discordDesktop"
github: "https://ethan-davies.co.uk"
*/

const thirdParty = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        target: z.string(),
        type: z.string(),
        author: z.string().optional(),
    }),
});

export const collections = {
    faq,
    thirdParty,
};
