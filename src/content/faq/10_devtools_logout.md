---
title: Why do I get logged out after opening DevTools?
tags: nodevtoolswarning, hidetoken, logout
---

Discord tries to protect you from getting scammed by "hiding" your token when you open DevTools, which means it deletes it from storage and only keeps it in memory in order to make it harder to obtain.

If you now close discord before closing DevTools again, your token will not be saved anywhere anymore and as a consequence you will be logged out

Solution: **Close DevTools** before closing discord or better yet enable the **NoDevtoolsWarning plugin** which removes this "feature"
