let isAlertVisible = false;

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
    if (!isAlertVisible && condition()) {
      isAlertVisible = true;
      onTrigger();
      setTimeout(() => {
        isAlertVisible = false;
      }, 1000);
    }
    setTimeout(loop, interval);
  }, delayRange || 0);
};
