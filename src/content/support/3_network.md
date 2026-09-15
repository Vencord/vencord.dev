---
title: Failed to install the latest Vencord builds from GitHub
tags: dns, hosts, network, vpn, ssl, tls
---

This is usually caused by network issues or DNS problems on your system.
Try the following steps one by one to resolve the issue.

### 1. Try changing your DNS server

DNS servers help translate domain names (github.com) into IP addresses (140.82.121.3).
By default you are probably using your ISP's DNS server, who sometimes may be unreliable or deliberately block certain websites like GitHub.

We recommend switching to a reliable DNS server like Cloudflare's 1.1.1.1:
- [Windows](https://developers.cloudflare.com/1.1.1.1/setup/windows/)
- [macOS](https://developers.cloudflare.com/1.1.1.1/setup/macos/)
- [Linux](https://developers.cloudflare.com/1.1.1.1/setup/linux/)

### 2. Check your hosts file

The hosts file contains mappings of IP addresses to hostnames and can be used to override DNS settings for specific domains.
The file is located at
- Windows: `C:\Windows\System32\drivers\etc\hosts`
- macOS / Linux: `/etc/hosts`

Open it with a text editor with administrative privileges (e.g., Notepad on Windows, `sudo nano` on macOS/Linux).
Look for any entries that contain github and remove them.

If you found any entries containing github, save the file and restart your system for the changes to take effect.

### 3. Use a VPN

Some isps may block access to GitHub. You can try using a VPN to bypass these restrictions.

You can use ProtonVPN for free: https://protonvpn.com/free-vpn

### If you are getting the error `tls: failed to verify certificate: x509: certificate signed by unknown authority`

You have custom SSL certificates installed on your system which are causing this issue. This is usually because you used cracked software or development tools that installed their own certificates.

To resolve this:
1. Press Win + R to open the Run prompt
2. Type `certmgr.msc` and hit enter to open the Certificate manager
3. Under Personal > Certificates, delete any certificates that you are sure you won't need anymore. If you are unsure, ask AI or ask for help in our support channel. Deleting the wrong certificates can prevent certain applications from working correctly.