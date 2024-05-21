export const createTimeZoneButton = ({ section, label }) => {
  const li = document.createElement("li");
  li.classList.add("timezone-list-el");
  const button = document.createElement("button");
  button.classList.add("timezone-list-btn");

  button.textContent = label;
  button.dataset.section = section;

  li.appendChild(button);
  return li;
};

export function resetLineDimensions(underline) {
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;
  if (isMobile) {
    underline.style.left = null; // breakpoint resets
    underline.style.width = "1px";
  } else {
    underline.style.top = null; // breakpoint resets
    underline.style.height = "1px";
  }
}

export function moveLineToButton(underline, button) {
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;

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
