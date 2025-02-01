import { updateClock } from "./time-animation.js";

export const fetchTime = (timezone) => {
  return new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
};

export function setInitialClockTime(time) {
  const timeStringArr = getTimeStringArray(time);

  const clockElement = Array.from(document.querySelectorAll(".time-number"));
  clockElement.sort((a, b) => a.dataset.timeNumber - b.dataset.timeNumber)
  clockElement.forEach((a) => {
    const currentNumber = a.querySelector(".current-number");
    currentNumber.textContent = timeStringArr[a.dataset.timeNumber - 1]
  })
}

export const setClockUpdate = (timezone) => {
  updateClock(timezone);
  const id = setInterval(() => {
    updateClock(timezone);
  }, 1000);

  return id;
};

// each index of the array represents a time numeral in order
// [0] = hours tens place
// [1] = hours ones place
// [2] = minutes tens place
// [3] = minutes ones place
// [4] = seconds tens place
// [5] = seconds ones place
export const getTimeStringArray = (time) => {
  const now = fetchTime(time);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return [...hours, ...minutes, ...seconds]
}