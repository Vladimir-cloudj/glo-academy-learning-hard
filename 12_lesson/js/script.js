'use strict'
const headerElement = document.getElementsByTagName("h1")[0]; 

const handlerBtns = document.getElementsByClassName("handler_btn");
const calculateBtn = handlerBtns[0]; 
const resetBtn = handlerBtns[1]; 

const plusBtn = document.querySelector(".screen-btn");

const percentItems = document.querySelectorAll(".other-items.percent");
const numberItems = document.querySelectorAll(".other-items.number");

const rangeInput = document.querySelector('.rollback input[type="range"]');

const rangeValueSpan = document.querySelector(".rollback .range-value");

const totalInputs = document.getElementsByClassName("total-input");

let screenBlocks = document.querySelectorAll(".screen");

// ==============================
//  выводим в консоль
console.log("=== ПРОВЕРКА ЭЛЕМЕНТОВ ===");
console.log("Заголовок (h1):", headerElement);
console.log("Кнопка 'Рассчитать':", calculateBtn);
console.log("Кнопка 'Сброс':", resetBtn);
console.log("Кнопка '+':", plusBtn);
console.log("Элементы .other-items.percent:", percentItems);
console.log("Элементы .other-items.number:", numberItems);
console.log("Range input:", rangeInput);
console.log("Range value span:", rangeValueSpan);
console.log("Total inputs:", totalInputs);
console.log("Screen blocks:", screenBlocks);

