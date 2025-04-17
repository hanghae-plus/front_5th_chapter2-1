import { Product } from '../types';
import { useEffect } from 'react';
import { DISCOUNT } from '../constants';

export function useFlashSale(
  products: Product[],
  onPriceUpdate: (updated:Product) => void
) {
  function shouldApplyDiscount(item: Product): boolean {
    return Math.random() < DISCOUNT.SALE_PROBABILITY && item.quantity > 0;
  }

  useEffect(() => {
    // 랜덤 초기 지연
    const startDelay = Math.random() * 10000;
    const alarmTimer = setTimeout(() => {
      const saleInterval = setInterval(() => {
        const luckyItem =
          products[Math.floor(Math.random() * products.length)];
        if (
          shouldApplyDiscount(luckyItem)
        ) {
          alert(
            `번개세일! ${luckyItem.name}이(가) ${
              DISCOUNT.BASIC_RATE * 100
            }% 할인 중입니다!`
          );
          // 즉시 가격 반영
          onPriceUpdate({
            ...luckyItem,
            price: Math.round(luckyItem.price * (1 - DISCOUNT.BASIC_RATE)),
          });
        }
      }, 30000);
      return () => clearInterval(saleInterval);
    }, startDelay);
    return () => clearTimeout(alarmTimer);
  }, [products]);

}