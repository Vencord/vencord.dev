---
title: My themes broke and now I can't open settings or disable them
tags: themes, broken themes, themefix
---

open the dev tools with `CTRL + Shift + i` (`Cmd + Option + i` on MacOs) and click on the "console" tab at the top. Then paste and run (with enter) the following code.

It will
- disable custom css (you can turn it back on in Vencord Settings)
- copy your current theme links to your clipboard as a backup
- remove all themes

```js
(() => {
    Vencord.Settings.useQuickCss = false
    try {
        const copy = window.copy ?? Vencord.Webpack.Common.Clipboard.copy
        copy(Vencord.Settings.themeLinks.join("\n"))
    } catch { }
    Vencord.Settings.themeLinks = []
    Vencord.Settings.enabledThemes = []
})()
```
