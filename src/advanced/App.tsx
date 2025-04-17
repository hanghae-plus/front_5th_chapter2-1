import { CartList } from "./components/cart/CartList";
import CartTotal from "./components/cart/CartTotal";
import { ProductSelect } from "./components/product/ProductSelect";
import { Stock } from "./components/product/Stock";
import { CartStoreProvider } from "./stores/CartStore";

const App = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white p-8 shadow-md md:max-w-2xl">
        <h1 className="mb-4 text-2xl font-bold">장바구니</h1>
        <CartStoreProvider>
          <CartList />
          <ProductSelect />
          <CartTotal />
          <Stock />
        </CartStoreProvider>
      </div>
    </div>
  );
};

export default App;
