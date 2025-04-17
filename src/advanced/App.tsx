import { StockProvider } from './context/stock';
import { Main } from './Main';

const App = () => {
  return (
    <StockProvider>
      <Main />
    </StockProvider>
  );
};

export default App;
