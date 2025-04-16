import { Provider } from "jotai";
import { CartList, Header, Layout, ProductSelector, TotalPrice } from "./components";

function App() {
  return (
    <Provider>
      <Layout>
        <Header />
        <TotalPrice />
        <CartList />
        <ProductSelector />
      </Layout>
    </Provider>
  );
}

export default App;
