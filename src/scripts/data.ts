import { PLUGINS_JSON_URL, PLUGIN_READMES_JSON_URL } from "./constants";
import type { PluginData } from "./types";

export async function fetchPlugins() {
    const res = await fetch(PLUGINS_JSON_URL);
    const res2 = await fetch(PLUGIN_READMES_JSON_URL);
    if (!res.ok) throw new Error("Failed to fetch plugins.json: " + res.status);
    if (!res2.ok) throw new Error("Failed to fetch plugin-readmes.json: " + res2.status);

    const plugins = await res.json() as PluginData[];
    const readmes = await res2.json<Record<string, string>>();

    return plugins.map(plugin => {
        const readme = readmes[plugin.name];
        const [, screenshotDescription, screenshot] = readme?.match(/!\[([^\]]*?)\]\((https:[^)]+?)\)/) ?? [];
        return {
            ...plugin,
            readme,
            screenshot,
            screenshotDescription
        };
    });
}

export async function fetchPluginReadme(plugin: string) {
    const res = await fetch(PLUGIN_READMES_JSON_URL);
    if (!res.ok)
        throw new Error("Failed to fetch plugin-readmes.json: " + res.status);

    const readmes = await res.json<any>();
    return readmes[plugin] as string | undefined;
}