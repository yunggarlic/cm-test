import debounce from "./utils/debounce.js";
import { createTimeZoneButton } from "./lib/timezone-navigation.js";
import {
  handleTransitionEnd,
  handleResize,
  handleClick,
  activateButton,
  handleCurrentTimeNumberTransitionEnd,
  handleNextTimeNumberTransitionEnd,
  handleTransitionToggle
} from "./lib/handlers.js";
import { fetchJson } from "./utils/fetchJson.js";
import { setInitialClockTime } from "./lib/fetchTime.js";

const initialize = () => {
  const citiesNav = document.querySelectorAll("[data-component='cities-nav'] nav");
  citiesNav.forEach(initializeCitiesNav);
}

const initializeCitiesNav = async (citiesNav) => {
  const { cities } = await fetchJson("navigation.json");
  initializeClock();

  const citiesList = citiesNav.querySelector("ul");
  cities.forEach((city, index) => citiesList.append(createTimeZoneButton(city, index)));

  const [firstCityItem] = citiesList.querySelectorAll(".timezone-list-el button");
  activateButton(firstCityItem);
  setInitialClockTime(firstCityItem.dataset.timezone);

  const transitionToggle = document.querySelector("#transition-direction");
  transitionToggle.addEventListener("click", handleTransitionToggle)

  const underline = citiesNav.querySelector(".underline-highlight");
  underline.addEventListener("transitionend", handleTransitionEnd);

  const buttons = citiesNav.querySelectorAll(".timezone-list-btn");
  buttons.forEach((button) => button.addEventListener("click", handleClick));

  window.addEventListener("resize", debounce(handleResize));
  window
    .matchMedia("(min-width: 1024px)")
    .addEventListener("change", handleResize);
}

const initializeClock = () => {
  const clock = document.querySelector(".clock");

  for (let i = 1; i <= 6; i++) {
    const timeNumber = document.createElement("div");
    timeNumber.classList.add("time-number");
    timeNumber.dataset.timeNumber = i;
    clock.append(timeNumber);

    const currentNumber = document.createElement("div");
    currentNumber.classList.add("current-number");
    currentNumber.dataset.currentNumber = i;
    timeNumber.append(currentNumber)

    currentNumber.addEventListener("transitionend", handleCurrentTimeNumberTransitionEnd);

    const nextNumberElement = document.createElement("div");
    nextNumberElement.classList.add("incoming-number");
    timeNumber.append(nextNumberElement);

    nextNumberElement.addEventListener("transitionend", handleNextTimeNumberTransitionEnd);

    if (i % 2 === 0 && i !== 6) {
      const colon = document.createElement("div");
      colon.classList.add("colon");
      colon.textContent = ":";
      clock.append(colon);
    }
  }
}

initialize();