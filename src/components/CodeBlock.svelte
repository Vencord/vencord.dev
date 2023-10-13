<script lang="ts">
    import Card, { CardKind } from "./Card.svelte";

    export let code: string;

    function copyCode() {
        navigator.clipboard.writeText(code);
        didCopy = true;
    }

    let didCopy = false;
</script>

<div>
    <Card kind={CardKind.Blank}>
        <pre><code>{code}</code></pre>

        <button on:click={copyCode}>
            <svg height="24" viewBox="0 -960 960 960" width="24">
                {#if !didCopy}
                    <path
                        fill="currentColor"
                        d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
                    />
                {:else}
                    <path
                        fill="currentColor"
                        d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                    />
                {/if}
            </svg>
        </button>
    </Card>
</div>

<style>
    div {
        position: relative;
    }

    code,
    pre {
        overflow-wrap: anywhere;
        white-space: pre-wrap;
        line-height: 1.25em;
    }

    button {
        all: unset;
        cursor: pointer;
        position: absolute;
        top: 4px;
        right: 4px;

        color: var(--fg0-muted);
        transition: 200ms color ease-in-out;
    }

    button:is(:hover, :focus) {
        color: var(--fg0);
    }
</style>
