// Задача 1
const arr = ['23', '45', '56', '78', '490', '123', '134'];
// через методы массивов
let result = arr.filter(number => {
    const firstChar = number.charAt(0);
    if (firstChar === '2' || firstChar === '4') {
        return firstChar;
    }
})
// console.log(result);
// через циклы
for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === '2' || arr[i][0] === '4') {
        console.log(arr[i]);
    }
}
// Задача 2 прростые числа
// через циклы
for (let i = 1; i <= 100; i++) {
  let isSimple = true;
  if (i < 2) {
    isSimple = false; 
  } else if (i === 2) {
  } else if (i % 2 === 0) {
    isSimple = false; 
  } else {
    const sqrt = Math.sqrt(i);
    for (let j = 3; j <= sqrt; j += 2) {
      if (i % j === 0) {
        isSimple = false; 
        break; 
      }
    }
  }
  if (isSimple) {
    console.log(`${i} - Делители этого числа: 1 и ${i}`);
  }
}
// через методы массивов
const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
const primeNumbers = numbers.filter((num) => {
  let isSimple = true; 
  if (num < 2) {
    isSimple = false; 
  } else if (num === 2) {
  } else if (num % 2 === 0) {
    isSimple = false; 
  } else {
    const sqrt = Math.sqrt(num);
    for (let j = 3; j <= sqrt; j += 2) {
      if (num % j === 0) {
        isSimple = false; 
        break; 
      }
    }
  }

  return isSimple; 
});
primeNumbers.forEach((num) => {
  console.log(`${num} - Делители этого числа: 1 и ${num}`);
});
// через отдельную функцию isSimple
function isSimple2(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  const sqrt = Math.sqrt(num);
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) return false;
  }

  return true;
}
const numbers2 = Array.from({ length: 100 }, (_, index) => index + 1);
const simpleNumbers = numbers2.filter(isSimple2);

simpleNumbers.forEach((num) => {
  console.log(`${num} - Делители этого числа: 1 и ${num}`);
});