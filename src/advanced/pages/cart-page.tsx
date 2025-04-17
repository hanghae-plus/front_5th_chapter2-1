import React, { useState } from "react";
import BonusPoint from "../components/bonus-points";
import CartItem from "../components/cart-item";
import PriceInfo from "../components/price-info";
import { StockStatus } from "../components/stock-info";
import { useCartStore } from "../store/useCartStore";

export function CartPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    products,
    cart,
    addToCart,
    changeCartItemQuantity,
    removeCartItem,
    finalTotal,
    discountRate,
  } = useCartStore();

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              val={item.val}
              quantity={item.quantity}
              onChangeQuantity={(id, delta) => changeCartItemQuantity(id, delta)}
              onRemove={(id) => removeCartItem(id)}
            />
          ))}
        </div>
        <div id="cart-total" className="text-xl font-bold my-4">
          <PriceInfo finalTotal={finalTotal} discountRate={discountRate} />
          <StockStatus />
          <BonusPoint finalTotal={finalTotal} />
        </div>
        <select
          className="border rounded p-2 mr-2"
          value={selectedId ?? ""}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id} disabled={product.q === 0}>
              {product.name} - {product.val}원
            </option>
          ))}
        </select>
        <button
          id="add-to-cart"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            addToCart(selectedId!);
          }}
        >
          추가
        </button>
      </div>
    </div>
  );
}
