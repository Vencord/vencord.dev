import { env as cfEnv } from "cloudflare:workers";

export function getEnv(metaEnv: ImportMetaEnv, name: string) {
    const env = import.meta.env.PROD ? (cfEnv as ImportMetaEnv) : metaEnv;

    if (!env[name]) throw new Error(`Missing environment variable "${name}"`);

    return env[name] as string;
}
