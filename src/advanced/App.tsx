import Cart from './components/cart/Cart.js';
import CartAddButton from './components/cartAddButton/CartAddButton.js';
import CartTotal from './components/cartTotal/CartTotal.js';
import Container from './components/Container.js';
import ContentWrapper from './components/ContentWrapper.js';
import Header from './components/Header.js';
import ItemSelect from './components/itemSelect/ItemSelect.js';
import StockStatus from './components/stockStatus/StockStatus.js';

export default function App() {
  return (
    <Container>
      <ContentWrapper>
        <Header title="장바구니" />
        <Cart />
        <CartTotal />
        <ItemSelect />
        <CartAddButton />
        <StockStatus />
      </ContentWrapper>
    </Container>
  );
}
