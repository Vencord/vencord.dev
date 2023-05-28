export const SECONDS = 1;
export const MINUTES = 60;

export function cacheResponseFor(req: { headers: Headers }, seconds: number) {
    req.headers.set(
        "Cache-Control",
        `public, max-age=${seconds}, s-maxage=${seconds}`
    );
}
