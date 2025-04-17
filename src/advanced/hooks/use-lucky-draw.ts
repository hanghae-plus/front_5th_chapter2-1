import { useEffect, useRef } from 'react';
import { useProductList } from '../context/product';
import { startRandomlyInMs } from '../utils/time';

export const useLuckyDraw = () => {
  const { productList, setProductList } = useProductList();

  const productListRef = useRef(productList);

  // 최신 productList 유지
  useEffect(() => {
    productListRef.current = productList;
  }, [productList]);

  useEffect(() => {
    const startLuckyDraw = () => {
      const currentList = productListRef.current;
      const randomIndex = Math.floor(Math.random() * currentList.length);
      const luckyItem = currentList[randomIndex];

      const isLucky = Math.random() < 0.3;
      const hasStock = luckyItem.stockQuantity > 0;

      if (isLucky && hasStock) {
        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);

        const updatedList = currentList.map((product) =>
          product.id === luckyItem.id
            ? {
                ...product,
                price: Math.round(product.price * 0.8),
              }
            : product,
        );

        setProductList(updatedList);
      }
    };

    // 타이머는 최초 한 번만 등록
    const timeout = startRandomlyInMs(5_000)(() => {
      startLuckyDraw();
      setInterval(startLuckyDraw, 5_000);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);
};
