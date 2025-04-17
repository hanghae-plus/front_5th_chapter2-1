import Container from './ui/Container';
import CartItem from './ui/CartItem';
import CartResult from './ui/CartResult';
import { StockInfo } from './ui/StockInfo';
import CartOptions from './ui/SelectBox';
import { useState } from 'react';
import useProductManagement from './hooks/useProductManagement';
import useTimeOutSale from './hooks/useTimeOutSale';

export interface CartListType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

function App() {
  const { productList, setProductList, hasEnoughStock, decreaseStock } = useProductManagement();
  const [cartList, setCartList] = useState<CartListType[]>([]);
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  // 프로모션 타이머 적용
  useTimeOutSale({
    productList,
    setProductList,
    lastSelected,
    setLastSelected,
  });

  return (
    <Container>
      {/* 장바구니 목록 */}
      <CartItem
        cartList={cartList}
        setCartList={setCartList}
        hasEnoughStock={hasEnoughStock}
        decreaseStock={decreaseStock}
      />

      {/* 장바구니 결제 금액 */}
      <CartResult cartList={cartList} />

      {/* 장바구니 선택 + 추가 */}
      <CartOptions
        setCartList={setCartList}
        productList={productList}
        hasEnoughStock={hasEnoughStock}
        decreaseStock={decreaseStock}
      />

      {/* 재고 상태 */}
      <StockInfo productList={productList} />
    </Container>
  );
}

export default App;
