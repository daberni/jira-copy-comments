# Smoke Test Harness

This harness validates core extension behavior without Jira:

- Button injection in main issue header
- Button injection in dialog header
- Clipboard write on click
- Success/error flash class application

## Run

1. Open `test-harness/index.html` in Chrome.
2. Check the **Smoke Results** panel.
3. Expected outcome: `All smoke tests passed.`

Notes:
- The harness stubs `navigator.clipboard.writeText` and captures writes in-memory.
- It reuses the real `src/script.user.js` and `src/css.user.css` files.
