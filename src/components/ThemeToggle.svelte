<script lang="ts">
    import { writable } from "svelte/store";

    import { IS_SERVER } from "scripts/constants";

    const options = ["Light", "Dark"] as const;

    const initialValue = IS_SERVER
        ? "Dark"
        : (() => {
              const stored = localStorage.theme;
              if (stored && options.includes(stored)) return stored;

              if (window.matchMedia("(prefers-color-scheme: light)").matches)
                  return "Light";
              else return "Dark";
          })();

    const selected = writable(initialValue);
    if (!IS_SERVER) {
        selected.subscribe(v => {
            localStorage.theme = v;
            v = v.toLowerCase();
            const prev = v === "light" ? "dark" : "light";
            document.body.classList.remove(prev);
            document.body.classList.add(v);
        });
    }

    function themeSwitch() {
        selected.update(x => (x = x === "Light" ? "Dark" : "Light"));
    }
</script>

<button on:click={themeSwitch}>
    {#if $selected === "Light"}
        <slot name="dark" />
    {:else if $selected === "Dark"}
        <slot name="light" />
    {/if}
</button>

<style>
    button {
        all: unset;
        cursor: pointer;
    }
    button:focus-visible {
        /* Should stylize this to be less ugly,
           along with other elements - Tyler */
        outline: auto;
    }
    button slot {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        color: var(--fg0);
    }
    button slot {
        color: var(--accent);
    }
</style>
