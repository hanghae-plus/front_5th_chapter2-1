import Cart from './components/Cart';
import { CartProvider } from './provider/CartProvider';
import { ProductsProvider } from './provider/ProductProvider';

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Cart />
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
