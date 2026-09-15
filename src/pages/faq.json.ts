import type { APIRoute } from "astro";
import { getSortedCollection } from "@scripts/collections";

export const prerender = true;

export const GET: APIRoute = async ctx => {
    const collections = await Promise.all([
        getSortedCollection("support"),
        getSortedCollection("faq"),
    ]);

    const faq = collections.flatMap(c =>
        c.map(({ data: { title, tags }, body }) => ({
            question: title,
            // fix [text](/relativeurl) to have full urls
            answer: (body ?? "").replace(
                /\[(.+?)\]\((\/.+?)\)/g,
                `[$1](${ctx.url.origin}$2)`
            ),
            tags: tags,
        }))
    );

    return new Response(JSON.stringify(faq), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
};
