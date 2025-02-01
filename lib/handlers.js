import {
  moveLineToButton,
  resetLineDimensions,
} from "./timezone-navigation.js";
import { setClockUpdate, setInitialClockTime } from "./fetchTime.js";
import { createNextTimeElement, promoteNextNumberToCurrent } from "./time-animation.js";

export const handleTransitionEnd = (e) => {
  const citiesNav = e.target.closest("[data-component='cities-nav'] nav");

  const underline = citiesNav.querySelector(".underline-highlight");
  underline.classList.add("transitioned");

  const activeButton = citiesNav.querySelector(".timezone-list-btn.active");
  if (activeButton) activeButton.classList.add("transitioned");
};

export const handleResize = () => {
  const citiesNavs = document.querySelectorAll("[data-component='cities-nav'] nav");

  citiesNavs.forEach((citiesNav) => {
    const activeButton = citiesNav.querySelector(".timezone-list-btn.active");
    const underline = citiesNav.querySelector(".underline-highlight");
    resetLineDimensions(underline);
    if (activeButton) moveLineToButton(underline, activeButton);
  });
};

export const handleCurrentTimeNumberTransitionEnd = (e) => e.target.remove();
export const handleNextTimeNumberTransitionEnd = (e) => {  
  promoteNextNumberToCurrent(e.target);
  const timeNumberContainer = e.target.closest(".time-number");
  timeNumberContainer.appendChild(createNextTimeElement());
};

export const handleClick = (e) => activateButton(e.target);

export const activateButton = (button) => {
  const citiesNav = button.closest("[data-component='cities-nav'] nav");
  const underline = citiesNav.querySelector(".underline-highlight");
  const buttons = citiesNav.querySelectorAll(".timezone-list-btn");

  underline.classList.remove("transitioned");
  buttons.forEach((btn) => {
    clearInterval(citiesNav.dataset.intervalId);
    citiesNav.dataset.intervalId = null;

    btn.classList.remove("active", "transitioned");
  });
  button.classList.add("active");

  moveLineToButton(underline, button);
  
  const intervalId = setClockUpdate(button.dataset.timezone) 
  citiesNav.dataset.intervalId = intervalId;
}
