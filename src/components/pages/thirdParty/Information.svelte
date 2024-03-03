<script lang="ts">
    import Shiki from "../../ShikiCodeBlocks.svelte"

    export let type: string;
    export let code: string;
    export let githubRepo: string;
    export let highlighter;
</script>

<section>
    <hr/>
    <h3 class="install-header">Install</h3>
    {#if type === "plugin"}
        <div class="instruction">
            <p>Run the following command inside of your Vencord's <code class="highlight">src/userplugins</code>:</p>
            <Shiki {highlighter} lang="shell" code={`git clone ${githubRepo}`}></Shiki>
        </div>
        <div class="instruction">
            <p>Then, re-build and inject</p>
            <Shiki {highlighter} lang="shell" code={`pnpm build\npnpm inject`}></Shiki>
        </div>

    {:else if type === "js-snippet"}
        <p>Run the following snippet in your Developer tools (<code class="highlight">Control + Shift + I</code>)</p>
        <Shiki {highlighter} lang="javascript" {code}></Shiki>
        
    {:else if type === "css-snippet"}
        <section>
            <p class="install-info">Copy this snippet and put it into your <code class="highlight">Quick CSS</code></p>
            <Shiki {highlighter} lang="css" {code}></Shiki>
        </section>
    {/if}
</section>

<style>
    p {
        line-height: normal;
        margin: 1px;
    }
    
    hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1.5px solid var(--grey2);
        margin: 1.5em 0;
        padding: 0;
    }

    .install-header {
        margin: 10px 0;
        font-size: 1.5rem;
        line-height: inherit;
        margin-top: 1.25em;
    }

    .install-info, .instruction {
        margin-bottom: 1em;
    }

    .highlight {
        background-color: var(--bg4);
        color: var(--accentAqua);
        border-radius: 8px;
        font-family: unset;
        text-align: center;
        padding: 0.05em 0.3em;
    }

</style>