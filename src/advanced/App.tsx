import React from 'react';
import Container from './ui/Container';
import CartItem from './ui/CartItem';
import CartResult from './ui/CartResult';

function App() {
  return (
    <Container>
      {/* 장바구니 목록 */}
      <CartItem />
      {/* 장바구니 결제 금액 */}
      <CartResult />
    </Container>
  );
}

export default App;
