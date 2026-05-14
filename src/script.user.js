const EXTENSION_TYPE = "jira-copy-comments";
const FLASH_CLASS_SUCCESS = "flash-success";
const FLASH_CLASS_ERROR = "flash-error";

const SELECTORS = {
    issueKey: '[data-testid="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]',
    issueSummary: '[data-testid="issue.views.issue-base.foundation.summary.heading"]',
    bitbucketCreateBranch: 'a[href*="https://bitbucket.org/branch/create"]',
    issueHeaderContainer: "#jira-issue-header-actions > div > div",
    dialogHeaderContainer: "#jira-issue-header > div > div > div > div > div + div > div",
    issueTypeButton: '[data-testid="issue.views.issue-base.foundation.change-issue-type.button"]'
};

const ICON_COPY = `<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`;
const ICON_BRANCH = `<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"/></svg>`;

const ACTIONS = [
    {
        id: "copy-text",
        icon: ICON_COPY,
        format: (key, summary) => key + " " + summary
    },
    {
        id: "copy-branch",
        icon: ICON_BRANCH,
        format: formatBranchName
    }
];

function formatBranchName(key, summary) {
    const modified = key + "-" + summary.substring(0, 30)
        .replace("ä", "ae")
        .replace("ö", "oe")
        .replace("ü", "ue")
        .replace("ß", "sz")
        .replace("&", "and")
        .replace(/[^\w-]/g, "_");

    const prefix = getBranchPrefixFromPage();
    return prefix ? prefix + modified : modified;
}

function getBranchPrefixFromPage() {
    const issueTypeFromButton = getIssueTypeFromIssueTypeButton();
    if (issueTypeFromButton) {
        return getBranchPrefixForIssueType(issueTypeFromButton);
    }

    const issueTypeFromBitbucketLink = getIssueTypeFromBitbucketLink();
    if (issueTypeFromBitbucketLink) {
        return getBranchPrefixForIssueType(issueTypeFromBitbucketLink);
    }

    return null;
}

function getIssueTypeFromBitbucketLink() {
    const createBranchAnchor = document.querySelector(SELECTORS.bitbucketCreateBranch);
    if (!createBranchAnchor) {
        return null;
    }

    return new URL(createBranchAnchor.href).searchParams.get("issueType");
}

function getIssueTypeFromIssueTypeButton() {
    const issueTypeButton = document.querySelector(SELECTORS.issueTypeButton);
    if (!issueTypeButton) {
        return null;
    }

    const ariaLabel = issueTypeButton.getAttribute("aria-label") || "";
    if (!ariaLabel) {
        return null;
    }

    const issueType = ariaLabel.split(" - ")[0].trim();
    return issueType;
}

function getBranchPrefixForIssueType(issueType) {
    const issueTypePrefixMap = {
        Story: "feature/",
        Bug: "bugfix/",
        Task: "task/",
        Subtask: "subtask/"
    };
    return issueTypePrefixMap[issueType] || "";
}

function getCurrentIssue() {
    const keyNode = document.querySelector(SELECTORS.issueKey);
    const summaryNode = document.querySelector(SELECTORS.issueSummary);
    if (!keyNode || !summaryNode) {
        return null;
    }
    return {
        key: keyNode.innerText.trim(),
        summary: summaryNode.innerText.trim()
    };
}

async function copyToClipboard(key, summary, formatter) {
    if (!key || !summary) {
        return false;
    }

    const message = formatter ? formatter(key, summary) : key + "-" + summary;
    try {
        await navigator.clipboard.writeText(message);
        return true;
    } catch (error) {
        console.warn(error);
        return false;
    }
}

function flashResult(button, success) {
    const className = success ? FLASH_CLASS_SUCCESS : FLASH_CLASS_ERROR;
    button.classList.remove(FLASH_CLASS_SUCCESS, FLASH_CLASS_ERROR);
    void button.offsetWidth;
    button.classList.add(className);
    window.setTimeout(() => {
        button.classList.remove(className);
    }, 650);
}

function createActionButton(action) {
    const button = document.createElement("button");
    button.dataset.type = EXTENSION_TYPE;
    button.dataset.action = action.id;
    button.innerHTML = "<span>" + action.icon + "</span>";
    button.addEventListener("click", async () => {
        const issue = getCurrentIssue();
        const success = await copyToClipboard(issue && issue.key, issue && issue.summary, action.format);
        button.classList.toggle("error", !success);
        flashResult(button, success);
    });
    return button;
}

function createActionContainer(action) {
    const container = document.createElement("div");
    container.dataset.type = EXTENSION_TYPE;
    container.dataset.action = action.id;
    container.className = "jcc-n-container";
    container.append(createActionButton(action));
    return container;
}

function ensureButtonsAt(hostElement) {
    if (!hostElement) {
        return;
    }

    ACTIONS.forEach((action) => {
        const selector = '[data-type="' + EXTENSION_TYPE + '"][data-action="' + action.id + '"]';
        if (!hostElement.querySelector(selector)) {
            hostElement.insertBefore(createActionContainer(action), hostElement.firstChild);
        }
    });
}

function render() {
    ensureButtonsAt(document.querySelector(SELECTORS.issueHeaderContainer));
    ensureButtonsAt(document.querySelector(SELECTORS.dialogHeaderContainer));
}

let renderScheduled = false;
function scheduleRender() {
    if (renderScheduled) {
        return;
    }
    renderScheduled = true;
    window.requestAnimationFrame(() => {
        renderScheduled = false;
        render();
    });
}

const mutationObserver = new MutationObserver((mutations) => {
    const hasRelevantAddition = mutations.some((record) =>
        Array.from(record.addedNodes).some(
            (node) => node.nodeType === Node.ELEMENT_NODE && node.dataset?.type !== EXTENSION_TYPE
        )
    );

    if (hasRelevantAddition) {
        scheduleRender();
    }
});

(function init() {
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
    render();
})();
