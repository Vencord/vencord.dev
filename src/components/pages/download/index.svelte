<script lang="ts">
    import { onMount, type Snippet } from "svelte";

    import { IS_SERVER } from "@scripts/constants";

    interface Props {
        title?: Snippet;
        subtitle?: Snippet;
        windowsTab?: Snippet;
        linuxTab?: Snippet;
        macTab?: Snippet;
        browserTab?: Snippet;
    }

    const { title, subtitle, windowsTab, linuxTab, macTab, browserTab }: Props =
        $props();

    const options = $derived([
        { label: "Windows", render: windowsTab },
        { label: "Linux", render: linuxTab },
        { label: "macOS", render: macTab },
        { label: "Browser", render: browserTab },
    ] as const);

    const accents = {
        Windows: "Blue",
        Linux: "Green",
        macOS: "Yellow",
        Browser: "Orange",
    } as const;

    function normalizePlatform(value: string | null | undefined) {
        if (!value) return undefined;

        const lower = value.toLowerCase();
        if (lower === "mac") return "macOS";

        return options.find(o => o.label.toLowerCase() === lower)?.label;
    }

    const initialValue: string = IS_SERVER
        ? "Windows"
        : (() => {
              const hashOption = normalizePlatform(location.hash.slice(1));
              if (hashOption) return hashOption;

              const stored = normalizePlatform(localStorage.platform);
              if (stored) return stored;

              const platform = navigator.platform.toLowerCase();
              if (platform.includes("linux")) return "Linux";
              if (platform.includes("mac")) return "macOS";
              return "Windows";
          })();

    let selected = $state(initialValue);
    let initialized = false;
    let isPopstate = false;

    $effect(() => {
        localStorage.platform = selected;

        const url = `#${selected.toLowerCase()}`;
        if (!initialized) {
            history.replaceState(null, "", url);
            initialized = true;
        } else if (isPopstate) {
            isPopstate = false;
        } else {
            history.pushState(null, "", url);
        }
    });

    onMount(() => {
        function onNavigate() {
            const match = normalizePlatform(location.hash.slice(1));
            if (match) {
                isPopstate = true;
                selected = match;
            }
        }

        window.addEventListener("popstate", onNavigate);
        window.addEventListener("hashchange", onNavigate);
        return () => {
            window.removeEventListener("popstate", onNavigate);
            window.removeEventListener("hashchange", onNavigate);
        };
    });
</script>

<div class="container">
    <div class="page-header">
        {@render title?.()}
        {@render subtitle?.()}
    </div>

    <div class="downloads">
        {#each options as { label }}
            <input
                id={`${label}-radio`}
                type="radio"
                name="os"
                bind:group={selected}
                value={label}
            />
        {/each}

        <div class="platforms">
            {#each options as { label }}
                <label
                    for={`${label}-radio`}
                    style={`--accent: var(--accent${accents[label]})`}
                >
                    <span class="dot" aria-hidden="true"></span>
                    {label}
                </label>
            {/each}
        </div>

        <div class="sections">
            {#each options as { label, render }}
                <section class="download-section" data-platform={label}>
                    {@render render!()}
                </section>
            {/each}
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-width: 1100px;
    }

    .page-header {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .downloads {
        display: grid;
        grid-template-columns: 190px minmax(0, 1fr);
        gap: 1.5rem;
        align-items: start;
    }

    .platforms {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
    }

    label {
        display: flex;
        align-items: center;
        gap: 0.6rem;

        padding: 0.7rem 0.9rem;
        border-radius: var(--border-md);

        color: var(--grey1);
        font-weight: var(--fontWeightMedium);

        cursor: pointer;
        user-select: none;
        transition: color 150ms ease;
    }

    label:hover {
        color: var(--fg0);
    }

    #Windows-radio:checked ~ .platforms label[for="Windows-radio"],
    #Linux-radio:checked ~ .platforms label[for="Linux-radio"],
    #macOS-radio:checked ~ .platforms label[for="macOS-radio"],
    #Browser-radio:checked ~ .platforms label[for="Browser-radio"] {
        color: var(--fg1);
        font-weight: var(--fontWeightSemiBold);
    }

    #Windows-radio:focus-visible ~ .platforms label[for="Windows-radio"],
    #Linux-radio:focus-visible ~ .platforms label[for="Linux-radio"],
    #macOS-radio:focus-visible ~ .platforms label[for="macOS-radio"],
    #Browser-radio:focus-visible ~ .platforms label[for="Browser-radio"] {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }

    .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: var(--grey0);
        transition: background-color 150ms ease;
    }

    #Windows-radio:checked ~ .platforms label[for="Windows-radio"] .dot,
    #Linux-radio:checked ~ .platforms label[for="Linux-radio"] .dot,
    #macOS-radio:checked ~ .platforms label[for="macOS-radio"] .dot,
    #Browser-radio:checked ~ .platforms label[for="Browser-radio"] .dot {
        background-color: var(--accent);
    }

    .sections {
        min-width: 0;
    }

    .download-section {
        display: none;
        min-width: 0;

        padding: 1.5rem;

        background-color: var(--bgCurrentWord);
        border: 1px solid var(--fg0-muted2);
        border-radius: var(--border-lg);

        animation: fade-in 150ms ease-out;
    }

    #Windows-radio:checked
        ~ .sections
        .download-section[data-platform="Windows"],
    #Linux-radio:checked ~ .sections .download-section[data-platform="Linux"],
    #macOS-radio:checked ~ .sections .download-section[data-platform="macOS"],
    #Browser-radio:checked
        ~ .sections
        .download-section[data-platform="Browser"] {
        display: block;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .download-section {
            animation: none;
        }

        label,
        .dot {
            transition: none;
        }
    }

    @media screen and (max-width: 800px) {
        .downloads {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .platforms {
            flex-direction: row;
            gap: 0.25rem;
            overflow-x: auto;
        }

        label {
            flex: 1;
            justify-content: center;
            padding: 0.65rem 0.75rem;
        }
    }

    @media screen and (max-width: 500px) {
        .platforms {
            display: grid;
            grid-template-columns: 1fr 1fr;
            overflow: visible;
        }

        .download-section {
            padding: 1.25rem;
        }
    }
</style>
