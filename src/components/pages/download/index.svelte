<script lang="ts">
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";

    import { IS_SERVER } from "scripts/constants";

    const options = ["Windows", "Linux", "Mac", "Browser"] as const;

    const accents: { [option in (typeof options)[number]]: string } = {
        Windows: "Blue",
        Linux: "Green",
        Mac: "Yellow",
        Browser: "Orange",
    };

    const initialValue = IS_SERVER
        ? "Windows"
        : (() => {
              const stored = localStorage.platform;
              if (stored && options.includes(stored)) return stored;

              const platform = navigator.platform.toLowerCase();
              if (platform.includes("linux")) return "Linux";
              if (platform.includes("mac")) return "Mac";
              return "Windows";
          })();

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
        <!-- grrr <slot> name cannot be dynamic -->
        {#if $selected === "Windows"}
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
