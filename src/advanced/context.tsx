import { createContext, useContext, useMemo, useState } from 'react';
import { PRODUCT_LIST } from './constant';
import { CartItemInfo, ProductInfo, RemainProductListInfo } from './type';
import { useSuggestEffect } from './useSuggestEffect';

export type ActionType = 'INCREASE' | 'DECREASE';

interface ContextInfo {
  cart: CartItemInfo[];
  productList: ProductInfo[];
  setProductList: React.Dispatch<React.SetStateAction<ProductInfo[]>>;
  remainProductList: RemainProductListInfo[];
  handleRemoveProduct: (productId: string) => void;
  handleActionProduct: (productId: string, actionType: ActionType) => void;
}

export const CartContext = createContext<ContextInfo | null>(null);

export const useCartControls = () => {
  const controls = useContext(CartContext);

  if (!controls) {
    throw new Error('CartContext 내부에서 사용해주세요.');
  }

  return controls;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [productList, setProductList] = useState<ProductInfo[]>(PRODUCT_LIST);
  const [cart, setCart] = useState<CartItemInfo[] | []>([]);

  const handleActionProduct = (productId: string, actionType: ActionType) => {
    const product = productList.find((product) => product.id === productId);

    if (!product) {
      return;
    }

    setCart((prev) => {
      const selectProduct = prev.find((product) => product.id === productId);
      if (selectProduct) {
        if (actionType === 'DECREASE' && selectProduct.currentQuantity === 1) {
          alert('재고가 부족합니다.');
          return prev;
        }

        if (actionType === 'INCREASE' && selectProduct.currentQuantity === product.quantity) {
          alert('재고가 부족합니다.');
          return prev;
        }

        return prev.map((product) =>
          product.id === productId
            ? {
                ...product,
                currentQuantity:
                  actionType === 'INCREASE'
                    ? product.currentQuantity + 1
                    : product.currentQuantity - 1,
              }
            : product
        );
      }

      if (actionType === 'INCREASE') {
        return [...prev, { ...product, currentQuantity: 1 }];
      }

      return prev;
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setCart((prev) => prev.filter((product) => product.id !== productId));
  };

  const remainProductList = useMemo(() => {
    return productList.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      const remainQuantity = product.quantity - (cartItem?.currentQuantity ?? 0);
      return {
        id: product.id,
        name: product.name,
        remainQuantity,
      };
    });
  }, [productList, cart]);

  useSuggestEffect({ cart, setProductList });

  const memorizedValue = useMemo(
    () => ({
      cart,
      productList,
      remainProductList,
      handleActionProduct,
      handleRemoveProduct,
      setProductList,
    }),
    [cart, remainProductList, productList, handleActionProduct, handleRemoveProduct, setProductList]
  );

  return <CartContext.Provider value={memorizedValue}>{children}</CartContext.Provider>;
};
