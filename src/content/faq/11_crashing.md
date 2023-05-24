---
title: Why is my discord crashing? 
tags: crashing, crashes
---

>***Note***
> Only works in the app, does not work in the browser

### If you're *certain* this is not being caused from discord running out of memory from opening the dev tools, run this: 

open the dev tools with `CTRL + Shift + i` (`CMD` on mac) and click on the "console" tab at the top. Then paste and run (with enter) the following code.

```tsx
(await DiscordNative.processUtils.getLastCrash()).rendererCrashReason;
```
Screenshot the output and send! 
