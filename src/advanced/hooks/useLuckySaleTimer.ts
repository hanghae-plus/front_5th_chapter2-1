import { useEffect } from "react";
import { SALE_CONFIG } from "../constants/sale-config";
import { useCartStore } from "../store/useCartStore";

//TODO updateSelectOptions어떻게할지 고민 필요

/**
 * 일정 시간 후 일정 간격으로 번개 세일 20% 할인을 시작하는 타이머 함수 hook
 */
export const useLuckySaleTimer = () => {
  const { products, updateProductPrice } = useCartStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        const luckyItem = products[Math.floor(Math.random() * products.length)];

        if (Math.random() < SALE_CONFIG.LUCKY_SALE_PROBABILITY && luckyItem.q > 0) {
          const newPrice = Math.round(luckyItem.val * SALE_CONFIG.LUCKY_SALE_DISCOUNT);
          updateProductPrice(luckyItem.id, newPrice); // 상태 update
          alert(`⚡ 번개세일! ${luckyItem.name} 20% 할인 중입니다!`);
        }
      }, SALE_CONFIG.LUCKY_SALE_INTERVAL);

      return () => clearInterval(interval);
    }, SALE_CONFIG.LUCKY_SALE_DELAY);

    return () => clearTimeout(timeout);
  }, [products, updateProductPrice]);
};
