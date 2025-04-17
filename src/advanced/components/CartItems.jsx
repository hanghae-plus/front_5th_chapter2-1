import React from "react";
import { useCartContext } from "../context/CartProvider.jsx";
import CartItem from "./CartItem.jsx";
import { getCartItems } from "../selectors/cartSelectors.js";
import { getProductById } from "../selectors/productSelectors.js";

const CartItems = () => {
  const { state } = useCartContext();
  const cartItems = getCartItems(state);

  return (
    <div id="cart-items">
      {cartItems.map((item) => {
        const product = getProductById(state, item.productId);
        if (!product) return null;
        return <CartItem key={item.productId} product={product} quantity={item.quantity} />;
      })}
    </div>
  );
};

export default CartItems;
