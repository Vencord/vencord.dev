<script lang="ts">
    import type { PluginData } from "scripts/types";

    export let plugins: PluginData[];

    const criteria = [
        {
            name: "Has Commands",
            state: false,
            check: (p: PluginData) => p.hasCommands,
        },
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
    $: filteredPlugins = plugins.filter(p => {
        for (const c of criteria) {
            if (c.state && !c.check(p)) return false;
        }

        if (p.name.toLowerCase().includes(lowerFilter)) return true;
        if (p.description.toLowerCase().includes(lowerFilter)) return true;
        if (p.authors.some(a => a.name.toLowerCase().includes(lowerFilter)))
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
</script>

<div>
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

        <input
            type="text"
            placeholder="Search by Name, Author or Description..."
            bind:value={filter}
        />
    </section>

    <section class="plugins-grid">
        {#each filteredPlugins as p}
            <div class="plugin">
                <!--
                    <img src={plugin.screenshot || "/assets/screenshot-placeholder.png"} class="plugin-screenshot" />
                -->
                <section class="plugin-content">
                    <span class="p-label-l"
                        >{@html highlightMatches(p.name)}</span
                    >
                    <span class="author"
                        >{@html highlightMatches(
                            p.authors.map(a => a.name).join(", ")
                        )}</span
                    >
                    <p class="description">
                        {@html highlightMatches(p.description)}
                    </p>

                    <!--
                        <span class="plugin-badges">
                            {plugin.required && (
                                <Icon
                                    name="fa-solid:asterisk"
                                    title="Required"
                                />
                            )}
                            {(plugin.required ||
                                plugin.enabledByDefault) && (
                                <Icon
                                    name="fa-solid:plug"
                                    title="Enabled by default"
                                />
                            )}
                            {plugin.hasCommands && (
                                <Icon
                                    name="fa-solid:terminal"
                                    title="Has commands"
                                />
                            )}
                            {plugin.target === "desktop" && (
                                <Icon
                                    name="fa-solid:desktop"
                                    title="Desktop only"
                                />
                            )}
                            {plugin.target === "web" && (
                                <Icon
                                    name="fa-solid:globe"
                                    title="Web only"
                                />
                            )}
                            {plugin.target === "dev" && (
                                <Icon
                                    name="fa-solid:code"
                                    title="Dev only"
                                />
                            )}
                        </span>
                    -->
                </section>
            </div>
        {/each}
    </section>
</div>

<style>
    .plugins-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-auto-columns: 1fr;
        grid-gap: 1em;
    }

    @media screen and (max-width: 1200px) {
        .plugins-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media screen and (max-width: 800px) {
        .plugins-grid {
            grid-template-columns: 1fr;
        }
    }

    .plugin {
        display: flex;
        flex-direction: column;
        position: relative;
        background: var(--bg4);

        border-radius: 12px;
        padding: 1em;
        padding-bottom: 2em;

        transition: 200ms box-shadow cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .plugin:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .plugin-screenshot {
        object-fit: cover;
        width: 100%;
        border-radius: 4px;
        margin-bottom: 1em;
    }

    .plugin-content {
        display: flex;
        flex-direction: column;
    }

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .plugin-badges {
        display: flex;
        gap: 0.5em;

        position: absolute;
        bottom: 1em;
    }

    .author {
        color: var(--grey1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .author::before {
        content: "by ";
        color: var(--grey0);
    }

    .by {
        color: var(--grey0);
        margin-right: 0.25em;
    }

    .description {
        font-size: 0.9em;
        filter: brightness(90%);
        margin-bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
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

    input[type="text"] {
        box-sizing: border-box;
        width: 100%;
        margin: 1em 0;
        padding: 1em;
    }

    .criteria {
        display: flex;
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
</style>
