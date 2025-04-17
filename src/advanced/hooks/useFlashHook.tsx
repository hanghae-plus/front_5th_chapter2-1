import { useEffect, useRef } from 'react';
import { useProdListContext } from '../store/prodList/ProdListContext';
import { RANDOM_NUMBER, SALE_NUMBER, TIMER_NUMBER } from '../constants/numbers';

export const useFlashHook = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { prodList, setProdList } = useProdListContext();

  const flashSaleInterval = () => {
    const randomIndex = Math.floor(Math.random() * prodList.length);
    const flashSaleItem = prodList[randomIndex];

    if (RANDOM_NUMBER && flashSaleItem.quantity > 0) {
      setProdList(
        prodList.map((item) => {
          if (item.id === flashSaleItem.id) {
            return { ...item, price: Math.round(flashSaleItem.price * SALE_NUMBER.FLASH) };
          }
          return item;
        }),
      );

      alert(`번개세일! ${flashSaleItem.name} 이(가) 20% 할인 중입니다!`);
    }
  };

  useEffect(() => {
    if (!timer.current) {
      setTimeout(() => {
        timer.current = setInterval(flashSaleInterval, TIMER_NUMBER.FLASH_INTERVAL);
      }, TIMER_NUMBER.FLASH_TIME);
    }

    return () => clearInterval(timer.current as NodeJS.Timeout);
  }, []);
};
