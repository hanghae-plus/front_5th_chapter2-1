import { useEffect, useRef } from 'react';
import { CONSTANTS } from '../constants/constants.ts';
import ERROR_MESSAGES from '../constants/errorMessages.ts';
import { Product } from './useProduct.ts';

interface SaleSystemParams {
  products: Product[];
  selectedId: string | null;
  applyDiscount: (productId: string, discountRate: number) => void;
  updateCartPrices: (productId: string, newPrice: number) => void;
}

export const useSalesSystem = ({
  products,
  selectedId,
  applyDiscount,
  updateCartPrices,
}: SaleSystemParams) => {
  const flashSaleTimerRef = useRef<number | null>(null);
  const flashSaleIntervalRef = useRef<number | null>(null);
  const suggestionTimerRef = useRef<number | null>(null);
  const suggestionIntervalRef = useRef<number | null>(null);

  // 컴포넌트 마운트 시에만 Flash Sale 설정
  useEffect(() => {
    setupFlashSale();
    return () => {
      if (flashSaleTimerRef.current) clearTimeout(flashSaleTimerRef.current);
      if (flashSaleIntervalRef.current)
        clearInterval(flashSaleIntervalRef.current);
    };
  }, []);

  // selectedId가 변경될 때마다 추천 시스템 재설정
  useEffect(() => {
    if (suggestionTimerRef.current) clearTimeout(suggestionTimerRef.current);
    if (suggestionIntervalRef.current)
      clearInterval(suggestionIntervalRef.current);

    if (selectedId) {
      setupSuggestions();
    }

    return () => {
      if (suggestionTimerRef.current) clearTimeout(suggestionTimerRef.current);
      if (suggestionIntervalRef.current)
        clearInterval(suggestionIntervalRef.current);
    };
  }, [selectedId]);

  function setupFlashSale() {
    const delay = Math.random() * CONSTANTS.FLASH_SALE.MAX_DELAY;

    flashSaleTimerRef.current = setTimeout(() => {
      flashSaleIntervalRef.current = setInterval(() => {
        try {
          runFlashSale();
        } catch (error) {
          console.error(ERROR_MESSAGES.SALE_SYSTEM.FLASH_SALE_ERROR, error);
        }
      }, CONSTANTS.FLASH_SALE.INTERVAL);
    }, delay);
  }

  function runFlashSale() {
    if (!products || products.length === 0) {
      console.warn(ERROR_MESSAGES.SALE_SYSTEM.NO_PRODUCTS);
      return;
    }

    const luckyItemIndex = Math.floor(Math.random() * products.length);
    const luckyItem = products[luckyItemIndex];

    if (Math.random() < CONSTANTS.FLASH_SALE.CHANCE && luckyItem.quantity > 0) {
      const discountRate = CONSTANTS.FLASH_SALE.DISCOUNT_RATE;
      const newPrice = Math.round(luckyItem.price * discountRate);

      applyDiscount(luckyItem.id, discountRate);

      updateCartPrices(luckyItem.id, newPrice);

      alert(`번개세일! ${luckyItem.name} 이(가) 20% 할인 중입니다!`);
    }
  }

  function setupSuggestions() {
    const delay = Math.random() * CONSTANTS.SUGGESTION.MAX_DELAY;

    suggestionTimerRef.current = setTimeout(() => {
      suggestionIntervalRef.current = setInterval(() => {
        try {
          runSuggestion();
        } catch (error) {
          console.error(ERROR_MESSAGES.SALE_SYSTEM.SUGGESTION_ERROR, error);
        }
      }, CONSTANTS.SUGGESTION.INTERVAL);
    }, delay);
  }

  function runSuggestion() {
    if (!selectedId || !products || products.length === 0) {
      console.warn(ERROR_MESSAGES.SALE_SYSTEM.NO_PRODUCTS);
      return;
    }

    const availableProducts = products.filter(
      (item) => item.id !== selectedId && item.quantity > 0,
    );

    if (availableProducts.length > 0) {
      const suggestIndex = Math.floor(Math.random() * availableProducts.length);
      const suggest = availableProducts[suggestIndex];

      const discountRate = CONSTANTS.SUGGESTION.DISCOUNT_RATE;
      const newPrice = Math.round(suggest.price * discountRate);

      applyDiscount(suggest.id, discountRate);

      updateCartPrices(suggest.id, newPrice);

      alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
    }
  }

  return { runFlashSale };
};
