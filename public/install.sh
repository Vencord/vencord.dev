#!/bin/sh
set -e

if [ "$(id -u)" -eq 0 ]; then
    echo "Run me as normal user, not root!"
    exit 1
fi

if grep -q "CHROMEOS_RELEASE_NAME" /etc/lsb-release 2>/dev/null; then
    echo "ChromeOS is not supported! Use the chrome extension. https://chromewebstore.google.com/detail/vencord-web/cbghhgpcnddeihccjmnadmkaejncjndb"
    exit 1
fi

# Use HOME because some distros have /tmp mounted noexec
outfile=$(mktemp --tmpdir="$HOME")
trap 'rm -f "$outfile"' EXIT

echo "Downloading Installer..."

curl -sS https://github.com/Vendicated/VencordInstaller/releases/latest/download/VencordInstallerCli-Linux \
    --output "$outfile" \
    --location \
    --fail

chmod +x "$outfile"

new_app_dirs=""
for branch in discord discordcanary discordptb; do
    for d in "$HOME/.config/$branch/app-"*/; do
        [ -d "$d" ] && new_app_dirs="${new_app_dirs}!  ${d}
"
    done
done

if [ -n "$new_app_dirs" ]; then
    echo
    echo "!  Detected Discord installations at the following paths."
    echo "!  If the Installer doesn't detect these, choose 'Custom Location' and paste the path in."
    printf '%s' "$new_app_dirs"
    echo
fi

for elevate in sudo doas run0 pkexec; do
	if command -v $elevate >/dev/null; then
		echo "Elevating with $elevate"
		$elevate env "XDG_CONFIG_HOME=$XDG_CONFIG_HOME" "SUDO_USER=$(whoami)" "$outfile" "$@"
		exit 0
	fi
done

echo "Please install sudo, doas, run0 (systemd), or pkexec (polkit) to continue."
exit 1
