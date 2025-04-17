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
    const randomSaleTimer = setTimeout(() => {
      const randomSaleInterval = setInterval(() => {
        const randomProduct =
          productList[Math.floor(Math.random() * productList.length)];

        if (Math.random() < 0.3 && randomProduct.stock > 0) {
          setProductList((prevList) =>
            prevList.map((p) =>
              p.id === randomProduct.id
                ? { ...p, price: Math.round(p.price * 0.8) }
                : p,
            ),
          );
        }
      }, 30000);

      return () => clearInterval(randomSaleInterval);
    }, Math.random() * 10000);

    const additionalSaleTimer = setTimeout(() => {
      const additionalSaleInterval = setInterval(() => {
        if (lastSaleItem) {
          const suggestedProduct = productList.find(
            (item) => item.id !== lastSaleItem && item.stock > 0,
          );

          if (suggestedProduct) {
            setProductList((prevList) =>
              prevList.map((p) =>
                p.id === suggestedProduct.id
                  ? { ...p, price: Math.round(p.price * 0.95) }
                  : p,
              ),
            );
          }
        }
      }, 60000);

      return () => clearInterval(additionalSaleInterval);
    }, Math.random() * 10000);

    return () => {
      clearTimeout(randomSaleTimer);
      clearTimeout(additionalSaleTimer);
    };
  }, [lastSaleItem, productList, setProductList]);

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
