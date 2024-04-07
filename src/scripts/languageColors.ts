import colors from "./languageColors.json";

export function getLanguageColor(lang: keyof typeof colors) {
    return colors[lang] || "#000000";
}
