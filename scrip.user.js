// ==UserScript==
// @name           JIRA copy comment
// @namespace      https://troiisoftware.atlassian.net/*
// @include        https://troiisoftware.atlassian.net/*
// ==/UserScript==

(function() {

	var keyElement = document.getElementById('key-val');
	var comment = keyElement.innerHTML + " " + document.getElementById('summary-val').innerHTML.trim();

	var url = 'http://troii.com/zeroclipboard/ClipboardInterface.html'; // URL pointing to ClipboardInterface.html
	var el = document.createElement("iframe");
	el.src = url + "#" + escape(comment);
	el.style.cssText = 'border: none; height: 22px; width: 20px; padding-right: 10px;';
	keyElement.parentNode.insertBefore(el, keyElement.nextSibling);

})();
