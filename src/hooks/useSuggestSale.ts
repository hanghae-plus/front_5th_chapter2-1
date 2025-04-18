import {
  SUGGEST_ITEM_DELAY_TIME,
  SUGGEST_ITEM_DISCOUNT_RATE,
  SUGGEST_ITEM_INTERVAL_TIME,
} from '@/constants/constants';
import { scheduleRepeatingAlert } from '@/utils/tiem';

import products from '../data/products.json';

export default function useSuggestSale(lastSelectedItemId: string | null) {
  const findSuggestItem = () =>
    products.find(
      (item) => item.id !== lastSelectedItemId && item.quantity > 0,
    );

  const suggestProductAlert = () => {
    scheduleRepeatingAlert({
      delayRange: SUGGEST_ITEM_DELAY_TIME,
      interval: SUGGEST_ITEM_INTERVAL_TIME,
      condition: () => !!(lastSelectedItemId && findSuggestItem()),
      onTrigger: () => {
        const suggestedProduct = findSuggestItem();
        if (!suggestedProduct) return;

        alert(
          `${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 ${Math.round(
            SUGGEST_ITEM_DISCOUNT_RATE * 100,
          )}% 추가 할인!`,
        );
      },
    });
  };

  return { suggestProductAlert };
}
