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

for elevate in sudo doas run0 pkexec; do
	if command -v $elevate >/dev/null; then
		echo "Elevating with $elevate"
		exec $elevate env "XDG_CONFIG_HOME=$XDG_CONFIG_HOME" "SUDO_USER=$(whoami)" "$outfile" "$@"
	fi
done

echo "Please install sudo, doas, run0 (systemd), or pkexec (polkit) to continue."
exit 1
