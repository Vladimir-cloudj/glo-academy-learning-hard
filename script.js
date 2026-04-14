const ball = document.getElementById("ball");
const canvas = document.getElementById("canvas");
const toggleBtn = document.getElementById("toggleBtn");
const resetBtn = document.getElementById("resetBtn");

let animationId = null; 
let isRunning = true; 
let startTime = null; 
let pausedTime = 0;

const DURATION = 3000; 
const MAX_X = 360;
const MAX_Y = 260;

function getBallPosition(progress) {

  const vertical = Math.sin(progress * Math.PI);

  const horizontal = progress;

  return {
    x: horizontal * MAX_X,
    y: vertical * MAX_Y,
  };
}

function animate(timestamp) {
  if (!isRunning) {
    animationId = requestAnimationFrame(animate);
    return;
  }

  if (!startTime) startTime = timestamp;

  const elapsed = pausedTime + (timestamp - startTime);

  let progress = elapsed / DURATION;

  if (progress >= 1) {
    progress = 0;
    startTime = timestamp;
    pausedTime = 0;
  }

  const pos = getBallPosition(progress);

  ball.style.left = pos.x + "px";
  ball.style.bottom = pos.y + "px";

  animationId = requestAnimationFrame(animate);
}

toggleBtn.addEventListener("click", () => {
  isRunning = !isRunning; 

  if (isRunning) {
    startTime = null;
    toggleBtn.textContent = "⏸ Пауза";
  } else {
    if (startTime) {
      pausedTime += performance.now() - startTime;
    }
    toggleBtn.textContent = "Продолжить";
  }
});

resetBtn.addEventListener("click", () => {
  isRunning = true;
  startTime = null;
  pausedTime = 0;
  toggleBtn.textContent = "Пауза";

  ball.style.left = "0px";
  ball.style.bottom = "0px";

  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  animate(performance.now());
});

animationId = requestAnimationFrame(animate);
