import { APIRoute } from "astro";
import { getSortedFaq } from "../scripts/collections";

export const prerender = true;

export const get: APIRoute = async (ctx) => {
    const faq = (await getSortedFaq())
        .map(i => ({
            question: i.data.title,
            // fix [text](/relativeurl) to have full urls
            answer: i.body.replace(/\[(.+?)\]\((\/.+?)\)/g, `[$1](${ctx.url.origin}$2)`)
        }));

    return {
        body: JSON.stringify(faq)
    };
};
