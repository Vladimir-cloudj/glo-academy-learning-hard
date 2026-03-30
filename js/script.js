"use strict";

// DOM элементы
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

// CMS элементы
const cmsCheckbox = document.querySelector("#cms-open");
const cmsBlock = document.querySelector(".hidden-cms-variants");
const cmsSelect = document.querySelector("#cms-select");
const cmsOtherInputBlock = document.querySelector(
  ".hidden-cms-variants .main-controls__input"
);
const cmsOtherInput = document.querySelector("#cms-other-input");

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
  totalScreenCount: 0,
  cmsPercent: 0, // процент наценки CMS (0, 50, или пользовательский)
  cmsEnabled: false, // выбран ли чекбокс CMS

  init() {
    this.addTitle();
    startBtn.addEventListener("click", this.start.bind(this));
    resetBtn.addEventListener("click", this.reset.bind(this));
    buttonPlus.addEventListener("click", this.addScreenBlock.bind(this));

    // Ползунок отката
    inputRange.addEventListener("input", (e) => {
      const val = e.target.value;
      inputRangeValue.textContent = val + "%";
      this.rollback = parseFloat(val);
      if (this.isCalculated) {
        this.recalcWithCms(); // пересчитываем с учётом нового отката
      }
    });

    // CMS: чекбокс
    if (cmsCheckbox) {
      cmsCheckbox.addEventListener("change", (e) => {
        this.cmsEnabled = e.target.checked;
        if (this.cmsEnabled) {
          cmsBlock.style.display = "flex";
          // при открытии сбрасываем выбор на "выберите CMS"
          cmsSelect.selectedIndex = 0;
          this.handleCmsSelect(); // обновит процент и скроет поле ввода
        } else {
          cmsBlock.style.display = "none";
          cmsSelect.selectedIndex = 0;
          this.cmsPercent = 0;
          if (cmsOtherInputBlock) cmsOtherInputBlock.style.display = "none";
          if (cmsOtherInput) cmsOtherInput.value = "";
          // если уже был расчёт, пересчитываем без CMS
          if (this.isCalculated) this.recalcWithCms();
        }
      });
    }

    // CMS: выбор в селекте
    if (cmsSelect) {
      cmsSelect.addEventListener("change", () => this.handleCmsSelect());
    }

    // CMS: ручной ввод процента для "Другое"
    if (cmsOtherInput) {
      cmsOtherInput.addEventListener("input", () => {
        if (cmsSelect.value === "other") {
          let val = parseFloat(cmsOtherInput.value);
          if (isNaN(val)) val = 0;
          this.cmsPercent = val;
          if (this.isCalculated) this.recalcWithCms();
        }
      });
    }
  },

  addTitle() {
    document.title = title.textContent;
  },

  lockInputs() {
    document.querySelectorAll("select, input[type='text']").forEach((el) => {
      el.disabled = true;
    });
  },

  unlockInputs() {
    document.querySelectorAll("select, input[type='text']").forEach((el) => {
      el.disabled = false;
    });
  },

  toggleButtons() {
    startBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
  },

  toggleButtonsReset() {
    startBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
  },

  // Обработка выбора CMS
  handleCmsSelect() {
    if (!cmsSelect) return;
    const selectedValue = cmsSelect.value;
    if (selectedValue === "other") {
      // показываем поле ввода
      if (cmsOtherInputBlock) cmsOtherInputBlock.style.display = "flex";
      // процент берём из поля, если там что-то есть
      let val = parseFloat(cmsOtherInput.value);
      this.cmsPercent = isNaN(val) ? 0 : val;
    } else {
      // скрываем поле ввода
      if (cmsOtherInputBlock) cmsOtherInputBlock.style.display = "none";
      // числовой процент
      let percent = parseFloat(selectedValue);
      this.cmsPercent = isNaN(percent) ? 0 : percent;
    }
    if (this.isCalculated) {
      this.recalcWithCms();
    }
  },

  // Пересчёт с учётом CMS (используется при изменении CMS или отката после расчёта)
  recalcWithCms() {
    // Сначала получаем базовые значения (как в addPrices, но без CMS)
    let baseScreenPrice = 0;
    let baseServicePricesPercent = 0;
    let baseServicePricesNumber = 0;

    for (const screen of this.screens) {
      baseScreenPrice += screen.price;
    }
    for (const key in this.servicesNumber) {
      baseServicePricesNumber += this.servicesNumber[key];
    }
    for (const key in this.servicesPersent) {
      baseServicePricesPercent +=
        baseScreenPrice * (this.servicesPersent[key] / 100);
    }

    let baseFullPrice =
      baseScreenPrice + baseServicePricesPercent + baseServicePricesNumber;
    let cmsMarkup = 0;
    if (this.cmsEnabled && this.cmsPercent > 0) {
      cmsMarkup = baseFullPrice * (this.cmsPercent / 100);
    }
    this.fullPrice = baseFullPrice + cmsMarkup;
    this.screenPrice = baseScreenPrice;
    this.servicePricesPercent = baseServicePricesPercent;
    this.servicePricesNumber = baseServicePricesNumber;
    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);

    this.showResults();
  },

  start() {
    this.addScreens();
    this.addServices();
    // После сбора данных, но до расчёта цен, нужно учесть CMS.
    // Для этого вызовем recalcWithCms, который посчитает всё, включая наценку.
    // Но сначала нужно вычислить базовые данные (screenPrice, services и т.д.),
    // которые recalcWithCms использует. Поэтому мы сначала вызовем addPrices (или его часть),
    // но проще переделать: recalcWithCms сам пересчитает базовые данные, используя уже заполненные
    // this.screens, this.servicesPersent, this.servicesNumber.
    // Поэтому не вызываем addPrices отдельно.
    this.recalcWithCms();

    this.isCalculated = true;
    this.lockInputs();
    this.toggleButtons();
  },

  showResults() {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesNumber + this.servicePricesPercent;
    fullTotalCount.value = this.fullPrice;
    totalCount.value = this.totalScreenCount || 0;
    totalCountRollback.value = this.servicePercentPrice;
  },

  addScreens() {
    screens = document.querySelectorAll(".screen");
    this.screens = [];
    this.totalScreenCount = 0;

    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input =
        screen.querySelector("input[type='number']") ||
        screen.querySelector("input");

      if (!select || !input) return;

      let pricePerUnit = parseFloat(select.value);
      if (isNaN(pricePerUnit)) {
        const selectedOption = select.options[select.selectedIndex];
        pricePerUnit = parseFloat(
          selectedOption ? selectedOption.textContent : "0"
        );
        if (isNaN(pricePerUnit)) pricePerUnit = 0;
      }

      let count = parseInt(input.value);
      if (isNaN(count)) count = 0;

      const selectName =
        select.options[select.selectedIndex]?.textContent || "";

      this.screens.push({
        name: selectName,
        price: pricePerUnit * count,
        count: count,
      });

      this.totalScreenCount += count;
    });
  },

  addServices() {
    this.servicesPersent = {};
    this.servicesNumber = {};

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check && check.checked) {
        let value = 0;
        if (input && input.value !== "" && !isNaN(parseFloat(input.value))) {
          value = parseFloat(input.value);
        }
        this.servicesPersent[label?.textContent || ""] = value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check && check.checked) {
        let value = 0;
        if (input && input.value !== "" && !isNaN(parseFloat(input.value))) {
          value = parseFloat(input.value);
        }
        this.servicesNumber[label?.textContent || ""] = value;
      }
    });
  },

  // addPrices больше не используется, но оставим для совместимости (можно удалить)
  addPrices() {
    // пусто, вся логика теперь в recalcWithCms
  },

  addScreenBlock() {
    if (screens.length === 0) return;
    const cloneScreen = screens[0].cloneNode(true);
    const clonedSelect = cloneScreen.querySelector("select");
    const clonedInput =
      cloneScreen.querySelector("input[type='number']") ||
      cloneScreen.querySelector("input");
    if (clonedSelect) clonedSelect.selectedIndex = 0;
    if (clonedInput) clonedInput.value = "";
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(".screen");
  },

  reset() {
    // 1. Удаляем все дополнительные блоки экранов
    const allScreens = document.querySelectorAll(".screen");
    for (let i = allScreens.length - 1; i > 0; i--) {
      allScreens[i].remove();
    }
    screens = document.querySelectorAll(".screen");

    // 2. Сбрасываем первый блок
    const firstScreen = screens[0];
    if (firstScreen) {
      const select = firstScreen.querySelector("select");
      const numberInput =
        firstScreen.querySelector("input[type='number']") ||
        firstScreen.querySelector("input");
      if (select) select.selectedIndex = 0;
      if (numberInput) numberInput.value = "";
    }

    // 3. Сбрасываем доп. услуги
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const text = item.querySelector("input[type=text]");
      if (check) check.checked = false;
      if (text) text.value = "";
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const text = item.querySelector("input[type=text]");
      if (check) check.checked = false;
      if (text) text.value = "";
    });

    // 4. Сбрасываем ползунок
    inputRange.value = 10;
    inputRangeValue.textContent = "10%";
    this.rollback = 10;

    // 5. Сбрасываем CMS
    if (cmsCheckbox) cmsCheckbox.checked = false;
    if (cmsBlock) cmsBlock.style.display = "none";
    if (cmsSelect) cmsSelect.selectedIndex = 0;
    if (cmsOtherInputBlock) cmsOtherInputBlock.style.display = "none";
    if (cmsOtherInput) cmsOtherInput.value = "";
    this.cmsEnabled = false;
    this.cmsPercent = 0;

    // 6. Сбрасываем данные объекта
    this.screens = [];
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPersent = {};
    this.servicesNumber = {};
    this.totalScreenCount = 0;
    this.isCalculated = false;

    // 7. Очищаем поля вывода
    const totalInputs = document.querySelectorAll(".total-input");
    totalInputs.forEach((input) => {
      if (input) input.value = "";
    });

    // 8. Разблокируем поля
    this.unlockInputs();

    // 9. Переключаем кнопки
    this.toggleButtonsReset();
  },

  logger() {
    console.log(this.fullPrice, this.servicePercentPrice);
  },
};

appData.init();
