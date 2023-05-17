import { getRuntime } from "@astrojs/cloudflare/runtime";
import { APIRoute } from "astro";

const Repos = {
    installer: "Vencord/Installer",
    vencord: "Vendicated/Vencord",
    "vencord-desktop": "Vencord/Desktop",
};

export const get: APIRoute = async ({ params, request }) => {
    const repo = Repos[params.repo as keyof typeof Repos];

    if (!repo)
        return new Response(null, {
            status: 404,
            headers: {
                "s-maxage": "3600", // 1h
            },
        });

    const { GITHUB_TOKEN } = getRuntime<{ GITHUB_TOKEN: string }>(request).env;

    const data = await fetch(
        `https://api.github.com/repos/${repo}/releases/latest`,
        {
            cf: {
                // https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limits-for-requests-from-personal-accounts
                // cache for 5 seconds, so we send at most 60 * 60 / 5 * 3 = 2160 requests per hour, which falls
                // comfortably within the 5k requests per hour limit
                cacheTtl: 5,
                cacheEverything: true,
            },
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                "User-Agent": "https://github.com/Vencord/Website",
            },
        }
    );

    if (!data.ok) {
        console.error(
            `GET ${repo}/releases/latest failed with status ${data.status}`
        );

        return new Response(null, {
            status: 502,
        });
    }

    return new Response(await data.text(), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "s-maxage": "20",
        },
    });
};
