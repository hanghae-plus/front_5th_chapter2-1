import { useEffect, useRef } from 'react';
import { useProductList } from '../context/product';

import { DISCOUNT_RATE } from '../config/constants';
import { startRandomlyInMs } from '../utils/time';

export const useSuggestion = () => {
  const { productList, setProductList, lastSelectedOption } = useProductList();

  const productListRef = useRef(productList);
  const lastSelectedRef = useRef(lastSelectedOption.current?.id ?? null);

  // 항상 최신 productList와 lastSelectedId를 유지
  useEffect(() => {
    productListRef.current = productList;
    lastSelectedRef.current = lastSelectedOption.current?.id ?? null;
  }, [productList, lastSelectedOption.current]);

  useEffect(() => {
    const startSuggestion = () => {
      const list = productListRef.current;
      const lastId = lastSelectedRef.current;
      if (!lastId) return;

      const suggestion = list.find(
        (product) => product.id !== lastId && product.stockQuantity > 0,
      );

      if (!suggestion) return;

      alert(
        `${suggestion.name}은(는) 어떠세요? 지금 구매하시면 ${Math.round(
          DISCOUNT_RATE.suggestion * 100,
        )}% 추가 할인!`,
      );

      const updatedList = list.map((product) =>
        product.id === suggestion.id
          ? {
              ...product,
              price: Math.round(product.price * (1 - DISCOUNT_RATE.suggestion)),
            }
          : product,
      );

      setProductList(updatedList);
    };

    const timeout = startRandomlyInMs(20_000)(() => {
      startSuggestion();
      setInterval(startSuggestion, 60_000);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);
};
