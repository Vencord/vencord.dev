<script lang="ts">
    import { CHROME_WEBSTORE_URL } from "scripts/constants";

    let dialog: HTMLDialogElement;

    function checkDownloadPrerequisites(e: MouseEvent) {
        const { userAgentData } = navigator as any;
        const chromeVersion = userAgentData?.brands?.find(
            b => b.brand === "Chromium" || b.brand === "Google Chrome"
        )?.version;

        console.log(chromeVersion);

        if (chromeVersion && Number(chromeVersion) < 111) {
            e.preventDefault();
            dialog.showModal();
        }
    }

    function closeDialog() {
        dialog.close();
    }
</script>

<a
    id="chrome-download-button"
    href={CHROME_WEBSTORE_URL}
    on:click={checkDownloadPrerequisites}
>
    <img
        class="chrome-badge"
        src="/assets/chrome-button.png"
        title="Get Vencord on the Chrome Webstore"
        alt=""
    />
</a>
<dialog bind:this={dialog}>
    <h1>Chrome Version too old!</h1>
    <p>Your browser is no longer supported. There are two solutions:</p>
    <ol>
        <li>
            <strong>Update your Browser</strong> to at least version 111.
        </li>
        <li>
            <strong>Use the Userscript</strong> instead.
        </li>
    </ol>

    <button role="dialog" on:click={closeDialog}>Close</button>
</dialog>

<style>
    .chrome-badge {
        border-radius: var(--border-lg);
    }
</style>
