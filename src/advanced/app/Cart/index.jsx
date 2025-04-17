import { AddProduct } from './components/AddProduct/index.jsx';
import React, { useState } from 'react';
import { CartDisplay } from './components/CartDisplay/index.jsx';
import { ElementIds } from '../../../shared/app/constants.ts';
import { defaultProductList } from './data.js';
import { useProductList } from './logic.js';

export function Cart() {
  /**
   * 카트 내에서 상태로 관리해야 하는 개념을 찾기
   * 1. lastSel
   *   : lastSel 은 현재 getter, setter 를 두고 있으므로 state로 관리가 쉬울 것 같기도 함
   * 2. 카트 안에 담긴 아이템들
   *  - 현재는 DOM을 찾고 그 안의 텍스트를 파싱해서 장바구니 아이템을 알아내는데,
   *  - 장바구니 아이템을 기준으로 DOM은 이 아이템을 기준으로 그리기만 하는 것이 좋을 것 같다
   */
  const { productList, decreaseQuantityById, findProductById, hasQuantity } =
    useProductList();
  const [cartItems, setCartItems] = useState([]);
  function increaseQuantity(sameItemInCart) {
    const { productId, quantity } = sameItemInCart;
    const hasEnoughQuantity = hasQuantity(productId, quantity + 1);
    if (!hasEnoughQuantity) {
      alert('재고가 부족합니다.');
      return;
    }

    const newCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(newCartItems);
    decreaseQuantityById(productId);
  }
  function addNewItem(itemId) {}

  function addItemToCart(itemId) {
    const sameItemInCart = cartItems.find((cartItem) => cartItem.id === itemId);
    sameItemInCart
      ? increaseQuantity({ ...sameItemInCart })
      : addNewItem(itemId);
  }

  return (
    <div
      className={
        'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'
      }
    >
      <h1 className={'text-2xl font-bold mb-4'}>장바구니</h1>
      <CartDisplay cartItems={cartItems} />
      <div id={ElementIds.SUM} className={'text-xl font-bold my-4'}></div>
      <AddProduct />
    </div>
  );
}
