import { createContext, useCallback, useMemo, useState } from "react";

import type { ICartProduct, IProduct } from "#advanced/pages/main/_types";
import useProducts from "#advanced/pages/main/_hooks/useProducts";

interface ICartContext {
  cartProducts: ICartProduct[];
  setCartProducts: (cartProducts: ICartProduct[]) => void;
  handleAddProductToCart: (product: IProduct) => void;
  handleRemoveProductFromCart: (productId: IProduct["id"]) => void;
  handleIncreaseProductCount: (productId: IProduct["id"]) => void;
  handleDecreaseProductCount: (productId: IProduct["id"]) => void;
  emptyProducts: IProduct[];
}

export const CartContext = createContext<ICartContext>({
  cartProducts: [],
  setCartProducts: () => {},
  handleAddProductToCart: () => {},
  handleRemoveProductFromCart: () => {},
  handleIncreaseProductCount: () => {},
  handleDecreaseProductCount: () => {},
  emptyProducts: [],
});

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { products } = useProducts();

  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);

  /** 장바구니에 상품 하나 추가 */
  const handleAddProductToCart = useCallback((product: IProduct) => {
    setCartProducts((prev) => {
      // 첫 장바구니
      const targetProduct = prev.find((p) => p.id === product.id);
      if (!targetProduct) return [...prev, { ...product, count: 1 }];

      // 장바구니 추가 시 재고 체크
      const productStock = product.stock - targetProduct.count;
      if (productStock > 0) {
        return prev.map((p) => (p.id === product.id ? { ...p, count: p.count + 1 } : p));
      }

      // 재고 부족 시 장바구니 추가 불가
      return prev;
    });
  }, []);
  /** 장바구니에서 상품 삭제 */
  const handleRemoveProductFromCart = useCallback((productId: IProduct["id"]) => {
    setCartProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  /** 장바구니 수량 증가 */
  const handleIncreaseProductCount = useCallback((productId: IProduct["id"]) => {
    setCartProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, count: p.count + 1 } : p)));
  }, []);
  /** 장바구니 수량 감소 */
  const handleDecreaseProductCount = useCallback((productId: IProduct["id"]) => {
    setCartProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, count: p.count - 1 } : p)).filter((p) => p.count > 0),
    );
  }, []);

  const emptyProducts = useMemo(
    () =>
      products.filter((p) => {
        const targetProduct = cartProducts.find((cartProduct) => cartProduct.id === p.id);
        const stock = p.stock - (targetProduct?.count ?? 0);

        return stock === 0;
      }),
    [products, cartProducts],
  );

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleIncreaseProductCount,
        handleDecreaseProductCount,
        emptyProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
