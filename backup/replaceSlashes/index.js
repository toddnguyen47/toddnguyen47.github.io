var replaceSlashesSubmitButton = document.getElementById("replaceSlashesSubmitButton");
replaceSlashesSubmitButton.onclick = function() {
	let initTextElem = document.getElementById("initInput");
	let contents = initTextElem.value;

	let replaced = String(contents).replace(/\\/g, "/");
	let outputElem = document.getElementById("textOutput");
	outputElem.value = replaced;
	// Auto select and focus
	outputElem.focus();
	outputElem.select();
}


var replaceSlashesCopyButton = document.getElementById("replaceSlashesCopyButton");
replaceSlashesCopyButton.onclick = function() {
	let outputElem = document.getElementById("textOutput");
	// Auto select and focus
	outputElem.focus();
	outputElem.select();
	document.execCommand('copy');
	alert("Copied");
}