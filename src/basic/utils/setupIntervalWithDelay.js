export function setupIntervalWithDelay(callback, interval, delay) {
  setTimeout(function () {
    setInterval(callback, interval);
  }, delay);
}
