const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const daysOfWeek = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

function formatA(date) {
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hoursStr = getDeclension(hours, ["час", "часа", "часов"]);
  const minutesStr = getDeclension(minutes, ["минута", "минуты", "минут"]);
  const secondsStr = getDeclension(seconds, ["секунда", "секунды", "секунд"]);

  return `Сегодня ${dayOfWeek}, ${day} ${month} ${year} года, ${hours} ${hoursStr} ${minutes} ${minutesStr} ${seconds} ${secondsStr}`;
}

function getDeclension(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2]; 
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return titles[2];
  }

  return titles[lastDigit > 4 ? 2 : cases[lastDigit]];
}

function padZero(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

function formatB(date) {
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); 
  const year = date.getFullYear();

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
}

function updateDateTime() {
  const now = new Date();

  const formattedA = formatA(now);
  const formattedB = formatB(now);

  document.getElementById("formatA").textContent = formattedA;
  document.getElementById("formatB").textContent = formattedB;
}

setInterval(updateDateTime, 1000);

updateDateTime();
