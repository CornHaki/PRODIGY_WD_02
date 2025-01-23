// Variables
let timer;
let isRunning = false;
let milliseconds = 0, seconds = 0, minutes = 0;
let lapCount = 0;

// DOM Elements
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const lapsContainer = document.getElementById("laps");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

// Start Timer
startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTimer, 10);
  }
});

// Pause Timer
pauseBtn.addEventListener("click", () => {
  isRunning = false;
  clearInterval(timer);
});

// Reset Timer
resetBtn.addEventListener("click", () => {
  isRunning = false;
  clearInterval(timer);
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  lapCount = 0;
  updateDisplay();
  lapsContainer.innerHTML = ""; // Clear laps
});

// Lap Timer
lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const lapItem = document.createElement("li");
    lapItem.innerHTML = `
      <span>${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}</span>
      <span>Lap ${lapCount + 1}</span>
    `;
    lapsContainer.appendChild(lapItem);
    lapCount++;
  }
});

// Update Timer
function updateTimer() {
  milliseconds += 1;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds += 1;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }
  updateDisplay();
}

// Update Display
function updateDisplay() {
  minutesEl.textContent = formatTime(minutes);
  secondsEl.textContent = formatTime(seconds);
  millisecondsEl.textContent = formatTime(milliseconds);
}

// Format Time (Add Leading Zeros)
function formatTime(unit) {
  return unit.toString().padStart(2, '0');
}