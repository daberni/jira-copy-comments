# Chrome Web Store Listing Source

This file is the single source of truth for the public listing text.

## Extension Name

Jira Clipboard Helper

## Short Description

Copy Jira issue text and branch-ready names to your clipboard in one click.

## Detailed Description

Jira Clipboard Helper adds lightweight copy buttons directly into Jira Cloud pages so you can move faster in daily dev workflows.

With one click, copy:
- `PROJECT-123 Short issue summary`
- Branch-friendly names like `feature/PROJECT-123-short_issue_summary` (or `bugfix/...` for bugs when Jira metadata is available)

Typical use cases:
- Commit messages
- Branch naming
- PR descriptions
- Chat updates and status notes

Why teams use it:
- Saves repetitive copy/paste cleanup
- Keeps ticket references consistent
- Works inline while browsing boards and issue details

Privacy and permissions:
- Runs on Jira Cloud pages (`https://*.atlassian.net/*`)
- Uses `clipboardWrite` only to place generated text on your clipboard
- Does not require Jira API tokens

## Category

Developer Tools

## Language

English (US)

## Store URLs

- Public listing URL: https://chromewebstore.google.com/detail/gghpgmofodogbjamjpglpbjjlhcjajhf
- Developer Console edit URL: https://chrome.google.com/webstore/devconsole/2c6c87a6-7d70-4d7a-ba3b-cc658fe2d025/gghpgmofodogbjamjpglpbjjlhcjajhf/edit/status

## Screenshot Plan

1. Jira issue detail view with both copy buttons visible
2. Jira board/backlog card selected with copy button visible
3. Result paste example in terminal/PR text area

## Release Notes Template

- Improved compatibility with latest Jira UI updates.
- Fixed selector handling for affected Jira views.
- Minor visual/spacing improvements for copy buttons.
