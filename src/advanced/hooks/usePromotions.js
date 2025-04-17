import { useEffect } from "react";
import { updateProductPrice } from "../actions/productActions";
import { getRandomProduct, getRecommendedProduct } from "../selectors/productSelectors";
import { useCartContext } from "../context/CartProvider.jsx";

/**
 * 프로모션 기능(번개세일, 추천 상품)을 관리하는 커스텀 훅
 */
export const usePromotions = () => {
  const { state, dispatch } = useCartContext();

  // 번개세일 기능
  useEffect(() => {
    const startFlashSaleTimer = setTimeout(() => {
      const flashSaleInterval = setInterval(() => {
        const luckyItem = getRandomProduct(state);

        if (luckyItem && Math.random() < 0.3 && luckyItem.quantity > 0) {
          const discountedPrice = Math.round(luckyItem.price * 0.8);
          dispatch(updateProductPrice(luckyItem.id, discountedPrice));
          alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        }
      }, 30000);

      return () => clearInterval(flashSaleInterval);
    }, Math.random() * 10000);

    return () => clearTimeout(startFlashSaleTimer);
  }, [state, dispatch]);

  // 추천 상품 알림 기능
  useEffect(() => {
    const startRecommendationTimer = setTimeout(() => {
      const recommendationInterval = setInterval(() => {
        const recommendedProduct = getRecommendedProduct(state);

        if (recommendedProduct) {
          const discountedPrice = Math.round(recommendedProduct.price * 0.95);
          dispatch(updateProductPrice(recommendedProduct.id, discountedPrice));
          alert(`${recommendedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
        }
      }, 60000);

      return () => clearInterval(recommendationInterval);
    }, Math.random() * 20000);

    return () => clearTimeout(startRecommendationTimer);
  }, [state, dispatch]);
};
