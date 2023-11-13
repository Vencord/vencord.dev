---
title: Patching
description: Patching Discord modules is the heart of Vencord.
category: tutorials
author: lewisakura
---

Vencord's plugins use patching for modifying the Discord source code and injecting custom functionality. It's a highly
reliable method of adding features that is also performant! It's a win-win!

...but, writing patches can be difficult. This tutorial is here to guide you through the basics of writing a patch for a
plugin. <!-- TODO: cover how to find modules and stuff -->

## Regex
Regex is the core of the patcher; it's used to find the actual code to modify. I won't go into regex in this tutorial,
but a good couple of resources for learning are https://regex101.com/ (a regex building assistant) and
https://ihateregex.io/ (a cheatsheet with common regex patterns and some explanations on how they work).

### The `\i` placeholder

You may have already seen this during your adventures in trying to work out how plugins work, but we have a custom regex
placeholder called `\i`. This stands for `identifier`, and will match any minified identifiers in Discord's module source
code. It's equivalent to `[A-Za-z_$][\w$]*`.

For a live example, take the ColorSighted plugin:
```typescript
export default definePlugin({
    name: "ColorSighted",
    description: "Removes the colorblind-friendly icons from statuses, just like 2015-2017 Discord",
    authors: [Devs.lewisakura],
    patches: [
        {
            find: "Masks.STATUS_ONLINE",
            replacement: {
                match: /Masks\.STATUS_(?:IDLE|DND|STREAMING|OFFLINE)/g,
                replace: "Masks.STATUS_ONLINE"
            }
        },
        {
            find: ".AVATAR_STATUS_MOBILE_16;",
            replacement: {
                match: /(?<=fromIsMobile:\i=!0,.+?)status:(\i)/,
                // Rename field to force it to always use "online"
                replace: 'status_$:$1="online"'
            }
        }
    ]
});
```

Let's take a closer look at the second patch:

```typescript
{
    find: ".AVATAR_STATUS_MOBILE_16;",
    replacement: {
        match: /(?<=fromIsMobile:\i=!0,.+?)status:(\i)/,
        // Rename field to force it to always use "online"
        replace: 'status_$:$1="online"'
    }
}
```

Here, we're using `\i` twice to match an identifier in a lookback, and then again to capture an identifier to use in the
replacement later. This demonstrates two things: we can use this placeholder for matching and for capturing Discord's
mangled variable names. This is *highly* useful for patches that need to work with these variables, and saves you from
having to rewrite the same regex over and over.