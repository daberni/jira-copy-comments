#!/usr/bin/env bash
set -euo pipefail

if [ "${1:-}" = "" ]; then
  echo "Usage: $0 <target>"
  echo "Example: $0 chrome"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$1"
MANIFEST="$ROOT_DIR/targets/$TARGET/manifest.json"
DIST_ROOT="$ROOT_DIR/dist"
OUT_DIR="$DIST_ROOT/$TARGET"

if [ ! -f "$MANIFEST" ]; then
  echo "Target manifest not found: $MANIFEST"
  exit 1
fi

VERSION="$(jq -r '.version' "$MANIFEST")"
ZIP_NAME="jira-clipboard-helper-${TARGET}-${VERSION}.zip"
ZIP_PATH="$DIST_ROOT/$ZIP_NAME"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
rm -f "$ZIP_PATH"

cp -R "$ROOT_DIR/src/." "$OUT_DIR/"
cp "$MANIFEST" "$OUT_DIR/manifest.json"
find "$OUT_DIR" -name ".DS_Store" -delete

(
  cd "$OUT_DIR"
  zip -r "$ZIP_PATH" .
)

echo "Built $TARGET package: $ZIP_PATH"
