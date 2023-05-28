export const SECONDS = 1;
export const MINUTES = 60 * SECONDS;
export const HOURS = 60 * MINUTES;
export const DAYS = 24 * HOURS;

export function cacheResponseFor(req: { headers: Headers }, seconds: number) {
    req.headers.set(
        "Cache-Control",
        `public, max-age=${seconds}, s-maxage=${seconds}`
    );
}
