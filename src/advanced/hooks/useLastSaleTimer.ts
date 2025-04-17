import { useEffect } from "react";
import { SALE_CONFIG } from "../constants/sale-config";
import { useCartStore } from "../store/useCartStore";

/**
 * 최근 선택된 상품을 기반으로 추천 상품에 5% 할인을 적용하는 커스텀 훅
 * @param getLastSale 최근 선택된 상품 ID를 반환하는 함수
 */
export const useLastSaleTimer = (getLastSale: () => string | null) => {
  const { products, lastSelected, updateProductPrice } = useCartStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        const lastSale = getLastSale();
        if (!lastSale) return;

        const suggest = products.find((item) => item.id !== lastSelected && item.q > 0);

        if (suggest) {
          alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
          const newPrice = Math.round(suggest.val * SALE_CONFIG.LAST_SALE_DISCOUNT);
          updateProductPrice(suggest.id, newPrice); // 상태만 바꾸면 자동 렌더링
        }
      }, SALE_CONFIG.LAST_SALE_INTERVAL);

      return () => clearInterval(interval);
    }, SALE_CONFIG.LAST_SALE_DELAY);

    return () => clearTimeout(timeout);
  }, [products, lastSelected, getLastSale, updateProductPrice]);
};
