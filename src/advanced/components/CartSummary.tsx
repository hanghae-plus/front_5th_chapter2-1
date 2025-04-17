import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '../types/product';
import { useCart } from '../hooks/useCart';

const CartSummary = ({ cartItems }: { cartItems: CartItem[] }) => {
    const { totalAmount, totalDiscount, totalPoints } = useCart(cartItems);

    return (
        <div className="text-xl font-bold my-4">
            총액: {totalAmount.toLocaleString()}원
            {totalDiscount > 0 && (
                <span className='text-green-500 ml-2'>({(totalDiscount * 100).toFixed(1)}% 할인 적용)</span>
            )}
            <span className='text-blue-500 ml-2'>(포인트: {totalPoints})</span>
        </div>)
}


export default CartSummary;



