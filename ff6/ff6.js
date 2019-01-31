var convertBackwardHexSubmitButton = document.getElementById("convertBackwardHexSubmitButton");
convertBackwardHexSubmitButton.onclick = function() {
	let inputElem = document.getElementById("binaryInput0");
	let contents = inputElem.value;
	contents = contents.split(' ').join('');

	let reversedString = reverseString(contents);
	
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


/**
 * Reverse a string
 * @param {*} strInput - A binary string with a length divisible by 4.
 */
function reverseString(strInput) {
	let reversedString = strInput.split('').reverse().join('');
	// If the length of the reversed string is not divisible by 4,
	// add a 0 in front of it
	while (reversedString.length % 4 !== 0) {
		reversedString = "0" + reversedString;
	}
	return reversedString;
}


/**
 * Convert a binary strInput to a hexInput.
 * @param {*} strInput - A binary string with a length divisible by 4.
 */
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


var gauRageButton = document.getElementById("gauRageButton");
gauRageButton.onclick = function() {
	// Get the form
	var curForm = document.forms['gauRageCheckboxes'];
	let maxOutputs = 32;

	// Get all check outputs
	for (i = 0; i < maxOutputs; i++) {
		let groupId = "group" + i;
		var elems = curForm.elements[groupId];
		var binaryString = "";

		elems.forEach((elem) => {
			let isChecked = elem.checked;
			if (isChecked) {binaryString += "1";}
			else {binaryString += "0";}
		});

		// Gotta reverse the string first. FF6 is weird
		let hexString = convertBinaryToHex(reverseString(binaryString));
		outputGauRage(groupId, "0x" + hexString, true);
	}
}


/**
 * Output the hex number into the output text fields.
 * @param {*} idInput Integer ID of input
 * @param {*} output The output value
 * @param {*} changeRedTextClass `true` if we want to enable changing text to red 
 *            if value changed, `false` otherwise
 */
function outputGauRage(idInput, output, changeRedTextClass) {
	let outputId = idInput + "Output";
	let elem = document.getElementById(outputId);
	// If output is 0x00 then leave the value empty
	if (output === "0x00") {
		output = "";
	}
	
	if (changeRedTextClass) {
		// If the value is the same as previous value, remove the redText class
		if (elem.value === output) {
			elem.classList.remove("redText");
		}
		// If the value changed, color it red
		else {
			elem.classList.add("redText");
		}
	}
	elem.value = output;
}


/**
 * Check the necessary checkboxes.
 * @param {*} listInput A list of binary inputs to indicate whether the checkboxes
 * should be checked or not.
 */
function checkTheCheckboxes(listInput) {
	// Get the form
	var curForm = document.forms['gauRageCheckboxes'];
	// Gau has 32 groups of rages
	let maxOutputs = 32;
	let lenListInput = listInput.length;

	// Get all check outputs
	for (i = 0; i < maxOutputs; i++) {
		let groupId = "group" + i;
		var elems = curForm.elements[groupId];
		
		var curInput = [0, 0, 0, 0, 0, 0, 0, 0];
		// If the length of array is still in range
		if (i < lenListInput) {
			curInput = listInput[i];
		}
		// Since FF6 saves little-endian bits, we have to reverse our traversal
		var count = 7;

		// For each group
		elems.forEach((elem) => {
			elem.checked = true ? curInput[count] > 0 : false;
			count -= 1;
		});
	}
}


// ****************************************************************************
// Add the functionality of clearing all checkboxes
var clearCheckboxesButton = document.getElementById("clearAllCheckboxes");
clearCheckboxesButton.addEventListener('click', clearAllCheckboxes);

function clearAllCheckboxes() {
	let answer = confirm("Are you sure you want to clear all checkboxes?");
	// If user confirms yes
	if (answer) {
		// Get the form
		var curForm = document.forms['gauRageCheckboxes'];
		// Gau has 32 groups of rages
		let maxOutputs = 32;

		// Get all check outputs
		for (i = 0; i < maxOutputs; i++) {
			let groupId = "group" + i;
			var elems = curForm.elements[groupId];

			// For each group
			elems.forEach((elem) => {
				elem.checked = false;
			});

			// Clear the output areas as well
			outputGauRage(groupId, "", false);
		}
	}
}
// o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o


// ****************************************************************************
// What happens when the user clicks on the "input hex form" button
var inputHexFormButton = document.getElementById("inputHexFormButton");
inputHexFormButton.addEventListener('click', function(evt) {
	var hexTextArea = document.getElementById("hexInput0");
	var content = hexTextArea.value.toUpperCase();
	var contentList = content.split('');
	var outputList = [];
	let maxLength = contentList.length >> 1;

	for (i = 0; i < maxLength; i++) {
		let hex1 = contentList[i * 2];
		let hex2 = contentList[i * 2 + 1];
		
		// Pad 4 zeros to the beginning of string
		// Reference: https://stackoverflow.com/a/20460414
		let binary1 = parseInt(hex1, 16).toString(2);
		binary1 = ('0000' + binary1).slice(-4);

		let binary2 = parseInt(hex2, 16).toString(2);
		binary2 = ('0000' + binary2).slice(-4);

		outputList.push(binary1 + binary2);

		// Output to the output areas
		outputGauRage("group" + i, "0x" + hex1 + hex2, false);
	}

	// If contentList.length is odd, push the last number into list anyway
	if (contentList.length % 2 === 1) {
		let hex1 = contentList[contentList.length - 1];
		let binary1 = parseInt(hex1, 16).toString(2);
		binary1 = ('0000' + binary1).slice(-4);
		outputList.push(binary1);
	}

	// Check checkboxes accordingly
	checkTheCheckboxes(outputList);
});
// o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o--o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o
