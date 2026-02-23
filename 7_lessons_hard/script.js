'use strict'

const week = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота"
];

const today = new Date();
const currentDayIndex = today.getDay();

const container = document.getElementById("daysContainer");

for (let key in week) {
  const dayElement = document.createElement("div");
  dayElement.textContent = week[key];
  dayElement.className = "day";
  if (key == 0 || key == 6) {
    dayElement.classList.add("weekend");
  }
  if (key == currentDayIndex) {
    dayElement.classList.add("current-day");
  }
  container.appendChild(dayElement);
}