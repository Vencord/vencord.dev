<script lang="ts">
    import { PluginData } from "scripts/types";

    export let plugins: PluginData[];
</script>

<div>
    <!--
    <section>
        <h2>Filter</h2>
    </section>
    -->

    <section class="plugins-grid">
        {#each plugins as p}
            <div class="plugin">
                <!--
                    <img src={plugin.screenshot || "/assets/screenshot-placeholder.png"} class="plugin-screenshot" />
                -->
                <section class="plugin-content">
                    <span class="p-label-l">{p.name}</span>
                    <div class="author">
                        <span class="by">by</span>
                        <span class="author">
                            {p.authors.map(a => a.name).join(", ")}
                        </span>
                    </div>
                    <p class="description">{p.description}</p>

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
        grid-auto-rows: 1fr;
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
        display: flex;

        color: var(--grey1);
    }

    .by {
        color: var(--grey0);
        margin-right: 0.25em;
    }

    .description {
        font-size: 0.9em;
        filter: brightness(90%);
        margin-bottom: 0;
    }

    svg {
        width: 1.5em;
        height: 1.5em;
        shape-rendering: auto;
        color: var(--color);
    }
</style>
