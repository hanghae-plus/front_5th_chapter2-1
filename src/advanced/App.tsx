import { ShoppingCartApp } from './components/ShoppingCartApp';
import { CartProvider } from './contexts/CartProvider';
import { ProductProvider } from './contexts/ProductProvider';

const App = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <ShoppingCartApp />
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
