import { Provider } from "jotai";
import { Header, Layout, ProductSelector, TotalPrice } from "./components";

function App() {
  return (
    <Provider>
      <Layout>
        <Header />
        <TotalPrice />
        <ProductSelector />
      </Layout>
    </Provider>
  );
}

export default App;
