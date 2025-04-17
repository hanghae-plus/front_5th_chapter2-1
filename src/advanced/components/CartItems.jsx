import React, { useEffect, useState } from 'react';
import { getState, subscribe } from '../store/index.js';
import {
  handleClickIncrease,
  handleClickDecrease,
  handleClickRemove,
} from '../services/cart-service';
const CartItems = () => {
  const [products, setProducts] = useState(getState().products || []);
  const [cartList, setCartList] = useState(getState().cartList || []);

  useEffect(() => {
    const unsubscribeCartList = subscribe('cartList', () => {
      setCartList(getState().cartList);
    });

    const unsubscribeProducts = subscribe('products', () => {
      setProducts(getState().products);
    });

    return () => {
      unsubscribeCartList();
      unsubscribeProducts();
    };
  }, []);

  const handleQuantityChange = (change, productId) => {
    if (change === 1) {
      handleClickIncrease(productId);
    } else {
      handleClickDecrease(productId);
    }
  };

  const handleRemove = (productId) => {
    handleClickRemove(productId);
  };

  return (
    <div id="cart-items" className="my-4">
      {cartList.map(({ id, name, quantity }) => {
        const product = products.find((product) => product.id === id);
        const price = product?.price || 0;

        return (
          <div
            key={id}
            id={id}
            className="flex justify-between items-center mb-2"
          >
            <span>
              {name} - {price}원 x {quantity}
            </span>
            <div>
              <button
                className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                data-product-id={id}
                onClick={() => handleQuantityChange(-1, id)}
                data-change="-1"
              >
                -
              </button>
              <button
                className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                data-product-id={id}
                onClick={() => handleQuantityChange(1, id)}
                data-change="1"
              >
                +
              </button>
              <button
                className="remove-item bg-red-500 text-white px-2 py-1 rounded"
                data-product-id={id}
                onClick={() => handleRemove(id)}
              >
                삭제
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
