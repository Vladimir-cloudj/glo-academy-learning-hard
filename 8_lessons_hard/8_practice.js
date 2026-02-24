"use strict";
// объявление переменных
// --------------------
const appData = {
  title: "",
  screens: [], // Теперь это массив объектов
  screenPrice: 0, // Будет сумма цен экранов после addPrices
  adaptive: true,
  services: {}, // Объект для хранения услуг
  rollback: 10,
  allServicePrices: 0, // Будет сумма цен услуг после addPrices
  fullPrice: 0, // Рассчитывается в getFullPrice
  formattedTitle: "", // Рассчитывается в getTitle
  servicePercentPrice: 0, // Рассчитывается в getServicePercentPrices

  isNumber: function (str) {
    const num = Number(str);
    return str.trim() !== "" && !isNaN(num) && isFinite(num);
  },

  isStringWithText: function (str) {
    if (typeof str !== "string") return false;
    const trimmed = str.trim();
    if (trimmed === "") return false;
    return trimmed;
  },

  asking: function () {
    let projectTitle;
    do {
      projectTitle = prompt(
        "Как называется ваш проект?",
        "калькулятор верстки"
      );
      if (projectTitle === null) {
        alert("Ввод отменен. Используется значение по умолчанию.");
        projectTitle = "калькулятор верстки";
        break;
      }
    } while (!this.isStringWithText(projectTitle));
    appData.title = projectTitle;

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt(
          "Какие типы экранов нужно разработать?",
          "Простые, Сложные"
        );
        if (name === null) {
          alert("Ввод отменен. Используется значение по умолчанию.");
          name = "Простые, Сложные";
          break;
        }
      } while (!this.isStringWithText(name));

      let priceStr;
      do {
        priceStr = prompt("Сколько будет стоить данная работа", 15000);
        if (priceStr === null) {
          alert("Ввод отменен. Используется значение по умолчанию.");
          priceStr = "15000";
          break;
        }
      } while (!this.isNumber(priceStr));

      const priceNum = Number(priceStr);
      appData.screens.push({ id: i, name: name, price: priceNum });
    }

    for (let i = 0; i < 2; i++) {
      let serviceName;
      do {
        serviceName = prompt(
          "Какой дополнительный тип услуги нужен",
          "метрика"
        );
        if (serviceName === null) {
          alert("Ввод отменен. Используется значение по умолчанию.");
          serviceName = "метрика";
          break;
        }
      } while (!this.isStringWithText(serviceName));

      let servicePriceStr;
      do {
        servicePriceStr = prompt("Сколько это будет стоить?", 1000);
        if (servicePriceStr === null) {
          alert("Ввод отменен. Используется значение по умолчанию.");
          servicePriceStr = "1000";
          break;
        }
      } while (!this.isNumber(servicePriceStr));

      const servicePriceNum = Number(servicePriceStr);

      // обновление логики------------
      // ---------------------------
      let uniqueServiceName = serviceName;
      let counter = 1;
      while (appData.services.hasOwnProperty(uniqueServiceName)) {
        uniqueServiceName = `${serviceName}_${counter}`;
        counter++;
      }
      appData.services[uniqueServiceName] = servicePriceNum;
    }

    appData.adaptive = confirm("Нужен ли будет адаптив на сайте?");
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce((total, screen) => {
      if (typeof screen.price === "number" && !isNaN(screen.price)) {
        return total + screen.price;
      }
      return total;
    }, 0);

    appData.allServicePrices = 0; 
    for (let serviceName in appData.services) {
      if (appData.services.hasOwnProperty(serviceName)) {
        const price = appData.services[serviceName];
        if (typeof price === "number" && !isNaN(price)) {
          appData.allServicePrices += price;
        }
      }
    }
  },

  getRollbackMessage: function (price) {
    if (typeof price !== "number" || isNaN(price)) {
      console.log("переменная стоимость разработки не число");
      return 'неверный формат "стоимость разработки"';
    }
    if (price >= 30000) {
      return "Даем скидку в 10% ";
    } else if (price > 15000 && price < 30000) {
      return "Даем скидку в 5% ";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена ";
    } else {
      return "Что-то пошло не так ";
    }
  },

  getServicePercentPrices: function () {
    if (typeof appData.fullPrice !== "number" || isNaN(appData.fullPrice)) {
      console.log("стоимость разработки не число");
      appData.servicePercentPrice = 0;
      return; 
    }
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  getTitle: function () {
    if (typeof appData.title !== "string") {
      console.log("название не является строкой");
      appData.formattedTitle = "";
      return;
    }
    const trimmedTitle = appData.title.trim();
    if (trimmedTitle.length === 0) {
      appData.formattedTitle = "";
      return; 
    }
    appData.formattedTitle =
      trimmedTitle[0].toUpperCase() + trimmedTitle.slice(1).toLowerCase();
  },

  getFullPrice: function () {
    const basePrice =
      typeof appData.screenPrice === "number" && !isNaN(appData.screenPrice)
        ? appData.screenPrice
        : 0;
    const additionalServices =
      typeof appData.allServicePrices === "number" &&
      !isNaN(appData.allServicePrices)
        ? appData.allServicePrices
        : 0;
    appData.fullPrice = basePrice + additionalServices;
  },

  showTypeOf: function (variable, variableName) {
    console.log(`Тип данных переменной ${variableName}`, typeof variable);
  },

  start: function () {
    appData.asking(); 
    appData.addPrices(); 
    appData.getFullPrice(); 
    appData.getTitle(); 
    appData.getServicePercentPrices(); 
    appData.logger();
  },

  logger: function () {
    for (let key in appData) {
      if (typeof appData[key] !== "function") {
        console.log(`Свойство ${key}: ${appData[key]}`);
      } else {
        console.log(`Метод ${key}: [Function]`);
      }
    }
  },
};

appData.start();
