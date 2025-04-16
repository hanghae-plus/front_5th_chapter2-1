export function setSaleTimeout(action, interval, delay) {
  const randomDelay = Math.random() * delay;

  setTimeout(() => {
    setInterval(action, interval);
  }, randomDelay);
}
