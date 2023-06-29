---
title: Why does my Discord always crash when opening DevTools?
tags: crashing, crashes, oom
---

Discord on Windows uses 32bit electron which has a hard memory limit of 2gb. Discord's memory management isn't great so it will already get up to like 1.5gb ram usage if you are in a lot of servers and have it open for a while

DevTools use a lot of memory so once you open them, they immediately push you over 2gb usage. Thus Discord runs out of memory and crashes

**Solution**: use **Discord Browser** / **[Vencord Desktop](https://github.com/Vencord/Desktop)** 
