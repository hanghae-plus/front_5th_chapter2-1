import { Main } from './components/Main';
import { ProductsProvider } from './contexts/ProductsContext';

function App() {
  return (
    <ProductsProvider>
      <Main />
    </ProductsProvider>
  );
}
export default App;
