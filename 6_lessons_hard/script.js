"use strict";

function createGame() {
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  function playGame(counts = 10) {
    const userInput = +prompt(
      `Угадай число от 1 до 100\n(Осталось попыток: ${counts})`
    );
    if (userInput === null) {
      alert("Игра окончена. До свидания!");
      return;
    }
    if (isNaN(userInput)) {
      alert("Введи число!");
      playGame(counts);
      return;
    }
    if (userInput === secretNumber) {
      if (confirm("Поздравляю, Вы угадали!!! Хотели бы сыграть еще?")) {
        createGame();
      } else {
        alert("Игра окончена. До свидания!");
      }
      return;
    }
    if (counts > 1) {
      if (userInput < secretNumber) {
        alert(`Загаданное число больше, осталось попыток ${counts - 1}`);
      } else {
        alert(`Загаданное число меньше, осталось попыток ${counts - 1}`);
      }
      playGame(counts - 1);
    } else {
      if (
        confirm(
          `Попытки закончились, хотите сыграть еще раз? Загаданное число было ${secretNumber}`
        )
      ) {
        createGame();
      } else {
        alert("Игра окончена. До свидания!");
      }
    }
  }
  playGame(10);
}

createGame();
