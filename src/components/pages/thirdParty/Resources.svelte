<script lang="ts">
    import Cards, { ResourceTypes } from "./ResourceCards.svelte";

    import { writable } from "svelte/store";
    import { IS_SERVER } from "scripts/constants";

    export let files;

    const options = ["Plugins", "JS Snippets", "CSS Snippets"] as const;

    const accents: { [option in (typeof options)[number]]: string } = {
        "Plugins": "Blue",
        "JS Snippets": "Yellow",
        "CSS Snippets": "Green",
    };

    const initialValue = "Plugins"

    const selected = writable(initialValue);
    if (!IS_SERVER) selected.subscribe(v => (localStorage.platform = v));
</script>

<div class="container">
    <slot name="title" />
    <nav>
        {#each options as option}
            <label
                class={$selected === option ? "selected" : ""}
                style="--accent: var(--accent{accents[option]})"
            >
                <input
                    type="radio"
                    name="os"
                    bind:group={$selected}
                    value={option}
                />
                {option}
            </label>
        {/each}
    </nav>

    <section>
        {#if $selected === "Plugins"}
            <Cards {files} type={ResourceTypes.Plugin} />
        {:else if $selected === "JS Snippets"}
            <Cards {files} type={ResourceTypes.JS} />
        {:else if $selected === "CSS Snippets"}
            <Cards {files} type={ResourceTypes.CSS} />
        {/if}
    </section>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    nav {
        display: flex;
    }

    label {
        font-size: 1em;
        font-weight: var(--fontWeightSemiBold);
        letter-spacing: 0.02em;

        padding: 0.4em 1.5rem;
        text-align: center;
        cursor: pointer;
        border: 1px solid var(--bg5);
        border-right: none;
        user-select: none;

        background-color: var(--bg2);
    }

    @media screen and (max-width: 600px) {
        label {
            padding: 0.5em 0.75em;
        }
    }

    label:first-child {
        border-radius: 7px 0 0 7px;
    }

    label:last-child {
        border-radius: 0 7px 7px 0;
        border-right: 1px solid var(--bg5);
    }

    label.selected {
        background-color: var(--accent);
        color: var(--bg2);
    }

    input {
        display: none;
    }
</style>