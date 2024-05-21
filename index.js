import debounce from "./utils/debounce.js";
import { createTimeZoneButton } from "./lib/timezone-navigation.js";
import {
  handleTransitionEnd,
  handleResize,
  handleClick,
} from "./lib/handlers.js";
import { fetchJson } from "./utils/fetchJson.js";

const initialize = async (citiesNav) => {
  const { cities } = await fetchJson("navigation.json");
  const citiesList = citiesNav.querySelector("ul");
  cities.forEach((city) => citiesList.append(createTimeZoneButton(city)));

  const underline = citiesNav.querySelector(".underline-highlight");
  underline.addEventListener("transitionend", handleTransitionEnd);

  const buttons = citiesNav.querySelectorAll(".timezone-list-btn");
  buttons.forEach((button) => button.addEventListener("click", handleClick));

  window.addEventListener("resize", debounce(handleResize));
  window
    .matchMedia("(min-width: 1024px)")
    .addEventListener("change", handleResize);
};

const citiesNav = document.querySelectorAll("[data-component='cities-nav']");
citiesNav.forEach(initialize);
