export interface PluginDev {
    name: string;
    id: string;
}

export interface PluginData {
    name: string;
    description: string;
    authors: PluginDev[];
    dependencies: string[];
    hasPatches: boolean;
    hasCommands: boolean;
    required: boolean;
    enabledByDefault: boolean;
    target: "desktop" | "web" | "dev";
}
