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
    target: "discordDesktop" | "vencordDesktop" | "web" | "dev";
    filePath: string;

    github?: string;
}

export interface Snippet {
    name: string;
    description: string;
    code: string;
    tags: string[];
    authors: PluginDev[];
}
