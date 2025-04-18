import { FLASH_SALE_DISCOUNT_RATE, RECOMMEND_DISCOUNT_RATE } from '../constants.js';

export function createPromotionService(store, productService) {
  let flashSaleTimer = null;
  let flashSaleInterval = null;
  let recommendationTimer = null;
  let recommendationInterval = null;
  let lastSelectedProductId = null;

  const updateLastSelectedProductId = productId => {
    lastSelectedProductId = productId;
  };

  const initPromotions = () => {
    initFlashSalePromotion();
    initRecommendationPromotion();
  };

  const initFlashSalePromotion = () => {
    if (flashSaleTimer) {
      clearTimeout(flashSaleTimer);
    }
    if (flashSaleInterval) {
      clearInterval(flashSaleInterval);
    }

    flashSaleTimer = setTimeout(() => {
      flashSaleInterval = setInterval(() => {
        const luckyItem = productService.getRandomProduct();
        if (Math.random() < 0.3 && luckyItem.quantity > 0) {
          const newPrice = Math.round(luckyItem.price * FLASH_SALE_DISCOUNT_RATE);
          alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
          productService.updateProductPrice(luckyItem.id, newPrice);
        }
      }, 30000);
    }, Math.random() * 10000);
  };

  const initRecommendationPromotion = () => {
    if (recommendationTimer) {
      clearTimeout(recommendationTimer);
    }
    if (recommendationInterval) {
      clearInterval(recommendationInterval);
    }

    recommendationTimer = setTimeout(() => {
      recommendationInterval = setInterval(() => {
        if (lastSelectedProductId) {
          const suggest = productService.getProductBySuggestion(lastSelectedProductId);
          if (suggest) {
            alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
            const newPrice = Math.round(suggest.price * RECOMMEND_DISCOUNT_RATE);
            productService.updateProductPrice(suggest.id, newPrice);
          }
        }
      }, 60000);
    }, Math.random() * 20000);
  };

  return {
    initPromotions,
    updateLastSelectedProductId,
  };
}
