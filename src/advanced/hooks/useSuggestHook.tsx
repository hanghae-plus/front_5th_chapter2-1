import { useEffect, useRef } from 'react';
import { useProdListContext } from '../store/prodList/ProdListContext';
import { SALE_NUMBER, TIMER_NUMBER } from '../constants/numbers';
import { useSelectContext } from '../store/select/SelectContext';

export const useSuggestHook = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { prodList, setProdList } = useProdListContext();
  const { select } = useSelectContext();
  const suggestInterval = () => {
    if (select) {
      const suggestItem = prodList.find((item) => item.id !== select && item.quantity > 0);
      if (suggestItem) {
        setProdList(
          prodList.map((item) => {
            if (item.id === suggestItem.id) {
              return { ...item, price: Math.round(suggestItem.price * SALE_NUMBER.SUGGEST) };
            }
            return item;
          }),
        );
        alert(`${suggestItem.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
      }
    }
  };

  useEffect(() => {
    if (!timer.current) {
      setTimeout(() => {
        timer.current = setInterval(suggestInterval, TIMER_NUMBER.SUGGEST_INTERVAL);
      }, TIMER_NUMBER.SUGGEST_TIME);
    }

    return () => clearInterval(timer.current as NodeJS.Timeout);
  }, []);
};
