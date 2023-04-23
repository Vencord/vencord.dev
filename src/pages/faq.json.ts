import { APIRoute } from "astro";
import { getSortedFaq } from "scripts/collections";

export const prerender = true;

export const get: APIRoute = async ctx => {
    const faq = (await getSortedFaq()).map(
        ({ data: { title, tags }, body }) => ({
            question: title,
            // fix [text](/relativeurl) to have full urls
            answer: body.replace(
                /\[(.+?)\]\((\/.+?)\)/g,
                `[$1](${ctx.url.origin}$2)`
            ),
            tags: tags,
        })
    );

    return {
        body: JSON.stringify(faq),
    };
};
