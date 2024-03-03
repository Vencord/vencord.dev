<script context="module" lang="ts">
    export const enum ResourceTypes {
        Plugin = "Plugins",
        JS = "JS Snippets",
        CSS = "CSS Snippets",
    }
</script>

<script lang="ts">
    import type { MutualResource, PluginData } from "scripts/types";

    export let type: ResourceTypes = ResourceTypes.Plugin;
    export let files;
    const resourceMap = {
        [ResourceTypes.Plugin]: files.plugins,
        [ResourceTypes.JS]: files.jsSnippet,
        [ResourceTypes.CSS]: files.cssSnippet,
    };

    let resources = resourceMap[type];

    const criteria = [
        {
            name: "Desktop",
            state: false,
            check: (p: PluginData) => p.target !== "web",
        },
        {
            name: "Web",
            state: false,
            check: (p: PluginData) => p.target === "web",
        },
    ];

    let filter = "";
    $: lowerFilter = filter.toLowerCase();
    $: filteredResources = resources.filter(r => {
        for (const c of criteria) {
            if (c.state && !c.check(r)) return false;
        }

        if (r.name.toLowerCase().includes(lowerFilter)) return true;
        if (r.description.toLowerCase().includes(lowerFilter)) return true;
        if (r.authors.some(a => a.name.toLowerCase().includes(lowerFilter)))
            return true;
        return false;
    });

    function highlightMatches(text: string) {
        if (!filter) return text;

        return text.replace(
            new RegExp(filter, "gi"),
            match => `<mark>${match}</mark>`
        );
    }

    function overflowTooltips(node: HTMLElement, _: MutualResource) {
        const applyTitle = () => {
            const hasOverflow =
                node.scrollWidth > node.clientWidth ||
                (!node.classList.contains("author") &&
                    node.scrollHeight > node.clientHeight);

            node.title = hasOverflow ? node.textContent! : "";
        };

        applyTitle();
        return {
            update() {
                applyTitle();
            },
        };
    }
</script>

<section class="resource-cards">

    <section>
        <h2>Filter</h2>

        <div class="criteria">
            {#each criteria as c}
                <label>
                    <input type="checkbox" bind:checked={c.state} />
                    {c.name}
                </label>
            {/each}
        </div>

        <div class="search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    fill="currentColor"
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                />
            </svg>
            <input
                type="text"
                placeholder="Search by Name, Author or Description..."
                bind:value={filter}
            />
        </div>
    </section>

    <section class="resource-grid">
        {#each filteredResources as r}
            <div class="resource">
                <a
                    class="resource-content resource-link"
                    href={`/third-party/${r.default.slug}`}
                >
                    <h3 class="p-label-l">
                        {@html highlightMatches(r.name)}
                    </h3>
                    <span
                        use:overflowTooltips={r} 
                        class="author ellipsis-overflow"
                    >
                        {@html highlightMatches(r.authors.map(a => a.name).join(", "))}
                    </span>
                    <p
                        use:overflowTooltips={r}
                        class="description ellipsis-overflow"
                    >
                        {@html highlightMatches(r.description)}
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

    input[type="checkbox"] {
        height: 1em;
        width: 1em;
    }
</style>