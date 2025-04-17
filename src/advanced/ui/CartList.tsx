import React from 'react';
import { useCartStore } from '../stores/useCartStore';

const CartList: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div id="cart-items">
      {cartItems.map((item) => (
        <div key={item.id} id={item.id} className="flex justify-between items-center mb-2">
          <span>
            {item.name} - {item.price}원 x {item.quantity}
          </span>

          <div>
            <button
              className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={item.id}
              data-change={-1}
              onClick={() => updateQuantity(item.id, -1)}
            >
              -
            </button>
            <button
              className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id={item.id}
              data-change={1}
              onClick={() => updateQuantity(item.id, 1)}
            >
              +
            </button>
            <button
              className="remove-item bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => removeFromCart(item.id)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
