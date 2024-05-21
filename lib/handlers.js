import {
  moveLineToButton,
  resetLineDimensions,
} from "./timezone-navigation.js";

export const handleTransitionEnd = (e) => {
  const citiesNav = e.target.closest("[data-component='cities-nav']");

  const underline = citiesNav.querySelector(".underline-highlight");
  underline.classList.add("transitioned");

  const activeButton = citiesNav.querySelector(".timezone-list-btn.active");
  if (activeButton) activeButton.classList.add("transitioned");
};

export const handleResize = () => {
  const citiesNavs = document.querySelectorAll("[data-component='cities-nav']");

  citiesNavs.forEach((citiesNav) => {
    const activeButton = citiesNav.querySelector(".timezone-list-btn.active");
    const underline = citiesNav.querySelector(".underline-highlight");
    resetLineDimensions(underline);
    if (activeButton) moveLineToButton(underline, activeButton);
  });
};

export const handleClick = (e) => {
  const button = e.target;
  const citiesNav = button.closest("[data-component='cities-nav']");
  const underline = citiesNav.querySelector(".underline-highlight");
  const buttons = citiesNav.querySelectorAll(".timezone-list-btn");

  underline.classList.remove("transitioned");
  buttons.forEach((btn) => btn.classList.remove("active", "transitioned"));
  button.classList.add("active");

  moveLineToButton(underline, button);
};
