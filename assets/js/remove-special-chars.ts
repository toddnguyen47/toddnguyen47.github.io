const asciiMaxVal = 127

function listenerSubmitButton(ev: MouseEvent) {
  const input = document.getElementById("textAreaInput") as HTMLInputElement;
  let noSpecialCharsStr = convertToAscii(input.value);

  // Replace all whitespace with a single space
  noSpecialCharsStr = noSpecialCharsStr.replace(/\s+/g, " ");

  const output = document.getElementById("textAreaOutput") as HTMLInputElement;
  output.value = noSpecialCharsStr;

  // Set number of characters
  const numberOfCharsSpan = document.getElementById("numberOfChars");
  if (numberOfCharsSpan !== null) {
    numberOfCharsSpan.textContent = noSpecialCharsStr.length.toString();
  }
}

function convertToAscii(strInput: string): string {
  const arr1: string[] = []
  for (let i = 0; i < strInput.length; i++) {
    if (strInput.charCodeAt(i) <= asciiMaxVal) {
      arr1.push(strInput.charAt(i));
    }
  }
  return arr1.join("").trim();
}

function listenerSelectAll(ev: MouseEvent) {
  const output = document.getElementById("textAreaOutput") as HTMLInputElement;
  output.select();
}
