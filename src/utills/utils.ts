export const scheduleRepeatingAlert = ({
  delayRange = 10000,
  interval = 30000,
  condition,
  onTrigger,
}) => {
  setTimeout(() => {
    setInterval(() => {
      if (condition()) {
        onTrigger();
      }
    }, interval);
  }, Math.random() * delayRange);
};
