(function runSmokeTests() {
  const resultsEl = document.getElementById("results");
  const lines = [];
  let failed = 0;

  function assert(condition, label) {
    if (condition) {
      lines.push("PASS  " + label);
    } else {
      failed += 1;
      lines.push("FAIL  " + label);
    }
  }

  function countInjectedButtons(root) {
    return root.querySelectorAll('button[data-type="jira-copy-comments"]').length;
  }

  const mainHost = document.querySelector("#jira-issue-header-actions > div > div");
  const dialogHost = document.querySelector("#jira-issue-header > div > div > div > div > div + div > div");

  assert(!!mainHost, "main host selector exists");
  assert(!!dialogHost, "dialog host selector exists");

  const mainCount = countInjectedButtons(mainHost);
  const dialogCount = countInjectedButtons(dialogHost);

  assert(mainCount === 2, "injects 2 buttons into main header");
  assert(dialogCount === 2, "injects 2 buttons into dialog header");

  const mainButtons = mainHost.querySelectorAll('button[data-type="jira-copy-comments"]');
  assert(mainButtons.length === 2, "main header has actionable buttons");

  Promise.resolve()
    .then(async function () {
      if (mainButtons.length > 0) {
        await mainButtons[0].click();
        await new Promise(function (resolve) { setTimeout(resolve, 20); });
      }
    })
    .then(function () {
      const flashes = mainHost.querySelectorAll(".flash-success, .flash-error").length;
      assert(flashes >= 1, "click triggers visual flash class");
      const hasSuccessFlash = mainHost.querySelectorAll(".flash-success").length >= 1;

      if (window.__clipboardStubActive) {
        assert(window.__clipboardWrites.length === 1, "click writes to clipboard once");
        const val = window.__clipboardWrites[0] || "";
        const looksLikeBranch = val.indexOf("feature/TIMR-5824") === 0 || val.indexOf("bugfix/TIMR-5824") === 0;
        assert(looksLikeBranch || val.indexOf("TIMR-5824 ") === 0, "clipboard output includes key and expected format");
      } else {
        assert(hasSuccessFlash, "clipboard stub unavailable: using success flash as fallback signal");
      }

      if (failed === 0) {
        lines.unshift("All smoke tests passed.");
      } else {
        lines.unshift("Smoke tests failed: " + failed);
      }

      resultsEl.textContent = lines.join("\n");
      resultsEl.style.borderColor = failed === 0 ? "#1f7a3f" : "#b91c1c";
    })
    .catch(function (error) {
      resultsEl.textContent = "Smoke harness failed to run:\n" + String(error && error.stack ? error.stack : error);
      resultsEl.style.borderColor = "#b91c1c";
    });
})();
