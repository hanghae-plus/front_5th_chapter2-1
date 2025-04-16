import { Layout, ProductSelect, AddButton, StockStatusContainer, CartItemListContainer, TotalAmountContainer } from "@/advanced/components";

export const MainPage = () => {
  return (
    <Layout>
      <CartItemListContainer><div>장바구니</div></CartItemListContainer>
      <TotalAmountContainer><div>총 금액</div></TotalAmountContainer>
      <ProductSelect/>
      <AddButton />
      <StockStatusContainer><div>재고</div></StockStatusContainer>
    </Layout>
  );
};
