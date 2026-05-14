# Jira Clipboard Helper

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

This project is intentionally lightweight (no build step).

Source layout:

- `src/manifest.json` – extension manifest (MV3)
- `src/script.user.js` – content script logic
- `src/css.user.css` – injected styles

To test locally:

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `src` directory

## Changelog Notes

Recent changes mainly track Jira UI updates and selector fixes to keep buttons visible in evolving Jira screens.
