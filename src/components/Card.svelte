<script context="module" lang="ts">
    export const enum CardKind {
        Warning = "#f0b232",
        Error = "#ec4144",
        Success = "#2d7c46",
        Info = "#5865f2",
        Blank = "#575757",
    }
</script>

<script lang="ts">
    export let kind: CardKind;

    const border = kind;
    const background = kind + Math.floor(0xff / 12).toString(16);
</script>

<div style="--border:{border};--background:{background}">
    <slot />
</div>

<style define:vars={{ border, background }}>
    div {
        width: 100%;
        border: 2px solid var(--border);
        border-radius: 8px;
        padding: 0.5rem 1rem;
        margin: 0.5rem 0;
        box-sizing: border-box;
        background-color: var(--background);
    }
</style>
