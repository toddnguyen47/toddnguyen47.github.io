console.log("Yo");

var submitButton = document.getElementById("submitButton");
submitButton.onclick = function() {
	let initTextElem = document.getElementById("initInput");
	let contents = initTextElem.value;

	let replaced = String(contents).replace(/\\/g, "/");
	let outputElem = document.getElementById("textOutput");
	outputElem.value = replaced;
	// Auto select and focus
	outputElem.focus();
	outputElem.select();
}


var copyButton = document.getElementById("copyButton");
copyButton.onclick = function() {
	let outputElem = document.getElementById("textOutput");
	// Auto select and focus
	outputElem.focus();
	outputElem.select();
	document.execCommand('copy');
}


console.log("End");
