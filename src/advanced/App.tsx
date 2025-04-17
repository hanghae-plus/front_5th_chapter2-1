import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <MainPage />
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
