import { useEffect } from 'react';
import { useProductStore } from '../stores/useProductStore';

const SUGGEST_DISCOUNT_RATE = 0.95;
const SUGGEST_MESSAGE_DELAY = 20000;
const SUGGEST_MESSAGE_INTERVAL = 60000;
const SUGGEST_DISCOUNT_PERCENT = 5;

const SUGGEST_MESSAGE = (name) =>
  `${name}은(는) 어떠세요? 지금 구매하시면 ${SUGGEST_DISCOUNT_PERCENT}% 추가 할인!`;

export function useSuggestSale() {
  useEffect(() => {
    const delay = Math.random() * SUGGEST_MESSAGE_DELAY;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        const { listItems, lastSelectedItem } = useProductStore.getState?.();

        if (!lastSelectedItem) return;

        const suggestItem = listItems.find(
          (item) => item.id !== lastSelectedItem && item.quantity > 0,
        );

        if (suggestItem) {
          const updated = listItems.map((item) =>
            item.id === suggestItem.id
              ? {
                  ...item,
                  price: Math.round(item.price * SUGGEST_DISCOUNT_RATE),
                }
              : item,
          );

          useProductStore.setState?.({ listItems: updated });

          alert(SUGGEST_MESSAGE(suggestItem.name));
        }
      }, SUGGEST_MESSAGE_INTERVAL);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);
}
