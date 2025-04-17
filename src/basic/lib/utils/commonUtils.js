export function registerRecurringTask(callback, interval = 30000, delay = Math.random() * 10000) {
  setTimeout(() => {
    setInterval(() => {
      callback();
    }, interval);
  }, delay);
}
