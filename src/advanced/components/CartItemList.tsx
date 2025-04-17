import React from 'react';
import { Product, CartItem } from '../types/product';

type Props = {
    cartItems: CartItem[];
    setCartItems: (items: CartItem[]) => void;
    productList: Product[]; setProductList: (products: Product[]) => void;
};

export const CartItemList = ({ cartItems, setCartItems, productList, setProductList }: Props) => {
    const handleRemoveItem = (item: CartItem) => {
        const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedCart);
    };

    const handleIncrease = (item: CartItem) => {
        const product = productList.find(p => p.id === item.id);
        if (!product) return;

        if (product.stock <= 0) {
            alert("재고가 부족합니다.");
            return;
        }

        // 1. 장바구니 수량 증가
        const updatedCart = cartItems.map(cartItem =>
            cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
        setCartItems(updatedCart);

        // 2. 상품 재고 감소
        const updatedProducts = productList.map(p =>
            p.id === item.id
                ? { ...p, stock: p.stock - 1 }
                : p
        );
        setProductList(updatedProducts);
    };


    const handleDecrease = (item: CartItem) => {
        const newQuantity = item.quantity - 1;

        // productList에서 해당 상품 찾기
        const updatedProducts = productList.map(p =>
            p.id === item.id
                ? { ...p, stock: p.stock + 1 }
                : p
        );

        console.log("updatedProducts", updatedProducts);
        setProductList(updatedProducts);

        if (newQuantity <= 0) {
            // 수량 0이면 삭제
            const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
            setCartItems(updatedCart);
        } else {
            // 수량 감소
            const updatedCart = cartItems.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
            );
            setCartItems(updatedCart);
        }
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
