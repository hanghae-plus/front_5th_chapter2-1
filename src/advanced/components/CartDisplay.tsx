import React from "react";

import { CartItem as CartItemType } from "../types";
import CartItem from "./CartItem";

interface CartDisplayProps {
    cartItems: CartItemType[];
}

const CartDisplay: React.FC<CartDisplayProps> = ({ cartItems }) => {
    console.log("cartItem: ", cartItems);

    return (
        <div id="cart-items">
            {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default CartDisplay;
