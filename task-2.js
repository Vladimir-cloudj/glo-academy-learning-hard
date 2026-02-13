const namePerson = prompt("Введите имя:");
// Через тернарные операторы
const role =
  namePerson === "Артем"
    ? "директор"
    : namePerson === "Александр"
    ? "преподаватель"
    : "студент";

console.log(`\n--- Определение роли ---`);
console.log(`${namePerson} - ${role}`);

// Альтернативный вариант - через объект
console.log("\n--- Альтернативный вариант через объект ---");
const roles = {
  Артем: "директор",
  Александр: "преподаватель",
};

const personRole = roles[namePerson] || "студент";
console.log(`${namePerson} - ${personRole}`);
