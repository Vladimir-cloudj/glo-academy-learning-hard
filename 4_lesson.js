function processText(text) {
  if (text === undefined) {
    text = document.getElementById("textInput").value;
  }
  const resultDiv = document.getElementById("result");
  if (typeof text !== "string") {
    showAlert("Ошибка: аргумент должен быть строкой!", "error");
    return;
  }
  const trimmedText = text.trim();
  let finalText;
  if (trimmedText.length > 30) {
    finalText = trimmedText.substring(0, 30) + "...";
  } else {
    finalText = trimmedText;
  }
  showAlert(`Результат: "${finalText}"`, "success");
  return finalText;
}

function showAlert(message, type) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = message;
  resultDiv.className = `result ${type}`;
}
// проверка
console.log("Вход:", '"Привет, мир!"');
console.log("Выход:", processText("Привет, мир!"));
// 