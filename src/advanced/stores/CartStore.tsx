import { createContext, useEffect } from "react";
import { CartInfo } from "../types/types";
import { INITIAL_CART } from "../constant";
import useCartStoreLogic from "../hooks/useCartStoreLogic";

interface CartStoreContextProps extends CartInfo {
  changeProductListPrice: (productId: string) => void;
  addToCart: (productId: string) => void;
  handleQuantityChange: (productId: string, quantity: number) => void;
  handleRemove: (productId: string) => void;
}

export const CartStoreContext = createContext<CartStoreContextProps | null>(
  null,
);

export const CartStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    productList,
    lastSaleItem,
    addToCart,
    handleQuantityChange,
    handleRemove,
    changeProductListPrice,
    setProductList,
  } = useCartStoreLogic(INITIAL_CART);

  useEffect(() => {
    let lightningSaleIntervalId: ReturnType<typeof setInterval> | null = null;
    let recommendationIntervalId: ReturnType<typeof setInterval> | null = null;

    const lightningSaleTimeoutId = setTimeout(() => {
      lightningSaleIntervalId = setInterval(() => {
        const saleItem =
          productList[Math.floor(Math.random() * productList.length)];
        if (Math.random() < 0.3 && saleItem.stock > 0) {
          const discountedPrice = Math.round(saleItem.price * 0.8);
          alert(
            `번개세일! ${saleItem.name}이(가) 20% 할인 중입니다! (가격: ${discountedPrice})`,
          );

          const updatedList = productList.map((item) =>
            item.id === saleItem.id
              ? { ...item, price: discountedPrice }
              : item,
          );
          setProductList([...updatedList]);
        }
      }, 30000);
    }, Math.random() * 10000);

    const recommendationTimeoutId = setTimeout(() => {
      recommendationIntervalId = setInterval(() => {
        if (lastSaleItem) {
          const suggest = productList.find(
            (item) => item.id !== lastSaleItem && item.stock > 0,
          );
          if (suggest) {
            const discountedPrice = Math.round(suggest.price * 0.95);
            alert(
              `${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인! (가격: ${discountedPrice})`,
            );

            const updatedList = productList.map((item) =>
              item.id === suggest.id
                ? { ...item, price: discountedPrice }
                : item,
            );
            setProductList([...updatedList]);
          }
        }
      }, 60000);
    }, Math.random() * 20000);

    return () => {
      clearTimeout(lightningSaleTimeoutId);
      clearTimeout(recommendationTimeoutId);
      if (lightningSaleIntervalId) clearInterval(lightningSaleIntervalId);
      if (recommendationIntervalId) clearInterval(recommendationIntervalId);
    };
  }, [lastSaleItem, productList]);

  return (
    <CartStoreContext.Provider
      value={{
        lastSaleItem,
        productList,
        addToCart,
        handleQuantityChange,
        handleRemove,
        changeProductListPrice,
      }}
    >
      {children}
    </CartStoreContext.Provider>
  );
};
