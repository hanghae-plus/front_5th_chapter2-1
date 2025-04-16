import { CartContainer } from "./components/cart/CartContainer";
import { CartProvider } from "./lib/contexts/CartProvider";

export function App() {
  return (
    <div id="app">
      <div className="bg-gray-100 p-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <h1 className="text-2xl font-bold mb-4">장바구니</h1>
          <CartProvider>
            <CartContainer />
          </CartProvider>
        </div>
      </div>
    </div>
  );
}
