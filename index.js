import debounce from "./utils/debounce.js";

window.addEventListener("resize", debounce(handleResize));
window
  .matchMedia("(min-width: 768px)")
  .addEventListener("change", handleResize);
function handleResize() {
  const activeButton = document.querySelector("nav button.active");
  const underline = document.querySelector(".underline-highlight");
  resetLineDimensions(underline);
  if (activeButton) moveLineToButton(underline, activeButton);
}

const underline = document.querySelector(".underline-highlight");
underline.addEventListener("transitionend", handleTransitionEnd);
function handleTransitionEnd() {
  const activeButton = document.querySelector("nav button.active");
  if (activeButton) activeButton.classList.add("transitioned");
  underline.classList.add("transitioned");
}

const buttons = document.querySelectorAll("nav button");
buttons.forEach((button) => button.addEventListener("click", handleClick));
function handleClick(e) {
  const underline = document.querySelector(".underline-highlight");
  underline.classList.remove("transitioned");

  const button = e.target;
  buttons.forEach((btn) => btn.classList.remove("active", "transitioned"));
  button.classList.add("active");

  moveLineToButton(underline, button);
}

function resetLineDimensions() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    underline.style.left = null; // breakpoint resets
    underline.style.width = "1px";
  } else {
    underline.style.top = null; // breakpoint resets
    underline.style.height = "1px";
  }
}

function moveLineToButton(underline, button) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const rect = button.getBoundingClientRect();
  const underlineSize = isMobile ? rect.height : rect.width;
  const underlinePosition = isMobile
    ? rect.top - underline.parentElement.getBoundingClientRect().top
    : rect.left - underline.parentElement.getBoundingClientRect().left;

  if (isMobile) {
    underline.style.height = `${underlineSize}px`;
    underline.style.top = `${underlinePosition}px`;
  } else {
    underline.style.width = `${underlineSize}px`;
    underline.style.left = `${underlinePosition}px`;
  }

  resetLineDimensions(underline);
}
