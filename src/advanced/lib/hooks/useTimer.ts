import { useEffect } from 'react';

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;

export const useTimer = (callback: () => void, interval: number, delay: number = 0) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(callback, interval);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, interval, delay]);
};
