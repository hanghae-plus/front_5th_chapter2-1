import React from "react";
import { OUT_OF_STOCKS } from "../../../context/product";
import { CART_ITEM_EVENT } from "../../../context/interface";


function handleDecrease({item, qty, onChangeItem, onRemoveItem}: CART_ITEM_EVENT){
    if(qty <= 1){
        onRemoveItem(item.id);
        return;
    }
    onChangeItem(item.id, -1);
}

function handleIncrease({item, onChangeItem}: CART_ITEM_EVENT){
    if(item.stock <= 0){
        alert(OUT_OF_STOCKS);
        return;
    }
    onChangeItem(item.id, 1);
}


function CartItemButton({item, qty, onChangeItem, onRemoveItem}: CART_ITEM_EVENT){

    return (
        <div>
            <button
                className="stock-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                onClick={() => handleDecrease({item, qty, onChangeItem, onRemoveItem})}>
            -
            </button>
            <button
                className="stock-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                onClick={() => handleIncrease({item, qty, onChangeItem, onRemoveItem})}>
            +
            </button>
            <button
                className="remove-item bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onRemoveItem(item.id)}>
            삭제
            </button>
        </div>
    );
}

export { CartItemButton };