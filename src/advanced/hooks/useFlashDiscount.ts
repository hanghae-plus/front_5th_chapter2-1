import { useEffect, useRef } from 'react';
import { DISCOUNT } from '../constants';
import { useProductContext } from '../context/ProductContext';
import { getDiscountedPrice, isOutOfStock } from '../utils';

export function useFlashDiscount() {
  const { products, updateProduct } = useProductContext();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const triggerFlashDiscount = () => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];

      if (Math.random() < 0.3 && !isOutOfStock(randomProduct.stock)) {
        alert(`번개세일! ${randomProduct.name}이(가) 20% 할인 중입니다!`);

        updateProduct({
          ...randomProduct,
          price: getDiscountedPrice(randomProduct.price, DISCOUNT.FLASH.RATE, true),
        });
      }
    };

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(triggerFlashDiscount, 30000);
    }, Math.random() * 10000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [products, updateProduct]);
}
