// ==UserScript==
// @name           JIRA copy comment
// @namespace      https://troiisoftware.atlassian.net/*
// @include        https://troiisoftware.atlassian.net/*
// ==/UserScript==

(function() {

	var keyElement = document.getElementById('key-val');
	var comment = keyElement.innerHTML

	if (document.body.innerText) {
		comment += " " + document.getElementById('summary-val').innerText.trim();
	} else {
		comment += " " + document.getElementById('summary-val').innerHTML.replace(/\&lt;br\&gt;/gi,"\n").replace(/(&lt;([^&gt;]+)&gt;)/gi, "");
	}

	var url = 'http://troii.com/zeroclipboard/ClipboardInterface.html'; // URL pointing to ClipboardInterface.html
	var el = document.createElement("iframe");
	el.src = url + "#" + escape(comment);
	el.style.cssText = 'border: none; height: 32px; width: 20px; padding-right: 10px;';
	var createMenu = document.getElementById('create-menu');
	createMenu.parentNode.insertBefore(el, createMenu.nextSibling);

})();
