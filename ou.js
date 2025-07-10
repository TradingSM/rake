function calculateOU() {
    const probOver = parseFloat(document.getElementById("probOver").value);
    const marginalRake = parseFloat(document.getElementById("marginalRake").value);

    if (isNaN(probOver) || isNaN(marginalRake) || probOver < 0 || probOver > 1 || marginalRake < 0) {
        document.getElementById("ou-result").innerText = "Enter valid values!";
        return;
    }

    const probUnder = 1 - probOver;
    const rakeOver = probOver * marginalRake;
    const rakeUnder = probUnder * marginalRake;

    const multiplierOver = 1 / (probOver + rakeOver);
    const multiplierUnder = 1 / (probUnder + rakeUnder);

    document.getElementById("ou-result").innerText =
        `Over: ${multiplierOver.toFixed(2)}, Under: ${multiplierUnder.toFixed(2)}`;
}

document.getElementById("probOver").addEventListener("input", calculateOU);
document.getElementById("marginalRake").addEventListener("input", calculateOU);
calculateOU(); // run on load
