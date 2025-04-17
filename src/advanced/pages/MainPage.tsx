import { useEffect } from 'react';
import { Layout, ProductSelect, AddButton, StockStatusContainer, CartItemListContainer, TotalAmountContainer } from '@/advanced/components';
import { useProduct } from '@/advanced/context';
import { RandomSale } from '@/advanced/logic/sale';

export const MainPage = () => {
    const { productList, setProductList, selectedProductId } = useProduct();

    useEffect(() => {
    RandomSale({
      selectedProductId,
      productList,
      setProductList
    });
  }, [productList, selectedProductId, setProductList]);

  return (
    <Layout>
      <CartItemListContainer />
      <TotalAmountContainer />
      <ProductSelect/>
      <AddButton />
      <StockStatusContainer />
    </Layout>
  );
};
