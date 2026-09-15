import { getCollection, type CollectionKey } from "astro:content";

export async function getSortedCollection(name: CollectionKey) {
    const faq = await getCollection(name);

    // uses the fact that parseInt("11_some_title.md") => 11
    faq.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    return faq;
}
