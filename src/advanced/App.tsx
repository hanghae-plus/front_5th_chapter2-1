import { MainPage } from './pages';
import { CartProvider, ProductProvider } from './context';

function App() {
  return (
    <>
      <CartProvider>
        <ProductProvider>
          <MainPage />
        </ProductProvider>
      </CartProvider>
    </>
  );
}

export default App;
