// hooks/usePromotions.ts
import { useEffect, useRef } from 'react';
import { Item } from '../types';

export const usePromotion = (
  items: Item[],
  applyDiscount: (itemId: string, discountPercent: number) => void
) => {
  const recentSelectedIdRef = useRef<string | null>(null);

  useEffect(() => {
    // 번개세일 타이머
    const luckyTimer = setTimeout(() => {
      const luckyInterval = setInterval(() => {
        const luckyItemIndex = Math.floor(Math.random() * items.length);
        const luckyItem = items[luckyItemIndex];

        if (Math.random() < 0.3 && luckyItem.q > 0) {
          applyDiscount(luckyItem.id, 0.2);
          alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        }
      }, 30000);

      return () => clearInterval(luckyInterval);
    }, Math.random() * 10000);

    // 추천 상품 타이머
    const suggestTimer = setTimeout(() => {
      const suggestInterval = setInterval(() => {
        if (recentSelectedIdRef.current) {
          const suggestedProduct = items.find(
            (item) => item.id !== recentSelectedIdRef.current && item.q > 0
          );

          if (suggestedProduct) {
            applyDiscount(suggestedProduct.id, 0.05);
            alert(`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
          }
        }
      }, 60000);

      return () => clearInterval(suggestInterval);
    }, Math.random() * 20000);

    return () => {
      clearTimeout(luckyTimer);
      clearTimeout(suggestTimer);
    };
  }, [items, applyDiscount]);

  const setRecentSelectedId = (id: string | null) => {
    recentSelectedIdRef.current = id;
  };

  return {
    setRecentSelectedId,
  };
};
