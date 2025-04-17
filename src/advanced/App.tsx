import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';

export default function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <div id='container'></div>
      </ProductsProvider>
    </CartProvider>
  );
}
