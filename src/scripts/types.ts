export interface PluginDev {
    name: string;
    id: string;
}

export interface PluginData {
    name: string;
    description: string;
    tags: string[];
    authors: PluginDev[];
    dependencies: string[];
    hasPatches: boolean;
    hasCommands: boolean;
    required: boolean;
    enabledByDefault: boolean;
    target: "desktop" | "discordDesktop" | "web" | "dev";
    filePath: string;
}

export interface Trait {
    emoji: string;
    name: string;
    shouldShow: boolean;
}