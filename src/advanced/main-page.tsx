import React from 'react';
import { useState } from 'react';
import { ProductListProps, productList } from './mocks/product-list';

export const MainPage = () => {
  const [cartItems, setCartItems] = useState<ProductListProps[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bonusPoint, setBonusPoint] = useState(0);
  const [discRate, setDiscRate] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const calculateCart = () => {
    let total = 0;
    let subTotal = 0;
    let count = 0;

    cartItems.forEach((item: ProductListProps) => {
      const product = productList.find((p) => p.id === item.id);
      if (!product) return;

      // const quantity = item.stock;
      let disc = 0;

      if (item.stock >= 10) {
        if (product.id === 'p1') disc = 0.1;
        else if (product.id === 'p2') disc = 0.15;
        else if (product.id === 'p3') disc = 0.2;
        else if (product.id === 'p4') disc = 0.05;
        else if (product.id === 'p5') disc = 0.25;
      }

      const itemTotal = product.val * item.stock;
      subTotal += itemTotal;
      total += itemTotal * (1 - disc);
      count += item.stock;
    });

    let discount = 0;
    if (count >= 30) {
      const bulkDiscount = total * 0.25;
      const itemDiscount = subTotal - total;
      if (bulkDiscount > itemDiscount) {
        total = subTotal * 0.75;
        discount = 0.25;
      } else {
        discount = itemDiscount / subTotal;
      }
    } else {
      discount = (subTotal - total) / subTotal;
    }

    if (new Date().getDay() === 2) {
      total *= 0.9;
      discount = Math.max(discount, 0.1);
    }

    setTotalAmount(total);
    setDiscRate(discount);
    setBonusPoint(Math.floor(total / 1000));
    setItemCount(count);
  };
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items">
          {cartItems.map((item) => {
            const product = productList.find((p) => p.id === item.id);
            if (!product) return null;
            return (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {product.name} - {product.val}원 x {item.quantity}
                </span>
              </div>
            );
          })}
        </div>
        <div id="cart-total" className="text-xl font-bold my-4">
          총액: {Math.round(totalAmount)}원
          {discRate > 0 ? (
            <span className="text-green-500 ml-2">
              ({(discRate * 100).toFixed(1)}% 할인 적용)
            </span>
          ) : (
            <span id="loyalty-points" className="text-blue-500 ml-2">
              (포인트: {bonusPoint})
            </span>
          )}
        </div>
        <select
          id="product-select"
          className="border rounded p-2 mr-2"
          onChange={(e) => {
            const selectedId = e.target.value;
            setCartItems((prev) => {
              const exists = prev.find((i) => i.id === selectedId);
              if (exists) {
                return prev.map((i) =>
                  i.id === selectedId ? { ...i, quantity: i.stock + 1 } : i
                );
              } else {
                return [...prev, { id: selectedId, quantity: 1 }];
              }
            });
          }}
        >
          <option value="">상품 선택</option>
          {productList.map((item) => (
            <option key={item.id} value={item.id} disabled={item.stock <= 0}>
              {item.name} - {item.val}원
            </option>
          ))}
        </select>
        <div id="stock-status" className="text-sm text-gray-500 mt-2"></div>
        <button
          id="add-to-cart"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          추가
        </button>
      </div>
    </div>
  );
};
