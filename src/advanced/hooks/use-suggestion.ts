import { useEffect, useRef } from 'react';
import { useStock } from '../context/stock';

import { DISCOUNT_RATE } from '../config/constants';
import { startRandomlyInMs } from '../utils/time';

export const useSuggestion = () => {
  const { stockList, dispatch, lastAddedProductId } = useStock();

  // stockList, lastSelected를 최신화하기 위한 ref
  // useRef는 컴포넌트가 리렌더링 되어도 값이 유지됨 + 값이 변경되어도 리렌더링을 유발하지 않음
  const productListRef = useRef(stockList);
  const lastAddedProductIdRef = useRef(lastAddedProductId);

  // productList와 lastSelectedId가 변경될 때마다 최신화
  useEffect(() => {
    productListRef.current = stockList;
    lastAddedProductIdRef.current = lastAddedProductId;
  }, [stockList, lastAddedProductIdRef]);

  useEffect(() => {
    const startSuggestion = () => {
      const list = productListRef.current;
      const lastId = lastAddedProductIdRef.current;

      // 마지막으로 추가한 상품이 없으면, 추천할 필요 없음
      if (!lastId) {
        return;
      }

      // 마지막으로 추가한 상품 제외하고, 재고가 있는 첫 상품 찾기
      const suggestion = list.find(
        (product) => product.id !== lastId && product.stockQuantity > 0,
      );

      // 그 외 상품중 재고가 있는 경우 상품 추천하고 할인 적용
      if (suggestion) {
        alert(
          `${suggestion.name}은(는) 어떠세요? 지금 구매하시면 ${Math.round(
            DISCOUNT_RATE.suggestion * 100,
          )}% 추가 할인!`,
        );

        dispatch({
          type: 'APPLY_DISCOUNT',
          id: suggestion.id,
          discountRate: DISCOUNT_RATE.suggestion,
        });
      }
    };

    // 타이머는 최초 한 번만 등록
    const timeout = startRandomlyInMs(20_000)(() => {
      startSuggestion();
      setInterval(startSuggestion, 60_000);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);
};
