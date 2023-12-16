<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";

    export let initialPlatform;

    const options = ["Windows", "Linux", "Mac", "Browser"] as const;

    const parsePlatform = (platform: string): (typeof options)[number] => {
        if (platform.includes("linux")) return "Linux";
        if (platform.includes("mac")) return "Mac";
        if (platform.includes("win")) return "Windows";
        return "Browser";
    };

    const accents: { [option in (typeof options)[number]]: string } = {
        Windows: "Blue",
        Linux: "Green",
        Mac: "Yellow",
        Browser: "Orange",
    };

    const selected = writable<string | null>(
        initialPlatform ? parsePlatform(initialPlatform.toLowerCase()) : null
    );

    onMount(() => {
        const getInitialPlatform = (): string => {
            const platform = navigator.platform.toLowerCase();
            return parsePlatform(platform);
        };

        if (!$selected) {
            selected.set(getInitialPlatform());
        }
        selected.subscribe(v => {
            document.cookie = `platform=${v}; path=/; max-age=2147483647`;
        });
    });
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
        <!-- grrr <slot> name cannot be dynamic -->
        {#if !$selected}
            <div in:fade={{ duration: 150 }}>
                <slot name="windowsTabPlaceholder" />
            </div>
        {:else if $selected === "Windows"}
            <div in:fade={{ duration: 150 }}>
                <slot name="windowsTab" />
            </div>
        {:else if $selected === "Linux"}
            <div in:fade={{ duration: 150 }}>
                <slot name="linuxTab" />
            </div>
        {:else if $selected === "Mac"}
            <div in:fade={{ duration: 150 }}>
                <slot name="macTab" />
            </div>
        {:else if $selected === "Browser"}
            <div in:fade={{ duration: 150 }}>
                <slot name="browserTab" />
            </div>
        {/if}
    </section>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    nav {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
    }

    section {
        width: 100%;
        box-sizing: border-box;
        background-color: var(--bgCurrentWord);
        padding: 1rem;

        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    label {
        font-size: 1em;
        font-weight: var(--fontWeightSemiBold);
        letter-spacing: 0.02em;

        padding: 1.25em 1.5rem;
        text-align: center;
        cursor: pointer;
        border: 1px solid var(--bg5);
        border-right: none;

        background-color: var(--bg2);
    }

    @media screen and (max-width: 600px) {
        label {
            padding: 0.5em 0.75em;
        }
    }

    label:first-child {
        border-top-left-radius: 4px;
    }

    label:last-child {
        border-top-right-radius: 4px;
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
