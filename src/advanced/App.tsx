import { ProductProvider } from './context/product';
import { Main } from './Main';

const App = () => {
  return (
    <ProductProvider>
      <Main />
    </ProductProvider>
  );
};

export default App;
