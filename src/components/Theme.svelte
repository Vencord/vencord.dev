<script lang="ts">
    import { writable } from "svelte/store";

    import { IS_SERVER } from "../scripts/constants";

    const options = ["Light", "Dark"] as const;

    const initialValue = IS_SERVER
        ? "Dark"
        : (() => {
            const stored = localStorage.theme;
            if (stored && options.includes(stored)) return stored;

            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light').matches)
                return "Light";
            else return "Dark";
          })();
    
    const selected = writable(initialValue);
    let first = true;
    // Note - Theme switcher does not work on dev mode
    if (!IS_SERVER) {
        selected.subscribe(v => {
            localStorage.theme = v;
            v = v.toLowerCase();
            const prev = (v === "light") ? "dark" : "light";
            if (first) {
                document.body.classList.add(v);
                first = false;
            }
            else document.body.classList.replace(prev, v);
        });
    }

    function themeSwitch() {
        selected.update(x => x = (x === "Light") ? "Dark" : "Light");
    }
</script>

<!-- Probably not the best way to go about this tbh -->
<button on:click={themeSwitch} title="Switch to Dark">
    {#if $selected === "Light"}
        <slot name="light"/>
    {:else if $selected === "Dark"}
        <slot name="dark"/>
    {/if}
</button>

<style>
    button {
        all: unset;
        cursor: pointer;
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