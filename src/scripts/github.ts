import { GITHUB_TOKEN } from "astro:env/server";

import { SOURCE_CODE } from "./constants";

const GITHUB_API_BASE_URL = new URL("https://api.github.com");

export type GithubRequestInit = RequestInit & {
    /** How long Cloudflare should cache the response for, in seconds. */
    cacheTtl?: number;
};

export async function fetchGithubApi(path: string, { cacheTtl, headers, ...init }: GithubRequestInit = {}) {
    const requestHeaders = new Headers(headers);
    requestHeaders.set("User-Agent", SOURCE_CODE);
    requestHeaders.set("Authorization", `Bearer ${GITHUB_TOKEN}`);
    if (!requestHeaders.has("Accept")) requestHeaders.set("Accept", "application/vnd.github+json");

    const url = new URL(GITHUB_API_BASE_URL);
    url.pathname = path;

    const res = await fetch(url, {
        ...init,
        headers: requestHeaders,
        ...(cacheTtl !== undefined && {
            cf: {
                cacheEverything: true,
                cacheTtl
            }
        })
    });

    if (!res.ok) {
        const body = await res.text().catch(() => "Unknown Error");
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}\n${body}`);
    }

    return res;
}

export function fetchGithubFile(path: string, init: GithubRequestInit = {}) {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/vnd.github.raw+json");

    return fetchGithubApi(path, { ...init, headers });
}

export async function fetchGithubJson<T>(path: string, init?: GithubRequestInit) {
    return (await fetchGithubApi(path, init)).json() as Promise<T>;
}

export async function fetchGithubFileJson<T>(path: string, init?: GithubRequestInit) {
    return (await fetchGithubFile(path, init)).json() as Promise<T>;
}
