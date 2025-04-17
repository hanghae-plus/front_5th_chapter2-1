import { useEffect } from "react";
import {
  Layout,
  ProductSelect,
  AddButton,
  StockStatusContainer,
  CartItemListContainer,
  TotalAmountContainer,
} from "@/advanced/components";
import { useShoppingContext } from "@/advanced/context";
import { RandomSale } from "@/advanced/logic/sale";

export const MainPage = () => {
  const { selectedProductId, productList, setProductList } = useShoppingContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    RandomSale({
      selectedProductId,
      productList,
      setProductList
    });
  }, []);

  return (
    <Layout>
      <CartItemListContainer />
      <TotalAmountContainer />
      <ProductSelect />
      <AddButton />
      <StockStatusContainer />
    </Layout>
  );
};
