console.log("Yo");

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


var convertBackwardHexSubmitButton = document.getElementById("convertBackwardHexSubmitButton");
convertBackwardHexSubmitButton.onclick = function() {
	let inputElem = document.getElementById("binaryInput0");
	let contents = inputElem.value;
	contents = contents.split(' ').join('');

	let reversedString = contents.split('').reverse().join('');
	// If the length of the reversed string is not divisible by 4,
	// add a 0 in front of it
	while (reversedString.length % 4 !== 0) {
		reversedString = "0" + reversedString;
	}
	console.log(reversedString);
	
	// Convert to hex
	let hexIntStr = parseInt(reversedString, '2').toString().trim();
	while (hexIntStr.length % 2 !== 0) {
		hexIntStr = "0" + hexIntStr;
	}
	hexIntStr = convertBinaryToHex(reversedString);
	hexIntStr = "0x" + hexIntStr;

	
	// Set otuput value to another textbox
	let outputElem = document.getElementById("hexOutput0");
	outputElem.value = hexIntStr;
}


// Convert a binary input to hex string
function convertBinaryToHex(strInput) {
	var binHexDict = {
		"0000": "0",
		"0001": "1",
		"0010": "2",
		"0011": "3",
		"0100": "4",
		"0101": "5",
		"0110": "6",
		"0111": "7",
		"1000": "8",
		"1001": "9",
		"1010": "A",
		"1011": "B",
		"1100": "C",
		"1101": "D",
		"1110": "E",
		"1111": "F",
	}

	let strLen = strInput.length;
	if (strLen % 4 !== 0) {
		alert("Incorrect binary string length");
		return "0";
	}

	var hexNum = "";
	var startIndex = 0;
	var endIndex = startIndex + 4;
	
	// Split binary string into fours
	while (endIndex <= strLen) {
		let curBinary = strInput.substring(startIndex, endIndex);
		startIndex = endIndex;
		endIndex += 4;

		hexNum += binHexDict[curBinary];
	}

	return hexNum;
}


console.log("End");
