export const startRandomlyInMs = (ms: number) => (callback: () => void) => {
  const startsAt = Math.random() * ms;
  setTimeout(callback, startsAt);
};
