const textSimpleConcat = (key, message) => key + " " + message;

const ic_assignment_black_24px = `<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`;
const ic_call_split_black_24px = `<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"/></svg>`;

const textBranchName = (key, message) => {
    const modified = key + "-" + message.substring(0, 30)
        .replace('ä', 'ae')
        .replace('ö', 'oe')
        .replace('ü', 'ue')
        .replace('ß', 'sz')
        .replace('&', 'and')
        .replace(/[^\w-]/g, '_');

    // https://bitbucket.org/branch/create?issueKey=TIMR-5824&issueType=Story&issueSummary=Use+MySQL+for+unit+and+integration+tests
    const createBranchAnchor = document.querySelector('a[href*="https://bitbucket.org/branch/create"]');
    if (createBranchAnchor) {
        const issueType = new URL(createBranchAnchor.href).searchParams.get("issueType");
        if (issueType == 'Story') {
            return 'feature/' + modified;
        } else if (issueType == 'Bug') {
            return 'bugfix/' + modified;
        }
    }

    return modified;
};

async function handleClick(key, summary, modifyFun) {
    if (key && summary) {
        var message;
        if (modifyFun) {
            message = modifyFun(key, summary);
        } else {
            message = key + "-" + summary;
        }

        try {
            await navigator.clipboard.writeText(message);
            return true;
        } catch(e) {
            console.warn(e);
        }
    }
    return false;
}

function getCurrentIssue() {
    var issueIdNode = document.querySelector('[data-testid="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]');
    var issueSummaryNode = document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]');
    if (issueIdNode && issueSummaryNode) {
        return {
            key: issueIdNode.innerText.trim(),
            summary: issueSummaryNode.innerText.trim()
        };
    }
    return null;
}

function flashResult(button, success) {
    var className = success ? "flash-success" : "flash-error";
    button.classList.remove("flash-success", "flash-error");
    void button.offsetWidth;
    button.classList.add(className);
    window.setTimeout(function () {
        button.classList.remove(className);
    }, 650);
}

function appendIcon(node, modifyFun, image) {
    var button = document.createElement("button");
    button.dataset.type = "jira-copy-comments";
    button.innerHTML = '<span>' + image + '</span>';
    button.addEventListener('click', async function () {
        var issue = getCurrentIssue();
        var key = issue && issue.key;
        var summary = issue && issue.summary;

        let success = await handleClick(key, summary, modifyFun);
        button.classList.toggle("error", !success);
        flashResult(button, success);
    });

    var div = document.createElement("div");
    div.dataset.type = "jira-copy-comments";
    div.className = "jcc-n-container"
    div.append(button);

    node.insertBefore(div, node.children[0]);
}

function setIcons() {
    var elems = document.querySelectorAll('[data-type="jira-copy-comments"]');
    for (var i = elems.length - 1; i >= 0; i--) {
        elems[i].remove();
    };

    var issueHeaderActions = document.getElementById("jira-issue-header-actions");
    if (issueHeaderActions) {
        var container = document.querySelector("#jira-issue-header-actions > div > div");
        if (container) {
            container.style.gap = "unset"; // remove default gap
            appendIcon(container, textBranchName, ic_call_split_black_24px);
            appendIcon(container, textSimpleConcat, ic_assignment_black_24px);
        }
    }

    var dialogIssueHeader = document.getElementById("jira-issue-header");
    if (dialogIssueHeader) {
        var container = dialogIssueHeader.querySelector("#jira-issue-header > div > div > div > div > div + div > div");
        if (container) {
            appendIcon(container, textBranchName, ic_call_split_black_24px);
            appendIcon(container, textSimpleConcat, ic_assignment_black_24px);
        }
    }
}

let mutationObserver = new MutationObserver((mutations) => {
    const addedNodes = mutations.flatMap(record => Array.from(record.addedNodes))
    const found = addedNodes.some(node => node.dataset !== undefined && node.dataset?.type != "jira-copy-comments");
    if (found) {
        setIcons();
    }
});

(function() {
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    setIcons();
 })();
