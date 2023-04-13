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
    // Note - Theme switcher does not work on dev mode
    if (!IS_SERVER) selected.subscribe(v => {
        localStorage.theme = v;
        document.body.className = v.toLowerCase();
    });

    function themeSwitch() {
        selected.update(x => x = (x === "Light") ? "Dark" : "Light");
    }
</script>

<!-- Probably not the best way to go about this tbh -->
<a href="#" on:click|preventDefault={themeSwitch} title="Switch to Dark">
    {#if $selected === "Light"}
        <slot name="light"/>
    {:else if $selected === "Dark"}
        <slot name="dark"/>
    {/if}
</a>

<style>
    a slot {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        color: var(--fg0);
    }
    a:hover slot {
        color: var(--accent);
    }
</style>