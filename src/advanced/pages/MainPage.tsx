import { useEffect } from "react";
import {
  Layout,
  ProductSelect,
  AddButton,
  StockStatusContainer,
  CartItemListContainer,
  TotalAmountContainer,
} from "@/advanced/components";

export const MainPage = () => {
  useEffect(() => {
    // RandomSale({
    //   selectedProductId,
    //   productList,
    //   setProductList
    // });
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
