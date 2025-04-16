import { useCallback, useState } from "react";

import BasicLayout from "#advanced/components/layouts/basic/BasicLayout";

import type { ICart, IProduct } from "./_types";
import { PRODUCTS } from "./_constants";
import CartHeader from "./_components/CartHeader";
import CartTable from "./_components/CartTable";
import ProductSelectForm from "./_components/ProductSelectForm";
import ShoppingHelp from "./_components/ShoppingHelp";

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>(PRODUCTS);
  const handleRemoveProduct = useCallback((productId: IProduct["id"]) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + 1 } : p)));
  }, []);

  const [cart, setCart] = useState<ICart[]>([]);
  const handleAddCart = useCallback((product: IProduct) => {
    setCart((prev) => {
      const hasProduct = !!prev.find((p) => p.id === product.id);

      if (hasProduct) {
        return prev.map((p) => (p.id === product.id ? { ...p, count: p.count + 1 } : p));
      }

      return [...prev, { ...product, count: 1 }];
    });
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p)));
  }, []);
  const handleRemoveCart = useCallback((productId: IProduct["id"]) => {
    setCart((prev) =>
      prev
        .map((p) => {
          const isTargetProduct = p.id === productId;
          if (!isTargetProduct) return p;

          return { ...p, count: p.count - 1 };
        })
        .filter((p) => p.count > 0),
    );
  }, []);

  return (
    <BasicLayout className="flex items-center justify-center">
      <article className="flex w-full max-w-5xl min-w-xl flex-col gap-4 rounded-xl bg-white p-8 shadow-md">
        <CartHeader />
        <ProductSelectForm products={products} handleAddCart={handleAddCart} />
        <CartTable cart={cart} handleRemoveProduct={handleRemoveProduct} handleRemoveCart={handleRemoveCart} />
        <ShoppingHelp />
      </article>
    </BasicLayout>
  );
};

export default MainPage;
