// ==UserScript==
// @name           JIRA copy comment
// @namespace      https://troiisoftware.atlassian.net/*
// @include        https://troiisoftware.atlassian.net/*
// ==/UserScript==

(function() {
	// a function that loads jQuery and calls a callback function when jQuery has finished loading
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}

	// the guts of this userscript
	function main() {
		var keyElement = $('#key-val');
		var comment = keyElement.text() + ' - ' + $('#summary-val').text().trim();

		var url = 'http://troii.com/zeroclipboard/ClipboardInterface.html'; // URL pointing to ClipboardInterface.html
		var el = document.createElement("iframe");
		el.src = url + "#" + escape(comment);
		el.style.cssText = 'border: none; height: 22px; width: 20px; padding-right: 10px;';
		keyElement.parent().after(el);
	}

	// load jQuery and execute the main function
	addJQuery(main);

})();
