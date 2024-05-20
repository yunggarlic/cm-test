/**
 * Debounce function
 * @param {*} fn
 * @param {*} delay
 * @returns {Function}
 */

export default function debounce(fn, delay = 200) {
  let timeoutID;
  return function (...args) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
