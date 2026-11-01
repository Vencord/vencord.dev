import { PLUGINS_JSON_PATH, PLUGIN_READMES_JSON_PATH } from "./constants";
import { fetchGithubFileJson } from "./github";
import type { PluginData, Trait } from "./types";

export function fetchPlugins() {
    return fetchGithubFileJson<PluginData[]>(PLUGINS_JSON_PATH);
}

export function fetchPluginReadmes() {
    return fetchGithubFileJson<Record<string, string | undefined>>(PLUGIN_READMES_JSON_PATH);
}

export async function getPluginTraits(plugin: PluginData): Promise<Trait[]> {
    const traitDefinitions = [
        {
            emoji: "<:plugin_required:1414078629528211547>",
            name: "This plugin is required",
            shouldShow: plugin.required
        },
        {
            emoji: "<:plugin_default_enabled:1414078625493418025>",
            name: "This plugin is enabled by default",
            shouldShow: plugin.enabledByDefault
        },
        {
            emoji: "<:plugin_commands:1414078623803117680>",
            name: "This plugin has chat commands",
            shouldShow: plugin.hasCommands
        },
        {
            emoji: "<:plugin_desktop:1414078626676342784>",
            name: "This plugin is desktop only",
            shouldShow: plugin.target === "desktop"
        },
        {
            emoji: "<:plugin_desktop:1414078626676342784>",
            name: "This plugin is discord desktop only",
            shouldShow: plugin.target === "discordDesktop"
        },
        {
            emoji: "<:plugin_web:1414078630535102534>",
            name: "This plugin is web only",
            shouldShow: plugin.target === "web"
        },
        {
            emoji: "<:plugin_dev:1414078627514945536>",
            name: "This plugin is development build only",
            shouldShow: plugin.target === "dev"
        }
    ];

    return traitDefinitions
        .filter(trait => trait.shouldShow)
        .map(({ emoji, name }) => ({ emoji, name, shouldShow: true }));
}
