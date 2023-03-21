import { getCollection } from "astro:content";

export async function getSortedFaq() {
    const faq = await getCollection("faq");

    // uses the fact that parseInt("11_some_title.md") => 11
    faq.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    return faq;
}
