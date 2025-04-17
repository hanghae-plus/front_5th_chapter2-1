// hooks/useSuggestionAlert.ts
import { useEffect } from 'react';
import { Product } from '../types';
import { DISCOUNT } from '../constants';

export function useSuggestionAlert(
  products: Product[],
  lastSelectedId: string | null
) {

  function findAlternativeProduct() {
    return products.find(
      (item) => item.id !== lastSelectedId && item.quantity > 0
    );
  }

  useEffect(() => {
    const startDelay = Math.random() * 20000;
    const alarmTimer = setTimeout(() => {
      const suggestionInterval = setInterval(() => {
        if (!lastSelectedId) return;
        const alternativeProduct = findAlternativeProduct();
        if (alternativeProduct) {
          alert(
            ` ${alternativeProduct.name}은(는) 어떠세요? 지금 구매하시면 ${
              DISCOUNT.ADDITIONAL_RATE * 100
            }% 추가 할인됩니다!`
          );
        }
      }, 60000);
      return () => clearInterval(suggestionInterval);
    }, startDelay);
    return () => clearTimeout(alarmTimer);
  }, [products]);
}
