/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Env = {
    GITHUB_TOKEN: string;
};

type Runtime = import("@astrojs/cloudflare").AdvancedRuntime<Env>;

declare namespace App {
    interface Locals extends Runtime {}
}
