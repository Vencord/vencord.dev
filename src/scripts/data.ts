import { PLUGINS_JSON_URL, PLUGIN_READMES_JSON_URL } from "./constants";
import type { PluginData, Trait } from "./types";

export async function fetchPlugins() {
    const res = await fetch(PLUGINS_JSON_URL);
    if (!res.ok) throw new Error("Failed to fetch plugins.json: " + res.status);

    return res.json() as Promise<PluginData[]>;
}

export async function fetchPluginReadme(plugin: string) {
    const res = await fetch(PLUGIN_READMES_JSON_URL);
    if (!res.ok)
        throw new Error("Failed to fetch plugin-readmes.json: " + res.status);

    const readmes = await res.json<any>();
    return readmes[plugin] as string | undefined;
}

export async function getPluginTraits(plugin: PluginData): Promise<Trait[]> {
    const traitDefinitions = [
        { emoji: "*️⃣", name: "This plugin is required", shouldShow: plugin.required },
        { emoji: "✅", name: "This plugin is enabled by default", shouldShow: plugin.enabledByDefault },
        { emoji: "💻", name: "This plugin has chat commands", shouldShow: plugin.hasCommands },
        { emoji: "🖥️", name: "This plugin is desktop only", shouldShow: plugin.target === "desktop" },
        { emoji: "🖥️", name: "This plugin is discord desktop only", shouldShow: plugin.target === "discordDesktop" },
        { emoji: "🌐", name: "This plugin is web only", shouldShow: plugin.target === "web" },
        { emoji: "👾", name: "This plugin is development build only", shouldShow: plugin.target === "dev" },
    ];

    return traitDefinitions
        .filter(trait => trait.shouldShow)
        .map(({ emoji, name }) => ({ emoji, name, shouldShow: true }));
}