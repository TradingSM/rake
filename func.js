function enforceNumericInput(event) {
    let inputValue = event.target.value;

    // Allow only numbers and a single decimal point
    if (!/^\d*\.?\d*$/.test(inputValue)) {
        event.target.value = inputValue.slice(0, -1); // Remove last invalid character
    }
}

function calculateRake() {
    let o1 = parseFloat(document.getElementById("o1").value);
    let o2 = parseFloat(document.getElementById("o2").value);

    if (o1 <= 0 || o2 <= 0 || isNaN(o1) || isNaN(o2)) {
        document.getElementById("result").innerText = "Enter valid odds!";
        return;
    }

    let p1 = 1 / o1;
    let p2 = 1 / o2;
    let rakePercentage = ((p1 + p2) - 1) * 100;

    document.getElementById("result").innerText = `Vig: ${rakePercentage.toFixed(2)}%`;
}

// Attach event listeners to enforce numeric input (including decimal support)
document.getElementById("o1").addEventListener("input", enforceNumericInput);
document.getElementById("o2").addEventListener("input", enforceNumericInput);

// Attach event listeners to trigger calculation on input change
document.getElementById("o1").addEventListener("input", calculateRake);
document.getElementById("o2").addEventListener("input", calculateRake);

// Run initially
calculateRake();
