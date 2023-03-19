<script lang="ts">
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";

    import { IS_SERVER } from "../../scripts/constants";

    const options = ["Windows", "Linux", "Mac", "Browser"] as const;

    const initialValue = IS_SERVER
        ? "windows"
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
            <label class={$selected === option ? "selected" : ""}>
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
        align-items: center;
    }

    nav {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
    }

    section {
        width: 100%;
        box-sizing: border-box;
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-top: none;
        padding: 1rem;
    }

    label {
        padding: 0.7rem 0rem;
        text-align: center;
        cursor: pointer;

        background-color: black;
        color: white;
    }

    label.selected {
        background-color: lightpink;
        color: black;
    }

    input {
        display: none;
    }
</style>
