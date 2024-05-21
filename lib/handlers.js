import {
  moveLineToButton,
  resetLineDimensions,
} from "./timezone-navigation.js";

export const handleTransitionEnd = () => {
  const activeButton = document.querySelector(".timezone-list-btn.active");
  const underline = document.querySelector(".underline-highlight");
  if (activeButton) activeButton.classList.add("transitioned");
  underline.classList.add("transitioned");
};

export const handleResize = () => {
  const activeButton = document.querySelector(".timezone-list-btn.active");
  const underline = document.querySelector(".underline-highlight");
  resetLineDimensions(underline);
  if (activeButton) moveLineToButton(underline, activeButton);
};

export const handleClick = (e) => {
  const underline = document.querySelector(".underline-highlight");
  const buttons = document.querySelectorAll(".timezone-list-btn");
  const button = e.target;

  underline.classList.remove("transitioned");
  buttons.forEach((btn) => btn.classList.remove("active", "transitioned"));
  button.classList.add("active");

  moveLineToButton(underline, button);
};
