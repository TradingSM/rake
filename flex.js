// flex.js

document.addEventListener("DOMContentLoaded", () => {
  const flexForm = document.getElementById("flex-form");
  const addTierBtn = document.getElementById("add-tier");
  const calculateBtn = document.getElementById("flex-calculate");
  const resultBox = document.getElementById("flex-result");
  const tiersContainer = document.getElementById("tiers-container");

  addTierBtn.addEventListener("click", () => {
    const div = document.createElement("div");
    div.className = "input-row";
    div.innerHTML = `
      <input type="number" placeholder="Tier" class="tier" step="1" min="1">
      <input type="number" placeholder="Probability (0–1)" class="prob" step="0.0001" min="0" max="1">
      <button class="remove">✖</button>
    `;
    div.querySelector(".remove").addEventListener("click", () => div.remove());
    tiersContainer.appendChild(div);
  });

  calculateBtn.addEventListener("click", () => {
    const tierElems = document.querySelectorAll(".tier");
    const probElems = document.querySelectorAll(".prob");
    let probabilitiesByTier = {};

    for (let i = 0; i < tierElems.length; i++) {
      const tier = parseInt(tierElems[i].value);
      const prob = parseFloat(probElems[i].value);
      if (!isNaN(tier) && !isNaN(prob)) {
        probabilitiesByTier[tier] = prob;
      }
    }

    const fixedMultiplier = parseFloat(document.getElementById("fixed-multiplier").value);
    const fixedProb = parseFloat(document.getElementById("fixed-prob").value);

    const result = computeFlexPayouts(probabilitiesByTier, fixedMultiplier, fixedProb);
    if (!result) {
      resultBox.textContent = "No valid payout structure found.";
      return;
    }

    const { multipliers, evTarget, evActual } = result;
    let html = `<div>Target EV: ${evTarget.toFixed(4)} | Flex EV: ${evActual.toFixed(4)}</div>`;
    html += `<ul style='padding-left: 0'>`;
    Object.keys(multipliers)
      .sort((a, b) => b - a)
      .forEach(tier => {
        html += `<li>${tier} correct → ${multipliers[tier].toFixed(4)}x</li>`;
      });
    html += `</ul>`;
    resultBox.innerHTML = html;
  });
});

function computeFlexPayouts(probabilities, fixedMultiplier, fixedProb) {
  const topFlexFraction = 0.25;
  const minRelativeDrop = 4;
  const minCap = 0.2;

  const sortedTiers = Object.keys(probabilities)
    .map(Number)
    .sort((a, b) => b - a);

  const targetEV = fixedMultiplier * fixedProb;

  for (let count = sortedTiers.length; count > 1; count--) {
    const flexTiers = sortedTiers.slice(0, count);
    const flexProbs = flexTiers.map(t => probabilities[t]);
    const topPayout = fixedMultiplier * topFlexFraction;

    let bestMultipliers = null;

    for (let trial = 1; trial <= 200; trial++) {
      let base = trial / 100;
      let multipliers = [topPayout];
      for (let i = 1; i < flexTiers.length; i++) {
        let m = base / Math.pow(1 + minRelativeDrop, i - 1);
        multipliers.push(Math.max(m, minCap));
      }
      const ev = multipliers.reduce((acc, m, i) => acc + m * flexProbs[i], 0);
      if (Math.abs(ev - targetEV) < 0.001) {
        bestMultipliers = multipliers;
        return {
          multipliers: Object.fromEntries(flexTiers.map((t, i) => [t, bestMultipliers[i]])),
          evTarget: targetEV,
          evActual: ev
        };
      }
    }
  }

  return null;
}
