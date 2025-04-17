export function setupIntervalWithDelay(callback: () => void, interval: number, delay: number) {
  const intervalId = setInterval(callback, interval);

  setTimeout(() => {
    callback();
  }, delay);

  return intervalId;
}
