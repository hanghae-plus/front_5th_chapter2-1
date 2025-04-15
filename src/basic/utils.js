export const startRandomlyInMs = (ms) => (callback) => {
  const startsAt = Math.random(0) * ms;
  setTimeout(callback, startsAt);
};
