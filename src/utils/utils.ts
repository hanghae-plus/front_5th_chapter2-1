export const scheduleRepeatingAlert = ({
  delayRange,
  interval,
  condition,
  onTrigger,
}: {
  delayRange: number;
  interval: number;
  condition: () => boolean;
  onTrigger: () => void;
}) => {
  setTimeout(function loop() {
    if (condition()) {
      onTrigger();
    }
    setTimeout(loop, interval);
  }, delayRange || 0);
};
