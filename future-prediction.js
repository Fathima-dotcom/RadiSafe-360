/* =====================================================
   RADISAFE 360 - FUTURE PREDICTION PROTOTYPE
   ===================================================== */

const stateData = {
    "Andhra Pradesh": { level: "Less", score: 46 },
    "Arunachal Pradesh": { level: "Less", score: 35 },
    "Assam": { level: "Moderate", score: 52 },
    "Bihar": { level: "Moderate", score: 61 },
    "Chhattisgarh": { level: "Moderate", score: 60 },
    "Goa": { level: "Less", score: 35 },
    "Gujarat": { level: "High", score: 79 },
    "Haryana": { level: "Moderate", score: 57 },
    "Himachal Pradesh": { level: "Less", score: 38 },
    "Jharkhand": { level: "High", score: 73 },
    "Karnataka": { level: "Moderate", score: 62 },
    "Kerala": { level: "Less", score: 41 },
    "Madhya Pradesh": { level: "Moderate", score: 59 },
    "Maharashtra": { level: "High", score: 82 },
    "Manipur": { level: "Less", score: 37 },
    "Meghalaya": { level: "Less", score: 32 },
    "Mizoram": { level: "Less", score: 30 },
    "Nagaland": { level: "Less", score: 36 },
    "Odisha": { level: "Moderate", score: 67 },
    "Punjab": { level: "Less", score: 44 },
    "Rajasthan": { level: "Less", score: 39 },
    "Sikkim": { level: "Less", score: 31 },
    "Tamil Nadu": { level: "Moderate", score: 58 },
    "Telangana": { level: "Moderate", score: 68 },
    "Tripura": { level: "Less", score: 34 },
    "Uttar Pradesh": { level: "High", score: 76 },
    "Uttarakhand": { level: "Less", score: 30 },
    "West Bengal": { level: "Moderate", score: 64 },
    "Delhi": { level: "High", score: 85 },
    "Jammu and Kashmir": { level: "Less", score: 40 },
    "Ladakh": { level: "Less", score: 36 },
    "Andaman and Nicobar Islands": { level: "Less", score: 33 },
    "Chandigarh": { level: "Moderate", score: 55 },
    "Dadra and Nagar Haveli and Daman and Diu": { level: "Less", score: 42 },
    "Lakshadweep": { level: "Less", score: 29 },
    "Puducherry": { level: "Moderate", score: 53 }
};

function getLevel(score) {
    if (score <= 20) return "Very Low";
    if (score <= 40) return "Low";
    if (score <= 60) return "Moderate";
    if (score <= 80) return "High";
    return "Very High";
}

function clamp(value) {
    return Math.max(0, Math.min(100, Math.round(value)));
}

function renderForecast() {
    const params = new URLSearchParams(window.location.search);
    const state = params.get("state") || "Telangana";
    const data = stateData[state] || { level: "Moderate", score: 60 };
    const base = data.score;

    /*
       Prototype projection only.
       Replace these values with model/API output when verified data is connected.
    */
    const day1 = clamp(base + 1);
    const day3 = clamp(base + 2);
    const day7 = clamp(base + 3);

    document.getElementById("predictionState").textContent = state;
    document.getElementById("currentIndex").textContent = base;
    document.getElementById("predictionLevel").textContent = getLevel(base);

    document.getElementById("day1Value").textContent = day1;
    document.getElementById("day1Level").textContent = getLevel(day1);
    document.getElementById("day3Value").textContent = day3;
    document.getElementById("day3Level").textContent = getLevel(day3);
    document.getElementById("day7Value").textContent = day7;
    document.getElementById("day7Level").textContent = getLevel(day7);

    const pointer = document.getElementById("scalePointer");
    pointer.style.left = `calc(${base}% - 20px)`;
}

document.addEventListener("DOMContentLoaded", renderForecast);
function goBackHome() {
    window.location.href = "index.html";
}