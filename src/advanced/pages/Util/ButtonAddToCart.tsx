import React from "react"
import { addCartItem } from "../../services/Item/AddItem"
import { useState } from "react"

function AddButton({product, selectItemId, cartItems, setCartItems}){

    const handleClick = () => {
        addCartItem(product, selectItemId, cartItems, setCartItems);
    }

    return (
        <button id="add-to-cart"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleClick()}
        > 추가
        </button>
    )
}

export { AddButton }