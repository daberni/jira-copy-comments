# Jira Clipboard Helper

[![Available in the Chrome Web Store](https://developer.chrome.com/static/docs/webstore/branding/image/tbyBjqi7Zu733AAKA5n4.png)](https://chromewebstore.google.com/detail/gghpgmofodogbjamjpglpbjjlhcjajhf)
[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-FF7139?logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/en-US/firefox/addon/jira-clipboard-helper/)

Chrome extension that adds quick copy buttons to Jira so you can copy issue key + summary and branch-friendly names in one click.

## What It Does

The extension injects two buttons into supported Jira views:

- Copy issue text: `PROJECT-123 Short issue summary`
- Copy branch text: `feature/PROJECT-123-short_issue_summary` (or `bugfix/...` for bug issues where Jira exposes type metadata)

This is optimized for day-to-day workflows like:

- Creating commit messages
- Naming Git branches
- Sharing issue references in chat, docs, and PRs

## Where It Works

- Jira Cloud domains matching `https://*.atlassian.net/*`
- Jira board and issue views (legacy and current UI variants where selectors are available)

Because Jira UI markup changes over time, specific placements can occasionally break until the extension is updated.

## Installation

Install from the Chrome Web Store:

- https://chrome.google.com/webstore/detail/gghpgmofodogbjamjpglpbjjlhcjajhf

## How To Use

1. Open a Jira issue or board item.
2. Click one of the extension’s copy buttons.
3. Paste into your target app (Git client, terminal, chat, PR, etc.).

If copying fails, the button turns red to indicate an error.

## Permissions

- `clipboardWrite`: required to copy the generated text to your clipboard.

No Jira API token is required.

## Development

This project is intentionally lightweight.

Source layout:

- `src/` – shared extension source files (content script, css, locales, icons)
- `targets/chrome/manifest.json` – Chrome Web Store manifest
- `targets/firefox/manifest.json` – Firefox manifest

Build Chrome dist locally:

```bash
./scripts/build-target.sh chrome
```

Load Chrome dist locally:

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select `dist/chrome`

## Firefox

Firefox support uses the same source files with a Firefox-specific manifest.

Build Firefox package locally:

```bash
./scripts/build-target.sh firefox
```

Output:

- `dist/jira-clipboard-helper-firefox-<version>.zip`

Automated signing/release is available via GitHub Actions workflow `Release Firefox Add-on`.

Load locally in Firefox:

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `dist/firefox/manifest.json`

## Changelog Notes

Recent changes mainly track Jira UI updates and selector fixes to keep buttons visible in evolving Jira screens.
