let display = document.getElementById("display");
let secretNote = document.getElementById("secretNote"); // Div containing the textbox and the back button
let sequence = [];  // Array to track the sequence of pressed keys
let secretCode = ['C', 'C', 'DEL', 'DEL', '5', '5', '4']; // Secret combination

// Append number to display and sequence
function appendNumber(number) {
    display.value += number;
    sequence.push(number);
    checkSequence();
}

// Append operator to display and sequence
function appendOperator(operator) {
    if (display.value !== "") {
        display.value += operator;
        sequence.push(operator);
        checkSequence();
    }
}

// Clear display and add 'C' to the sequence
function clearDisplay() {
    display.value = "";
    sequence.push('C');
    checkSequence();
}

// Delete last character and add 'DEL' to the sequence
function deleteLast() {
    display.value = display.value.slice(0, -1);
    sequence.push('DEL');
    checkSequence();
}

// Calculate the result using eval (try-catch for error handling)
function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

// Check if the sequence matches the secret code
function checkSequence() {
    // Trim sequence to the length of the secret code
    if (sequence.length > secretCode.length) {
        sequence.shift();
    }

    // Check if sequence matches the secret code
    if (JSON.stringify(sequence) === JSON.stringify(secretCode)) {
        revealSecretTextbox();
    }
}

// Reveal the hidden textbox and "Back" button
function revealSecretTextbox() {
    secretNote.style.display = "block";
}

// Hide the hidden textbox and "Back" button
function hideSecretTextbox() {
    secretNote.style.display = "none";
}
