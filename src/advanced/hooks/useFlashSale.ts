import { useEffect } from 'react';
import { useProductStore } from '../stores/useProductStore';

const SALE_PROBABILITY = 0.3;
const SALE_DISCOUNT_RATE = 0.8;
const SALE_MESSAGE_DELAY = 10000;
const SALE_MESSAGE_INTERVAL = 30000;
const SALE_DISCOUNT_PERCENT = 20;

const SALE_MESSAGE = (name) => `번개세일! ${name}이(가) ${SALE_DISCOUNT_PERCENT}% 할인 중입니다!`;

export function useFlashSale() {
  useEffect(() => {
    const delay = Math.random() * SALE_MESSAGE_DELAY;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        const items = useProductStore.getState?.().listItems;

        const randomItem = items[Math.floor(Math.random() * items.length)];
        if (Math.random() < SALE_PROBABILITY && randomItem.quantity > 0) {
          const updated = items.map((item) =>
            item.id === randomItem.id
              ? {
                  ...item,
                  price: Math.round(item.price * SALE_DISCOUNT_RATE),
                }
              : item,
          );

          useProductStore.setState?.({ listItems: updated });

          alert(SALE_MESSAGE(randomItem.name));
        }
      }, SALE_MESSAGE_INTERVAL);

      // cleanup
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);
}
