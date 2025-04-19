import { useEffect, useRef } from 'react';
import { useStock } from '../context/stock';
import { startRandomlyInMs } from '../utils/time';
import { DISCOUNT_RATE, THRESHOLD } from '../config/constants';

export const useLuckyDraw = () => {
  const { stockList, dispatch } = useStock();

  // productList를 최신화하기 위한 ref
  // useRef는 컴포넌트가 리렌더링 되어도 값이 유지됨 + 값이 변경되어도 리렌더링을 유발하지 않음
  const productListRef = useRef(stockList);

  // stockList 최신화
  useEffect(() => {
    productListRef.current = stockList;
  }, [stockList]);

  useEffect(() => {
    const startLuckyDraw = () => {
      // 최신 productList에서, 랜덤으로 상품 하나 추출
      const currentList = productListRef.current;
      const randomIndex = Math.floor(Math.random() * currentList.length);
      const luckyItem = currentList[randomIndex];

      // 운이 좋은가
      const isLucky = Math.random() < THRESHOLD.luck;
      // 재고가 있는가
      const hasStock = luckyItem.stockQuantity > 0;

      // 운이 좋고 재고가 있다면, 해당 상품에 대해 할인 적용
      if (isLucky && hasStock) {
        alert(
          `번개세일! ${luckyItem.name}이(가) ${DISCOUNT_RATE.lucky * 100}% 할인 중입니다!`,
        );

        dispatch({
          type: 'APPLY_DISCOUNT',
          id: luckyItem.id,
          discountRate: DISCOUNT_RATE.lucky,
        });
      }
    };

    // 타이머는 최초 한 번만 등록
    const timeout = startRandomlyInMs(10_000)(() => {
      startLuckyDraw();
      setInterval(startLuckyDraw, 30_000);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);
};
