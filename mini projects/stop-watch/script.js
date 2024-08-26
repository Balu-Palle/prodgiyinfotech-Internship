// Variables to track time
let h = 0, m = 0, s = 0, ms = 0;
let timer;
const display = document.querySelector('.watch');
const lapDisplay = document.getElementById('lapDisplay');
const lapTimes = [];

// Function to start the stopwatch
function start() {
    if (!timer) {
        timer = setInterval(run, 10);
    }
}

// Function to update the time and display it
function run() {
    ms++;
    if (ms === 100) {
        ms = 0;
        s++;
    }
    if (s === 60) {
        s = 0;
        m++;
    }
    if (m === 60) {
        m = 0;
        h++;
    }
    if (h === 12) {
        reset(); // Optionally reset after 12 hours
        start(); // Restart after reset
    }
    display.innerHTML = getTimer();
}

// Function to format the timer
function getTimer() {
    return `${h < 10 ? "0" + h : h} : ${m < 10 ? "0" + m : m} : ${s < 10 ? "0" + s : s} : ${ms < 10 ? "0" + ms : ms}`;
}

// Function to pause the stopwatch
function pause() {
    clearInterval(timer);
    timer = null;
}

// Function to reset the stopwatch
function reset() {
    clearInterval(timer);
    timer = null;
    h = 0;
    m = 0;
    s = 0;
    ms = 0;
    display.innerHTML = getTimer();
    lapDisplay.innerHTML = ''; // Clear lap display
    lapTimes.length = 0; // Clear lap times
}

// Function to record a lap
function lap() {
    const lapTime = getTimer();
    lapTimes.push(lapTime);
    lapDisplay.innerHTML = lapTimes.map((time, index) => `<div>Lap ${index + 1}: ${time}</div>`).join('');
}

// Function to restart the stopwatch and lap recording
function restart() {
    reset();
    start();
}

// Function to restart lap recording without stopping the stopwatch
function restartLap() {
    lapTimes.length = 0; // Clear lap times
    lapDisplay.innerHTML = ''; // Clear lap display
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('pause').addEventListener('click', pause);
    document.getElementById('reset').addEventListener('click', reset);
    document.getElementById('lap').addEventListener('click', lap);
    document.getElementById('restart-lap').addEventListener('click', restartLap);
    document.getElementById('restart').addEventListener('click', restart);
});
