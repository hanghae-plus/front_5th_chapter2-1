import React from "react";
import { AMOUNT_OF_STOCKS } from "../../../context/product";
import { CART_ITEM_EVENT } from "../../../context/interface";
import { CartItemButton } from "./CartItemButton";
import { memo } from "react";

const CartItem = memo (
    ({item, qty, onChangeItem, onRemoveItem}: CART_ITEM_EVENT) => {
        return (
            <div id={item.id} className="flex justify-between items-center mb-2">
                <span>{item.name} - {item.price}원 {AMOUNT_OF_STOCKS} {qty}</span>
                <CartItemButton 
                    item={item}
                    qty={qty}
                    onChangeItem = {onChangeItem}
                    onRemoveItem = {onRemoveItem}
                />
            </div>
        )
    }
)

export { CartItem };