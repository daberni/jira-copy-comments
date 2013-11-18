(function() {
	var keyElement = document.getElementById('key-val');
	var comment = keyElement.innerHTML

	if (document.body.innerText) {
		comment += " " + document.getElementById('summary-val').innerText.trim();
	} else {
		comment += " " + document.getElementById('summary-val').innerHTML.replace(/\&lt;br\&gt;/gi,"\n").replace(/(&lt;([^&gt;]+)&gt;)/gi, "");
	}
	
	var img = document.createElement("img");
	img.style.cssText = "position: relative; top: 3px;";
	img.src =  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUZJREFUeNqkU71KxEAQ3gPBQiuLvIJ5Ak2eIuns0qU4e4urUuYBBAOmCyKIVd5BiNfZWtsYCyFwYszuZt1v7i9eNlFwYJjdnW8+vpndnSil2H9sz3SYZdmVDtPVNgmC4HyIYAIFdzOXCj6OTtnX4TElwjCkmKYpxf3FMzt4nxPhWVxsCUFwe3GiPl+fVBzHqq5rVVWVKsuSHGucIQcMsKhZO7UgZcsWLw/Mtm0WRZFRquM4hAG2NwMhWtZq932ffMjeHi8J2yfgkgkp6SDP803Sdd3N2rIswgDbI+BcMMnbXtGuAQOsgUAzi2WiKApjsed5hOEmBaLZShtTQK02phYaodnloII1KTDAjrYwqmCoBQymqwAku0qWM5DmIaI3ubpfALvxxy1ojPEa8TjwwuY3s19/n/Eh6eLk/jqd/vEHJ93NtwADAFlI6xErpSp9AAAAAElFTkSuQmCC";
	
	var anchor = document.createElement("a");
	anchor.href = "#";
	anchor.style.cssText = "padding-top: 9px;";
	anchor.appendChild(img);
	anchor.addEventListener('click', function() {
		alert(comment);
	});
	
	var listitem = document.createElement("li");
	listitem.style.cssText = "margin-left: 10px;";
	listitem.appendChild(anchor);
	
	var createMenu = document.getElementById('create-menu');
	createMenu.parentNode.insertBefore(listitem, createMenu.nextSibling);

})();
