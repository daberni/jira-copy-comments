function copyToClipboard(message) {
    var textarea = document.createElement("textarea");
    textarea.textContent = message;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
}

function appendIcon(modifyFun, image) {
    var img = document.createElement("img");
    img.style.cssText = "position: relative; top: 3px;";
    img.src = image;
    img.className = "jira-copy-comments";

    var anchor = document.createElement("a");
    anchor.href = "#";
    anchor.style.cssText = "padding-top: 9px;";
    anchor.appendChild(img);
    anchor.addEventListener('click', function (event) {
        var issueElement = document.getElementById('key-val');
        if (!issueElement) {
            issueElement = document.getElementById('issuekey-val');
        }
        var message = "";
        if (issueElement) {
            var key = issueElement.innerText;
            var message = document.getElementById('summary-val').innerText.trim();

            if (modifyFun) {
                message = modifyFun(key, message);
            } else {
                message = key + "-" + message;
            }
        } else {
            issueElement = document.getElementsByClassName('issuerow focused')[0];
            if (issueElement) {
                var key = issueElement.getElementsByClassName('issuekey')[0].getElementsByTagName('a')[0].innerText;
                var message = issueElement.getElementsByClassName('summary')[0].getElementsByTagName('a')[0].innerText;

                if (modifyFun) {
                    message = modifyFun(key, message);
                } else {
                    message = key + "-" + message;
                }
            }
        }

        anchor.setAttribute("data-clipboard-text", message);
        if (message) {
            if (document.queryCommandSupported("copy")) {
                copyToClipboard(message);
            } else {
                alert(message);
            }
        }

        event.preventDefault();
        return false;
    });

    var createMenu = document.getElementById('create-menu');
    if (createMenu) {
        var listitem = document.createElement("li");
        listitem.appendChild(anchor);

        createMenu.parentNode.appendChild(listitem);
    }
}

(function setIcons() {
    var elems = document.getElementsByClassName("jira-copy-comments");
    for (var i = elems.length - 1; i >= 0; i--) {
        elems[i].parentNode.parentNode.parentNode.removeChild(elems[i].parentNode.parentNode);
    };

    // Text
    appendIcon(function (key, message) {
        return key + " " + message;
    }, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUZJREFUeNqkU71KxEAQ3gPBQiuLvIJ5Ak2eIuns0qU4e4urUuYBBAOmCyKIVd5BiNfZWtsYCyFwYszuZt1v7i9eNlFwYJjdnW8+vpndnSil2H9sz3SYZdmVDtPVNgmC4HyIYAIFdzOXCj6OTtnX4TElwjCkmKYpxf3FMzt4nxPhWVxsCUFwe3GiPl+fVBzHqq5rVVWVKsuSHGucIQcMsKhZO7UgZcsWLw/Mtm0WRZFRquM4hAG2NwMhWtZq932ffMjeHi8J2yfgkgkp6SDP803Sdd3N2rIswgDbI+BcMMnbXtGuAQOsgUAzi2WiKApjsed5hOEmBaLZShtTQK02phYaodnloII1KTDAjrYwqmCoBQymqwAku0qWM5DmIaI3ubpfALvxxy1ojPEa8TjwwuY3s19/n/Eh6eLk/jqd/vEHJ93NtwADAFlI6xErpSp9AAAAAElFTkSuQmCC");
    
    // Branch name
    appendIcon(function (key, message) {
        return key + "-" + message.substring(0, 30)
            .replace('ä', 'ae')
            .replace('ö', 'oe')
            .replace('ü', 'ue')
            .replace('ß', 'sz')
            .replace('&', 'and')
            .replace(/[^\w-]/g, '_');
    }, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAALiIAAC4iAari3ZIAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAPdJREFUOE+NkTEOAUEUhlett+EOGtxAnEKnV5JoVRKdA7iAM+g1iA0JDqBDRYOM7+3ui8nYYb/kk9038/+7ZgMfxpgKbnGNYTrOB4EiHlDZYb4SNsqTa9hHm/8lbJCwPPmCDezgDBV/CQsaVjbpXJRzUL5LGLhh4YZVlPWeDCw+JVxkhZUJtlHOZIAnVJISfuRT+ZCCLp6xjAWcorJy/5+LFgjN9I1HyW1MJIMQ5XWysAuuOMdnfGfMHst6DlklD2xhHe8ysPiEFQZuyRF1bRFPEr7DCgtuyRiH+IrvfoUVNvjO5H9YYaOU2J83f1ghUMIlRv5wELwB97Ju+zgKEekAAAAASUVORK5CYII=");
})();
