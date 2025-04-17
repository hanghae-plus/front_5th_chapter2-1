import React from 'react';
import { useCartStore } from '../store/cartStore';

function CartItems() {
  const { cart, setCart } = useCartStore();

  const getDiscountRate = (id: string, qty: number) => {
    if (qty < 10) return 0;
    if (id === 'p1') return 0.1;
    if (id === 'p2') return 0.15;
    if (id === 'p3') return 0.2;
    if (id === 'p4') return 0.05;
    if (id === 'p5') return 0.25;
    return 0;
  };

  const increaseQty = (id: string) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div id="cart-items" className="mt-6">
      {cart.length === 0 ? (
        <p className="text-gray-500">🧺 장바구니가 비었습니다</p>
      ) : (
        cart.map((item) => {
          const discountRate = getDiscountRate(item.id, item.qty);
          const itemTotal = item.val * item.qty * (1 - discountRate);
          const bonusPts = Math.floor(itemTotal / 1000);

          return (
            <div
              key={item.id}
              className="flex flex-col justify-between mb-4 border-b pb-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  {item.name} - {item.val.toLocaleString()}원 x {item.qty}
                </div>
                <div className="space-x-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>
                  <button
                    className="px-2 py-1 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white font-bold rounded hover:bg-red-600"
                    onClick={() => removeItem(item.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {discountRate > 0 && (
                  <span className="text-green-600 mr-3">
                    할인: {(discountRate * 100).toFixed(0)}%
                  </span>
                )}
                <span className="text-blue-600">포인트: {bonusPts}점</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default CartItems;
