import { useEffect, useRef } from 'react';
import { DISCOUNT } from '../constants';
import { useProductContext } from '../context/ProductContext';
import { getDiscountedPrice, isOutOfStock } from '../utils';

export function useSuggestedDiscount() {
  const { products, lastSelectedProductId, updateProduct } = useProductContext();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const triggerSuggestedDiscount = () => {
      if (lastSelectedProductId) {
        const suggestedProduct = products.find(
          (product) => product.id !== lastSelectedProductId && !isOutOfStock(product.stock),
        );
        if (suggestedProduct) {
          alert(`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);

          updateProduct({
            ...suggestedProduct,
            price: getDiscountedPrice(suggestedProduct.price, DISCOUNT.SUGGEST.RATE, true),
          });
        }
      }
    };

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(triggerSuggestedDiscount, 60000);
    }, Math.random() * 20000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [products, lastSelectedProductId, updateProduct]);
}
