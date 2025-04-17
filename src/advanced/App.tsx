import AddButton from './components/AddButton';
import CartTitle from './components/CartTitle';
import Container from './components/Container';
import OrderedList from './components/OrderedList';
import PaymentInfo from './components/PaymentInfo';
import ProductSelect from './components/ProductSelect';
import SoldOutInfo from './components/SoldOutInfo';
import Wrapper from './components/Wrapper';
import ProdListProvider from './store/prodList/ProdListProvider';
import SelectProvider from './store/select/SelectProvider';

function App() {
  return (
    <Container>
      <ProdListProvider>
        <SelectProvider>
          <Wrapper>
            <CartTitle />
            <OrderedList />
            <PaymentInfo />
            <ProductSelect />
            <AddButton />
            <SoldOutInfo />
          </Wrapper>
        </SelectProvider>
      </ProdListProvider>
    </Container>
  );
}

export default App;
