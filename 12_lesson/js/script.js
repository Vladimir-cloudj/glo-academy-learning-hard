"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPersent: {},
  servicesNumber: {},
  isCalculated: false,

  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.start);
    buttonPlus.addEventListener("click", appData.addScreenBlock);

    inputRange.addEventListener("input", function () {
      const val = this.value;
      inputRangeValue.textContent = val + "%";
      appData.rollback = parseFloat(val);

      if (appData.isCalculated) {
        appData.servicePercentPrice =
          appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
        totalCountRollback.value = appData.servicePercentPrice;
      }
    });
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    let hasEmptyBlock = false;
    for (const screenBlock of screens) {
      const select = screenBlock.querySelector("select");
      const input = screenBlock.querySelector("input[type='number']");
      if (
        !select ||
        !input ||
        select.value === "" ||
        input.value === "" ||
        isNaN(Number(input.value))
      ) {
        hasEmptyBlock = true;
        break;
      }
    }

    if (hasEmptyBlock) {
      return;
    }

    appData.addScreens();
    appData.addServices();
    appData.addPrices();

    appData.isCalculated = true;

    console.log(appData);
    appData.showResults();
  },

  showResults: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesNumber + appData.servicePricesPercent;
    fullTotalCount.value = appData.fullPrice;
    totalCount.value = appData.totalScreenCount || 0;

    totalCountRollback.value = appData.servicePercentPrice;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    appData.screens = [];
    appData.totalScreenCount = 0;

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input[type='number']");
      const selectName = select.options[select.selectedIndex].textContent;
      const count = parseInt(input.value) || 0;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * count,
        count: count,
      });

      appData.totalScreenCount += count;
    });
    console.log(appData.screens);
  },

  addServices: function () {
    appData.servicesPersent = {};
    appData.servicesNumber = {};

    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesPersent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addPrices: function () {
    appData.screenPrice = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;

    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPersent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPersent[key] / 100);
    }

    appData.fullPrice =
      appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;

    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    const clonedSelect = cloneScreen.querySelector("select");
    const clonedInput = cloneScreen.querySelector("input[type='number']");
    if (clonedSelect) clonedSelect.selectedIndex = 0;
    if (clonedInput) clonedInput.value = "";
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(".screen");
  },

  logger: function () {
    console.log(appData.fullPrice, appData.servicePercentPrice);
  },
};

appData.init();
