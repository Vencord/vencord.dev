<script lang="ts">
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";

    import { IS_SERVER } from "../../../scripts/constants";

    const accents: { [option in (typeof options)[number]]: string } = {
        Windows: "Blue",
        Linux: "Green",
        Mac: "Yellow",
        Browser: "Orange",
    };
    const options = ["Windows", "Linux", "Mac", "Browser"] as const;

const isWindows = () => navigator.userAgent.toLowerCase().includes("win");
const isMac = () => navigator.userAgent.toLowerCase().includes("mac");
const isLinux = () => navigator.userAgent.toLowerCase().includes("linux");

const getPlatform = () => {
  if (isWindows()) return "Windows";
  if (isMac()) return "Mac";
  if (isLinux()) return "Linux";
  return "Browser";
};

const initialValue = IS_SERVER ? "Windows" : getPlatform();
const selected = writable(initialValue);
if (!IS_SERVER) selected.subscribe(v => (localStorage.platform = v));

</script>

<div class="download-container">
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
    .download-container {
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        }

    nav {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: .8rem;
    }
    @media (min-width: 768px) {
        nav{
            gap: 1rem;
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
}
    section {
        width: 100%;
        box-sizing: border-box;
        background-color: var(--bgCurrentWord);
        padding: 1rem;
        border-radius: .5rem;
    }

    label {
        font-size: 1em;
        font-weight: var(--fontWeightSemiBold);
        letter-spacing: 0.02em;
        padding: 1.25em 1.5rem;
        text-align: center;
        cursor: pointer;
        border: 1px solid var(--bg5);
        border-radius: 1rem;
        background-color: var(--bg3);
        margin-bottom: 1rem;
        transition: background 250ms;
    }
    label:hover{
        background: var(--bg2);
    }

    @media screen and (max-width: 600px) {
        label {
            padding: 0.5em 0.75em;
        }
    }

    label.selected {
        background-color: var(--accent);
        color: var(--bg2);
    }

    input {
        display: none;
    }
</style>
