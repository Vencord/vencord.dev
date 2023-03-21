import { APIRoute } from "astro";
import { getSortedFaq } from "../scripts/collections";

export const get: APIRoute = async (ctx) => {
    const faq = (await getSortedFaq())
        .map(i => ({
            question: i.data.title,
            answer: i.body
        }));

    return {
        body: JSON.stringify(faq)
    };
};
