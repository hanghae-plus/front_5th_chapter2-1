import { useCallback, useMemo, useState } from "react";

import BasicLayout from "#advanced/components/layouts/basic/BasicLayout";

import type { ICartProduct, IProduct } from "./_types";
import { PRODUCTS } from "./_constants";
import CartHeader from "./_components/CartHeader";
import CartTable from "./_components/CartTable";
import ProductSelectForm from "./_components/ProductSelectForm";
import ShoppingHelp from "./_components/ShoppingHelp";

const MainPage: React.FC = () => {
  const [products] = useState<IProduct[]>(PRODUCTS);

  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
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
  const handleRemoveProductFromCart = useCallback((productId: IProduct["id"]) => {
    setCartProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const handleIncreaseProductCount = useCallback((productId: IProduct["id"]) => {
    setCartProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, count: p.count + 1 } : p)));
  }, []);
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
    <BasicLayout className="flex items-center justify-center">
      <article className="flex w-full max-w-5xl min-w-xl flex-col gap-4 rounded-xl bg-white p-8 shadow-md">
        <CartHeader />
        <ProductSelectForm
          products={products}
          cartProducts={cartProducts}
          handleAddProductToCart={handleAddProductToCart}
        />
        <CartTable
          cartProducts={cartProducts}
          handleRemoveProductFromCart={handleRemoveProductFromCart}
          handleIncreaseProductCount={handleIncreaseProductCount}
          handleDecreaseProductCount={handleDecreaseProductCount}
        />
        <ShoppingHelp emptyProducts={emptyProducts} />
      </article>
    </BasicLayout>
  );
};

export default MainPage;
