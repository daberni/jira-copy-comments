// ==UserScript==
// @name           JIRA copy comment
// @namespace      https://troiisoftware.atlassian.net/*
// @include        https://troiisoftware.atlassian.net/*
// ==/UserScript==

(function() {
	var keyElement = document.getElementById('key-val');
	console.log(keyElement);
	var summaryElement = document.getElementsByTagName('h1')[0];
	console.log(summaryElement);
	var comment = keyElement.innerHTML + ' - ' + summaryElement.childNodes[0].nodeValue.replace(/^\s\s*/, '').replace(/\s\s*$/, '') + ' \n' + window.location;
	console.log(comment);

	var url = 'http://troii.com/zeroclipboard/ClipboardInterface.html'; // URL pointing to ClipboardInterface.html
	var el = document.createElement("iframe");
	el.src = url + "#" + escape(comment);
	el.style.cssText = 'border: none; height: 22px; width: 20px; padding-right: 4px;';
	keyElement.parentNode.insertBefore(el, keyElement.nextSibling);
})();