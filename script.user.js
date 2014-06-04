(function() {
	var issueElement = document.getElementById('key-val');
	if (!issueElement) {
		return; // not on an issue page
	}

	var issue = issueElement.innerHTML;
	var comment = issue;
	if (document.body.innerText) {
		comment += " " + document.getElementById('summary-val').innerText.trim();
	} else {
		comment += " " + document.getElementById('summary-val').innerHTML.replace(/\&lt;br\&gt;/gi,"\n").replace(/(&lt;([^&gt;]+)&gt;)/gi, "");
	}
	appendIcon(comment, "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUZJREFUeNqkU71KxEAQ3gPBQiuLvIJ5Ak2eIuns0qU4e4urUuYBBAOmCyKIVd5BiNfZWtsYCyFwYszuZt1v7i9eNlFwYJjdnW8+vpndnSil2H9sz3SYZdmVDtPVNgmC4HyIYAIFdzOXCj6OTtnX4TElwjCkmKYpxf3FMzt4nxPhWVxsCUFwe3GiPl+fVBzHqq5rVVWVKsuSHGucIQcMsKhZO7UgZcsWLw/Mtm0WRZFRquM4hAG2NwMhWtZq932ffMjeHi8J2yfgkgkp6SDP803Sdd3N2rIswgDbI+BcMMnbXtGuAQOsgUAzi2WiKApjsed5hOEmBaLZShtTQK02phYaodnloII1KTDAjrYwqmCoBQymqwAku0qWM5DmIaI3ubpfALvxxy1ojPEa8TjwwuY3s19/n/Eh6eLk/jqd/vEHJ93NtwADAFlI6xErpSp9AAAAAElFTkSuQmCC");
	
	var name = issue;
	if (document.body.innerText) {
		name += "-" + document.getElementById('summary-val').innerText.trim();
	} else {
		name += "-" + document.getElementById('summary-val').innerHTML.replace(/\&lt;br\&gt;/gi,"\n").replace(/(&lt;([^&gt;]+)&gt;)/gi, "");
	}
	name = name.substring(0, issue.length + 25)
		.replace('ä', 'ae')
		.replace('ö', 'oe')
		.replace('ü', 'ue')
		.replace('ß', 'sz')
		.replace('&', 'and')
		.replace(/[^\w-]/g, '_');
	appendIcon(name, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAALiIAAC4iAari3ZIAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAPdJREFUOE+NkTEOAUEUhlett+EOGtxAnEKnV5JoVRKdA7iAM+g1iA0JDqBDRYOM7+3ui8nYYb/kk9038/+7ZgMfxpgKbnGNYTrOB4EiHlDZYb4SNsqTa9hHm/8lbJCwPPmCDezgDBV/CQsaVjbpXJRzUL5LGLhh4YZVlPWeDCw+JVxkhZUJtlHOZIAnVJISfuRT+ZCCLp6xjAWcorJy/5+LFgjN9I1HyW1MJIMQ5XWysAuuOMdnfGfMHst6DlklD2xhHe8ysPiEFQZuyRF1bRFPEr7DCgtuyRiH+IrvfoUVNvjO5H9YYaOU2J83f1ghUMIlRv5wELwB97Ju+zgKEekAAAAASUVORK5CYII=");
})();

function appendIcon(message, image) {
	var img = document.createElement("img");
	img.style.cssText = "position: relative; top: 3px;";
	img.src = image;
	
	var anchor = document.createElement("a");
	anchor.href = "#";
	anchor.style.cssText = "padding-top: 9px;";
	anchor.appendChild(img);
	anchor.addEventListener('click', function() {
		alert(message);
	});
	
	var listitem = document.createElement("li");
	listitem.appendChild(anchor);
	
	var createMenu = document.getElementById('create-menu');
	createMenu.parentNode.appendChild(listitem);
}