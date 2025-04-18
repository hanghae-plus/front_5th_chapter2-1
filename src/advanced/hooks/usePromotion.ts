import { useEffect, useState } from 'react';
import { FLASH_SALE_DISCOUNT_RATE, RECOMMEND_DISCOUNT_RATE } from '../constants';
import useProduct from './useProduct';

interface Returns {
  setLastSelectedProductId: (productId: string) => void;
}

const usePromotion = (): Returns => {
  const [lastSelectedProductId, setLastSelectedProductId] = useState<string | null>(null);
  const { getProductBySuggestion, randomProduct, updateProductPrice } = useProduct();

  useEffect(() => {
    const lightningDealTimeout = setTimeout(() => {
      const lightningDealInterval = setInterval(() => {
        const luckyItem = randomProduct;

        if (Math.random() < 0.3 && luckyItem.quantity > 0) {
          const newPrice = Math.round(luckyItem.price * FLASH_SALE_DISCOUNT_RATE);
          alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
          updateProductPrice(luckyItem.id, newPrice);
        }
      }, 30000);

      return () => clearInterval(lightningDealInterval);
    }, Math.random() * 10000);

    return () => clearTimeout(lightningDealTimeout);
  }, [randomProduct, updateProductPrice]);

  useEffect(() => {
    const suggestTimeout = setTimeout(() => {
      const suggestInterval = setInterval(() => {
        if (!lastSelectedProductId) {
          return;
        }

        const suggestedProduct = getProductBySuggestion(lastSelectedProductId);

        if (suggestedProduct) {
          alert(`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
          const newPrice = Math.round(suggestedProduct.price * RECOMMEND_DISCOUNT_RATE);
          updateProductPrice(suggestedProduct.id, newPrice);
        }
      }, 60000);

      return () => clearInterval(suggestInterval);
    }, Math.random() * 20000);

    return () => clearTimeout(suggestTimeout);
  }, [lastSelectedProductId, updateProductPrice, getProductBySuggestion]);

  return {
    setLastSelectedProductId,
  };
};

export default usePromotion;
