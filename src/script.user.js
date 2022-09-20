const textSimpleConcat = (key, message) => key + " " + message;

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

function copyToClipboard(message) {
    var textarea = document.createElement("textarea");
    textarea.dataset.type = "jira-copy-comments"
    textarea.textContent = message;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
}

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
        } catch(e) {
            console.warn(e)
        }
    }
}

function appendTextButton(node) {
    appendIcon(node, textSimpleConcat, "ic_assignment_black_24px.svg");
}

function appendBranchButton(node) {
    appendIcon(node, textBranchName, "ic_call_split_black_24px.svg");
}

function appendIcon(node, modifyFun, image) {
    var img = document.createElement("span");
    img.className = "aui-icon aui-icon-small"
    img.style.backgroundImage = 'url(' + chrome.runtime.getURL(image) + ')';
    img.style.backgroundSize = "contain";
    node.appendChild(img);

    node.addEventListener('click', async function (event) {
        var issueElement = document.getElementById('key-val') || document.getElementById('issuekey-val');
        if (issueElement) {
            var key = issueElement.innerText;
            var summary = document.getElementById('summary-val').innerText.trim();
        }

        var issueRow = document.getElementsByClassName('issuerow focused')[0];
        if (issueRow) {
            var key = issueRow.getElementsByClassName('issuekey')[0].getElementsByTagName('a')[0].innerText;
            var summary = issueRow.getElementsByClassName('summary')[0].getElementsByTagName('a')[0].innerText;
        }

        var issueBacklog = document.querySelector('.ghx-backlog-card.ghx-selected');
        if (issueBacklog) {
            var key = issueBacklog.dataset.issueKey;
            var summary = issueBacklog.getElementsByClassName('ghx-summary')[0].innerText;
        }

        var issueCard = document.querySelector('.ghx-issue.ghx-selected');
        if (issueCard) {
            var key = issueCard.getElementsByClassName('ghx-key')[0].getAttribute('data-tooltip');
            var summary = issueCard.getElementsByClassName('ghx-summary')[0].innerText;
        }

        await handleClick(key, summary, modifyFun);

        event.preventDefault();
        return false;
    });
}

function appendIconNew(node, modifyFun, image) {
    var button = document.createElement("button");
    button.dataset.type = "jira-copy-comments";
    button.innerHTML = '<span><svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><image xlink:href="' + chrome.runtime.getURL(image) + '"  height="24" width="24" /></svg></span>';
    button.addEventListener('click', async function () {
        var issueIdNode = document.querySelector('[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]')
        var issueSummaryNode = document.querySelector('[data-test-id="issue.views.issue-base.foundation.summary.heading"]')

        var key = issueIdNode.innerText;
        var summary = issueSummaryNode.innerText;

        await handleClick(key, summary, modifyFun);
    });

    var div = document.createElement("div");
    div.dataset.type = "jira-copy-comments";
    div.className = "jcc-n-container"
    div.append(button);

    node.appendChild(div);
}

function setIcons() {
    var elems = document.querySelectorAll('[data-type="jira-copy-comments"]');
    for (var i = elems.length - 1; i >= 0; i--) {
        elems[i].remove();
    };

    // Old Issue View

    var boardTools = document.getElementById('ghx-modes-tools');
    if (boardTools) {
        var button = document.createElement("button");
        button.dataset.type = "jira-copy-comments";
        button.className = "aui-button ghx-actions-tools";
        appendBranchButton(button);
        boardTools.insertBefore(button, boardTools.children[0]);

        var button = document.createElement("button");
        button.dataset.type = "jira-copy-comments";
        button.className = "aui-button ghx-actions-tools";
        appendTextButton(button);
        boardTools.insertBefore(button, boardTools.children[0]);
    }

    var issueContent = document.getElementById("issue-content");
    var detailTools = (issueContent && issueContent.getElementsByClassName("toolbar-split-right")[0]);
    if (detailTools) {
        var list = document.createElement("ul")
        list.dataset.type = "jira-copy-comments";
        list.className = "toolbar-group pluggable-ops"
        var item = document.createElement("li");
        item.className = "toolbar-item";
        var a = document.createElement("a");
        a.href = "#";
        a.className = "toolbar-trigger";
        appendBranchButton(a);
        item.appendChild(a);
        list.appendChild(item);
        detailTools.insertBefore(list, detailTools.children[0]);

        var group = document.createElement("ul")
        group.dataset.type = "jira-copy-comments";
        group.className = "toolbar-group pluggable-ops"
        var button = document.createElement("li");
        button.className = "toolbar-item";
        var a = document.createElement("a");
        a.href = "#";
        a.className = "toolbar-trigger";
        appendTextButton(a);
        button.appendChild(a);
        group.appendChild(button);
        detailTools.insertBefore(group, detailTools.children[0]);
    }

    var content = document.getElementById("content");
    var listTools = (content && content.getElementsByClassName("operations")[0]);
    if (listTools) {
        var item = document.createElement("li");
        item.dataset.type = "jira-copy-comments";
        item.className = "pluggable-ops  no-hover-focus-mark";
        var a = document.createElement("a");
        a.href = "#";
        a.className = "aui-button";
        appendBranchButton(a);
        item.appendChild(a);
        listTools.insertBefore(item, listTools.children[0]);

        var item = document.createElement("li");
        item.dataset.type = "jira-copy-comments";
        item.className = "pluggable-ops  no-hover-focus-mark";
        var a = document.createElement("a");
        a.href = "#";
        a.className = "aui-button";
        appendTextButton(a);
        item.appendChild(a);
        listTools.insertBefore(item, listTools.children[0]);
    }

    // New Issue View

    var issueHeaderActions = document.getElementById("jira-issue-header-actions");
    if (issueHeaderActions) {
        var container = document.querySelector("#jira-issue-header-actions > div > div");
        if (container) {
            appendIconNew(container, textBranchName, "ic_call_split_black_24px.svg");
            appendIconNew(container, textSimpleConcat, "ic_assignment_black_24px.svg");
        }
    }

    var dialogIssueHeader = document.getElementById('jira-issue-header')
    if (dialogIssueHeader) {
        var container = dialogIssueHeader.querySelector('#jira-issue-header > div > div > div > div > div > div + div > div')
        if (container) {
            appendIconNew(container, textBranchName, "ic_call_split_black_24px.svg");
            appendIconNew(container, textSimpleConcat, "ic_assignment_black_24px.svg");
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
