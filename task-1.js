const lang = prompt("Выберите язык (ru/en):");
// a) Через if
console.log("--- Через if ---");
if (lang === "ru") {
  console.log("Понедельник");
  console.log("Вторник");
  console.log("Среда");
  console.log("Четверг");
  console.log("Пятница");
  console.log("Суббота");
  console.log("Воскресенье");
} else if (lang === "en") {
  console.log("Monday");
  console.log("Tuesday");
  console.log("Wednesday");
  console.log("Thursday");
  console.log("Friday");
  console.log("Saturday");
  console.log("Sunday");
} else {
  console.log("Неизвестный язык");
}
// b) Через switch-case
console.log("\n--- Через switch-case ---");
switch (lang) {
  case "ru":
    console.log("Понедельник");
    console.log("Вторник");
    console.log("Среда");
    console.log("Четверг");
    console.log("Пятница");
    console.log("Суббота");
    console.log("Воскресенье");
    break;
  case "en":
    console.log("Monday");
    console.log("Tuesday");
    console.log("Wednesday");
    console.log("Thursday");
    console.log("Friday");
    console.log("Saturday");
    console.log("Sunday");
    break;
  default:
    console.log("Неизвестный язык");
}
// через массив
console.log("\n--- Через многомерный массив ---");
const weekDays = {
  ru: [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ],
  en: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
};

const daysArray = weekDays[lang] || ["Неизвестный язык"];

for (let i = 0; i < daysArray.length; i++) {
  console.log(daysArray[i]);
}
