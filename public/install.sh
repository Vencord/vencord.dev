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

set -- "XDG_CONFIG_HOME=$XDG_CONFIG_HOME" "SUDO_USER=$(whoami)"

curl -sS https://github.com/Vendicated/VencordInstaller/releases/latest/download/VencordInstallerCli-Linux \
    --output "$outfile" \
    --location \
    --fail

chmod +x "$outfile"

if command -v sudo >/dev/null; then
    echo "Running with sudo"
    sudo env "$@" "$outfile"
elif command -v doas >/dev/null; then
    echo "Running with doas"
    doas env "$@" "$outfile"
elif command -v run0 >/dev/null; then
    echo "Running with run0"
    run0 env "$@" "$outfile"
elif command -v pkexec >/dev/null; then
    echo "Running with pkexec"
    pkexec env "$@" "$outfile"
else
    echo "Please install sudo, doas, run0 (systemd), or pkexec (polkit) to continue."
fi