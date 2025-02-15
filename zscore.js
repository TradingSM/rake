function calculateZScore() {
    let probability = parseFloat(document.getElementById("probability").value);

    if (probability < 0 || probability > 1 || isNaN(probability)) {
        document.getElementById("zscore-result").innerText = "Enter a valid probability (0-1)!";
        return;
    }

    let z = jStat.normal.inv(probability, 0, 1);
    document.getElementById("zscore-result").innerText = `Z-Score: ${z.toFixed(3)}`;
}

document.getElementById("probability").addEventListener("input", calculateZScore);
calculateZScore();
