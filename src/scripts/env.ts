import { env as cfEnv } from "cloudflare:workers";

export function getEnv(metaEnv: ImportMetaEnv, name: string) {
    const env: Record<string, unknown> = import.meta.env.PROD
        ? (cfEnv as Record<string, unknown>)
        : metaEnv;

    if (!env[name]) throw new Error(`Missing environment variable "${name}"`);

    return env[name] as string;
}
