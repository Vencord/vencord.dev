<script context="module" lang="ts">
    export const enum ResourceTypes {
        Plugin = "Plugins",
        JS = "JS Snippets",
        CSS = "CSS Snippets",
    }
</script>

<script lang="ts">
    export let type: ResourceTypes = ResourceTypes.Plugin;
    export let files;

    const resourceMap = {
        [ResourceTypes.Plugin]: files.plugins,
        [ResourceTypes.JS]: files.jsSnippet,
        [ResourceTypes.CSS]: files.cssSnippet,
    };

    let resources = resourceMap[type];

</script>

<section class="resource-cards">
    <section class="resource-grid">
        {#each resources as r}
            <div class="resource">
                <a
                    class="resource-content resource-link"
                    href={`/third-party/${r.default.slug}`}
                >
                    <h3 class="p-label-l">
                        {r.name}
                    </h3>
                    <span class="author ellipsis-overflow">
                        {r.authors.map(a => a.name).join(", ")}
                    </span>
                    <p class="description ellipsis-overflow">
                        {r.description}
                    </p>
                </a>
            </div>
        {/each}
    </section>
</section>



<style>
    .resource-cards {
        margin-top: 1em;
    }

    .buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding: 1em;
        flex-wrap: wrap;
    }

    .buttons a {
        text-decoration: none;
        color: black;
        transition: filter 0.2s ease-in-out;
    }


    h2 {
        margin-block: 0.2em;
        font-size: 2em;
    }

    .resource-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-auto-columns: 1fr;
        grid-gap: 1em;
    }

    @media screen and (max-width: 1200px) {
        .resource-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media screen and (max-width: 800px) {
        .resource-grid {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    .resource {
        display: flex;
        flex-direction: column;
        background: var(--bg4);

        border: 1px solid var(--fg0-muted);

        border-radius: 8px;
        padding: 1em;
        padding-bottom: 2em;

        transition: 200ms box-shadow cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .resource:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .resource-link {
        color: unset;
        text-decoration: unset;
    }

    .resource-screenshot {
        object-fit: cover;
        width: 100%;
        border-radius: 4px;
        margin-bottom: 1em;
    }

    .resource-content {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    h3 {
        margin: 0;
        word-wrap: break-word;
        line-height: normal;
    }

    .resource-badges {
        display: flex;
        gap: 0.5em;

        position: absolute;
        bottom: 1em;
    }

    .ellipsis-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .author {
        white-space: nowrap;
    }

    .author::before {
        content: "by ";
        color: var(--grey2);
    }

    .description {
        font-size: 0.9em;
        filter: brightness(90%);
        margin-bottom: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        box-orient: vertical;
    }

    svg {
        width: 1.5em;
        height: 1.5em;
        shape-rendering: auto;
        color: var(--color);
    }

    .criteria {
        display: flex;
        flex-direction: row;
    }

    @media screen and (max-width: 400px) {
        .criteria {
            flex-direction: column;
        }
    }

    .criteria label {
        display: flex;
        gap: 0.5em;
        flex-direction: row;
        align-items: center;
        white-space: nowrap;
    }

    .criteria label:not(:last-child) {
        margin-right: 1em;
    }

    .search {
        position: relative;
        height: 5em;
    }

    .search :is(svg, input) {
        position: absolute;
    }

    .search svg {
        left: 0.5em;
        top: 2.05em;
        z-index: 2;
        color: var(--grey0);
        height: 1em;
    }

    .search input {
        text-indent: 1.5em;
        background: var(--bg0);
        color: var(--fg0);
        border: none;
        border-radius: 8px;
        box-sizing: border-box;
        width: 100%;
        margin: 1em 0;
        padding: 1em;
    }

    .search input::placeholder {
        color: var(--grey0);
    }

    /* input[type="checkbox"] {
        height: 1em;
        width: 1em;
    } */
</style>