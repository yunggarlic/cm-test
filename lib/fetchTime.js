export const fetchTime = (timezone) => {
  return new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
};

export function updateClock(time) {
  const clockElement = document.querySelector(".clock");
  const now = fetchTime(time);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;
  clockElement.textContent = timeString;
}

export const setClockUpdate = (timezone) => {
  updateClock(timezone);
  const id = setInterval(() => {
    updateClock(timezone);
  }, 1000);

  return id;
};
