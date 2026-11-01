import { PLUGINS_JSON_URL, PLUGIN_READMES_JSON_URL } from "./constants";
import type { PluginData, Trait } from "./types";

export async function fetchPlugins() {
    const res = await fetch(PLUGINS_JSON_URL);
    if (!res.ok) throw new Error("Failed to fetch plugins.json: " + res.status);

    return res.json() as Promise<PluginData[]>;
}

export async function fetchPluginReadmes() {
    const res = await fetch(PLUGIN_READMES_JSON_URL);
    if (!res.ok)
        throw new Error("Failed to fetch plugin-readmes.json: " + res.status);

    return res.json() as Promise<Record<string, string | undefined>>;
}

export async function getPluginTraits(plugin: PluginData): Promise<Trait[]> {
    const traitDefinitions = [
        {
            emoji: "<:plugin_required:1414078629528211547>",
            name: "This plugin is required",
            shouldShow: plugin.required,
        },
        {
            emoji: "<:plugin_default_enabled:1414078625493418025>",
            name: "This plugin is enabled by default",
            shouldShow: plugin.enabledByDefault,
        },
        {
            emoji: "<:plugin_commands:1414078623803117680>",
            name: "This plugin has chat commands",
            shouldShow: plugin.hasCommands,
        },
        {
            emoji: "<:plugin_desktop:1414078626676342784>",
            name: "This plugin is desktop only",
            shouldShow: plugin.target === "desktop",
        },
        {
            emoji: "<:plugin_desktop:1414078626676342784>",
            name: "This plugin is discord desktop only",
            shouldShow: plugin.target === "discordDesktop",
        },
        {
            emoji: "<:plugin_web:1414078630535102534>",
            name: "This plugin is web only",
            shouldShow: plugin.target === "web",
        },
        {
            emoji: "<:plugin_dev:1414078627514945536>",
            name: "This plugin is development build only",
            shouldShow: plugin.target === "dev",
        },
    ];

    return traitDefinitions
        .filter(trait => trait.shouldShow)
        .map(({ emoji, name }) => ({ emoji, name, shouldShow: true }));
}
