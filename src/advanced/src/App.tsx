import { Provider } from "jotai";
import { CartList, Header, Layout, ProductSelector, SoldOutList, TotalPrice } from "./components";

function App() {
  return (
    <Provider>
      <Layout>
        <Header />
        <TotalPrice />
        <CartList />
        <ProductSelector />
        <SoldOutList />
      </Layout>
    </Provider>
  );
}

export default App;
