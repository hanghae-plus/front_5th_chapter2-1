import { useEffect } from 'react';
import { PRODUCT_LIST } from './constant';
import { CartItemInfo, ProductInfo } from './type';

export const useSuggestEffect = ({
  setProductList,
  cart,
}: {
  cart: CartItemInfo[];
  setProductList: React.Dispatch<React.SetStateAction<ProductInfo[]>>;
}) => {
  useEffect(() => {
    const lightningTimer = setTimeout(() => {
      const intervalId = setInterval(() => {
        const luckyItem = PRODUCT_LIST[Math.floor(Math.random() * PRODUCT_LIST.length)];
        if (Math.random() < 0.3 && luckyItem.quantity > 0) {
          alert(`⚡ 번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
          setProductList((prev) =>
            prev.map((item) =>
              item.id === luckyItem.id ? { ...item, price: Math.round(item.price * 0.8) } : item
            )
          );
        }
      }, 30000);
      return () => clearInterval(intervalId);
    }, Math.random() * 10000);

    const suggestTimer = setTimeout(() => {
      const intervalId = setInterval(() => {
        const lastSelect = cart[cart.length - 1]?.id;
        if (lastSelect) {
          const suggestion = PRODUCT_LIST.find(
            (item) => item.id !== lastSelect && item.quantity > 0
          );
          if (suggestion) {
            alert(`${suggestion.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
            setProductList((prev) =>
              prev.map((item) =>
                item.id === suggestion.id ? { ...item, price: Math.round(item.price * 0.95) } : item
              )
            );
          }
        }
      }, 60000);
      return () => clearInterval(intervalId);
    }, Math.random() * 20000);

    return () => {
      clearTimeout(lightningTimer);
      clearTimeout(suggestTimer);
    };
  }, [cart, setProductList]);
};
