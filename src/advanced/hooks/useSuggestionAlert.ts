// hooks/useSuggestionAlert.ts
import { useEffect } from 'react';
import { Product } from '../types';
import { DISCOUNT } from '../constants';

export function useSuggestionAlert(
  products: Product[],
  lastSelectedId: string | null
) {
  useEffect(() => {
    console.log("suggestion");
    const startDelay = Math.random() * 20000;
    const alarmTimer = setTimeout(() => {
      const suggestionInterval = setInterval(() => {
        if (!lastSelectedId) return;
        const alt = products.find(
          (p) => p.id !== lastSelectedId && p.quantity > 0
        );
        if (alt) {
          alert(
            `💡 ${alt.name}은(는) 어떠세요? 지금 구매하시면 ${
              DISCOUNT.ADDITIONAL_RATE * 100
            }% 추가 할인됩니다!`
          );
        }
      }, 60000);
      return () => clearInterval(suggestionInterval);
    }, startDelay);
    return () => clearTimeout(alarmTimer);
  }, []);
}
