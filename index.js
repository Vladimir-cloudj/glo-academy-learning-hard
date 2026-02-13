// 1) Создать переменную num со значением 266219 (тип данных число)
const num = 266219;
console.log("Исходное число:", num, typeof num);

// 2) Вывести в консоль произведение (умножение) цифр этого числа
// Преобразуем число в строку, разбиваем на массив символов,
// преобразуем каждый символ в число и перемножаем

const digits = num.toString().split("");
console.log("Цифры числа:", digits);


const product = digits.reduce((acc, digit) => acc * Number(digit), 1);
console.log("Произведение цифр:", product);

// 3) Полученный результат возвести в степень 3, используя только 1 оператор (**)
const powered = product ** 3;
console.log("Результат возводим в степень 3:", powered);

// 4) Вывести в консоль первые 2 цифры полученного числа
const firstTwoDigits = powered.toString().slice(0, 2);
console.log("Первые 2 цифры результата:", firstTwoDigits);

