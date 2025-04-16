import React from 'react';
import { CartItem } from '../types/product';

type Props = {
    cartItems: CartItem[];
    setCartItems: (items: CartItem[]) => void;
};

export const CartItemList = ({ cartItems, setCartItems }: Props) => {
    const handleRemoveItem = (item: CartItem) => {
        const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedCart);
    };

    const handleIncrease = (item: CartItem) => {
        const updatedCart = cartItems.map(cartItem =>
            cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
        setCartItems(updatedCart);
    };

    const handleDecrease = (item: CartItem) => {
        if (item.quantity <= 1) {
            handleRemoveItem(item);
            return;
        }

        const updatedCart = cartItems.map(cartItem =>
            cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
        setCartItems(updatedCart);
    };

    return (
        <>
            {cartItems.map((item, index) => (
                <div key={index} className='flex justify-between items-center mb-2'>
                    <span>{item.name} - {item.price.toLocaleString()}원 x {item.quantity}</span>
                    <div>
                        <button
                            className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                            onClick={() => handleDecrease(item)}
                        >
                            -
                        </button>
                        <button
                            className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                            onClick={() => handleIncrease(item)}
                        >
                            +
                        </button>
                        <button
                            className="remove-item bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => handleRemoveItem(item)}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CartItemList;
