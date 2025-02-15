function calculateZScore() {
    let probability = parseFloat(document.getElementById("probability").value);

    if (isNaN(probability) || probability < 0 || probability > 1) {
        document.getElementById("zscore-result").innerText = "Enter a valid probability (0-1)!";
        return;
    }

    let z;
    if (probability === 1) {
        z = "∞";  // Positive Infinity
    } else if (probability === 0) {
        z = "-∞"; // Negative Infinity
    } else {
        z = jStat.normal.inv(probability, 0, 1).toFixed(3);
    }

    document.getElementById("zscore-result").innerText = `Z-Score: ${z}`;
}

// Attach event listener
document.getElementById("probability").addEventListener("input", calculateZScore);
calculateZScore();
