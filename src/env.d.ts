/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import("@astrojs/cloudflare").AdvancedRuntime;

declare namespace App {
    interface Locals extends Runtime {}
}
