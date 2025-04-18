import React from "react";

import { CartItem as CartItemType } from "../types";
import CartItem from "./CartItem";

interface CartDisplayProps {
    cartItems: CartItemType[];
    handleQuantityChange: (id: string, change: number) => void; // 추가
    handleRemoveItem: (id: string) => void; // 추가
}

const CartDisplay: React.FC<CartDisplayProps> = ({
    cartItems,
    handleQuantityChange,
    handleRemoveItem,
}) => {
    return (
        <div id="cart-items">
            {cartItems.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    handleQuantityChange={handleQuantityChange} // 추가
                    handleRemoveItem={handleRemoveItem}
                />
            ))}
        </div>
    );
};

export default CartDisplay;
