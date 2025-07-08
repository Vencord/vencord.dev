import { readFileSync, writeFileSync } from "fs";

const BaseRedirects = {
    "/github": "https://github.com/Vendicated/Vencord",
    "/discord": "https://discord.gg/D9uwnFnqmd",
    "/support": "https://discord.gg/D9uwnFnqmd",
    "/install": "/download",
    "/plugins.json":
        "https://raw.githubusercontent.com/Vencord/builds/main/plugins.json",
    "/plugin-readmes.json":
        "https://raw.githubusercontent.com/Vencord/builds/main/plugin-readmes.json",
    "/donate": "https://github.com/sponsors/Vendicated",
    "/click-to-help/vencord": "https://github.com/sponsors/Vendicated",
    "/docs/plugin-requests":
        "https://github.com/Vencord/plugin-requests/issues/new?template=request.yml",
};

const VesktopDownloads = version => ({
    "/download/vesktop/universal/windows": `https://github.com/Vencord/Vesktop/releases/download/v${version}/Vesktop-Setup-${version}.exe`,
    "/download/vesktop/amd64/windows-portable": `https://github.com/Vencord/Vesktop/releases/download/v${version}/Vesktop-${version}-win.zip`,
    "/download/vesktop/arm64/windows-portable": `https://github.com/Vencord/Vesktop/releases/download/v${version}/Vesktop-${version}-arm64-win.zip`,

    "/download/vesktop/universal/dmg": `https://github.com/Vencord/Vesktop/releases/download/v${version}/Vesktop-${version}-universal.dmg`,

    "/download/vesktop/amd64/tar": `https://github.com/Vencord/Vesktop/releases/download/v${version}/vesktop-${version}.tar.gz`,
    "/download/vesktop/amd64/rpm": `https://github.com/Vencord/Vesktop/releases/download/v${version}/vesktop-${version}.x86_64.rpm`,
    "/download/vesktop/amd64/deb": `https://github.com/Vencord/Vesktop/releases/download/v${version}/vesktop_${version}_amd64.deb`,
    "/download/vesktop/amd64/appimage": `https://github.com/Vencord/Vesktop/releases/download/v${version}/Vesktop-${version}.AppImage`,

    "/download/vesktop/arm64/dmg": `https://github.com/Vencord/Vesktop/releases/download/v${version}/Vesktop-${version}-arm64.dmg`,

    "/download/vesktop/arm64/appimage": `https://github.com/Vencord/Vesktop/releases/download/v${version}/Vesktop-${version}-arm64.AppImage`,
    "/download/vesktop/arm64/tar": `https://github.com/Vencord/Vesktop/releases/download/v${version}/vesktop-${version}-arm64.tar.gz`,
    "/download/vesktop/arm64/deb": `https://github.com/Vencord/Vesktop/releases/download/v${version}/vesktop_${version}_arm64.deb`,
    "/download/vesktop/arm64/rpm": `https://github.com/Vencord/Vesktop/releases/download/v${version}/vesktop-${version}.aarch64.rpm`,
});

const Redirects = {
    ...BaseRedirects,
    ...VesktopDownloads(
        readFileSync("scripts/_latestVesktopVersion.txt", "utf-8").trim()
    ),
};

const RedirectsString = Object.entries(Redirects)
    .map(([source, dest]) => `${source} ${dest} 302`)
    .join("\n");

writeFileSync("public/_redirects", RedirectsString);
