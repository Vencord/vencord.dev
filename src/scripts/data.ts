import { PLUGINS_JSON_URL } from "./constants";
import { PluginData } from "./types";

export async function fetchPlugins() {
    const res = await fetch(PLUGINS_JSON_URL);

    if (!res.ok) throw new Error("Failed to fetch plugins.json: " + res.status);

    return res.json() as Promise<PluginData[]>;
}
