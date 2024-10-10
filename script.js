let display = document.getElementById("display");
let notepad = document.getElementById("notepad");
let notepadTextbox = document.getElementById("notepadTextbox");
let sequence = [];
let secretCode = ['C', 'C', 'DEL', 'DEL', '5', '5', '4']; // Secret code

// Append number to display
function appendNumber(number) {
    display.value += number;
    sequence.push(number);
    checkSequence();
}

// Append operator to display
function appendOperator(operator) {
    if (display.value !== "") {
        display.value += operator;
        sequence.push(operator);
        checkSequence();
    }
}

// Clear display
function clearDisplay() {
    display.value = "";
    sequence.push('C');
    checkSequence();
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
    sequence.push('DEL');
    checkSequence();
}

// Calculate the result
function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

// Check if the sequence matches the secret code
function checkSequence() {
    if (sequence.length > secretCode.length) {
        sequence.shift();
    }

    if (JSON.stringify(sequence) === JSON.stringify(secretCode)) {
        revealNotepad();
    }
}

// Reveal the notepad
function revealNotepad() {
    notepad.classList.remove("hidden");
    notepad.classList.add("visible");
}

// Hide the notepad
function hideNotepad() {
    notepad.classList.remove("visible");
    notepad.classList.add("hidden");
}

// Function to download the notepad content as a .txt file
function downloadNotepad() {
    let text = notepadTextbox.value;

    if (text.trim() === "") {
        alert("The notepad is empty!");
        return;
    }

    // Create a blob with the notepad content
    let blob = new Blob([text], { type: "text/plain" });
    let url = window.URL.createObjectURL(blob);

    // Create a temporary link to download the file
    let a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "notepad.txt"; // File name
    document.body.appendChild(a);
    a.click();

    // Remove the temporary link
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
