import { useState } from "react";
import "./App.css";
import { AddBtn } from "./components/cart/AddBtn";
import { PricePointDiscountRate } from "./components/cart/PricePointDiscountRate";
import { Select } from "./components/cart/Select";
import { UpdateBtn } from "./components/cart/UpdateBtn";
import { Product, PRODUCTS } from "./constants";
import { DeleteBtn } from "./components/cart/DeleteBtn";

function Item({
  item,
  cartItems,
  setCartItems,
}: {
  item: Product;
  cartItems: Record<string, Product>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, Product>>>;
}) {
  return (
    <div id={item.id} className="flex justify-between items-center mb-2">
      <span>
        {item.name} - {item.val}원 x {item.quantity}
      </span>
      <div>
        <UpdateBtn
          id={item.id}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
        <DeleteBtn id={item.id} />
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [cartItems, setCartItems] = useState<Record<string, Product>>({});

  const [selectedProduct, setSelectedProduct] = useState({ id: "p1" });

  return (
    <div className="h-lvh bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items">
          {Object.values(cartItems).map((item) => (
            <Item
              key={`cart-item-${item.id}`}
              item={item}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          ))}
        </div>
        <PricePointDiscountRate cartItems={cartItems} />
        <Select products={products} setSelectedProduct={setSelectedProduct} />
        <AddBtn
          selectedProduct={selectedProduct}
          products={products}
          setProducts={setProducts}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
        <div id="stock-status" className="text-sm text-gray-500 mt-2"></div>
      </div>
    </div>
  );
}

export default App;
