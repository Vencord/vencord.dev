---
title: My themes broke and now I can't open settings or disable them
tags: themes, broken themes, themefix
---

1. Open the browser developer tools with `CTRL + Shift + i` (`Cmd + Option + i` on MacOs)
2. Click on the "Console" tab at the top of the developer tools
3. Type `allow pasting` and press Enter. If you get an error, just ignore it and proceed to the next step
4. Paste the following code into the console and press Enter

```js
(() => {
    Vencord.Settings.useQuickCss = false
    try {
        const copy = window.copy ?? Vencord.Util.copyToClipboard
        copy(Vencord.Settings.themeLinks.join("\n"))
    } catch { }
    Vencord.Settings.themeLinks = []
    Vencord.Settings.enabledThemes = []
})()
```

It will
- disable custom css — You can turn it back on in Vencord Settings
- copy your current theme links to your clipboard as a backup
- remove all themes