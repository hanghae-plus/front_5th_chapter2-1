import React from 'react';
import { Cart } from '../../../../../shared/store/cart';
import { findProduct, getProductList } from '../../../../../shared/store/productList';
import { ElementIds } from '../../../../../shared/app/constants';

interface CartDisplayProps {
  cart: Cart;
  onQuantityChange: (productId: string, change: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartDisplay: React.FC<CartDisplayProps> = ({
  cart,
  onQuantityChange,
  onRemoveItem,
}) => {
  const products = getProductList();

  return (
    <div id={ElementIds.CART_DISP}>
      {cart.map((item) => {
        const product = findProduct(products, item.productId);
        if (!product) return null;

        return (
          <div
            key={item.productId}
            id={item.productId}
            className="flex justify-between items-center mb-2"
          >
            <span>
              {product.name} - {product.val}원 x {item.quantity}
            </span>
            <div>
              <button
                className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                onClick={() => onQuantityChange(item.productId, -1)}
              >
                -
              </button>
              <button
                className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                onClick={() => onQuantityChange(item.productId, 1)}
              >
                +
              </button>
              <button
                className="remove-item bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onRemoveItem(item.productId)}
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