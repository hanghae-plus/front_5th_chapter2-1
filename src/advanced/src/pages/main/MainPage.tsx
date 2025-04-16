import { useCallback, useState } from "react";

import BasicLayout from "#advanced/components/layouts/basic/BasicLayout";

import type { IProduct } from "./_types";
import CartHeader from "./_components/CartHeader";
import CartSummary from "./_components/CartSummary";
import CartTable from "./_components/CartTable";
import ProductSelectForm from "./_components/ProductSelectForm";
import ShoppingHelp from "./_components/ShoppingHelp";

const MainPage: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

  const handleAddProduct = useCallback((product: IProduct) => {
    setSelectedProducts([...selectedProducts, product]);
  }, []);
  const handleRemoveProduct = useCallback((productId: IProduct["id"]) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  }, []);

  return (
    <BasicLayout className="flex items-center justify-center">
      <article className="flex w-full max-w-5xl min-w-md -translate-y-1/2 flex-col gap-4 rounded-xl bg-white p-8 shadow-md">
        <CartHeader />
        <CartTable />
        <CartSummary />
        <ProductSelectForm handleAddProduct={handleAddProduct} />
        <ShoppingHelp />
      </article>
    </BasicLayout>
  );
};

export default MainPage;
