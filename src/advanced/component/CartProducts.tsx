import React from 'react';
import { ICartProduct, IProduct } from '../type/product';
import { CartProduct } from './CartProduct';

interface IProps {
  products: Record<string, ICartProduct>;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
  onRemoveProduct: (productId: string) => void;
}

function CartProducts({
  products,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveProduct,
}: IProps) {
  return (
    <div id='cart-items'>
      {Object.values(products).map((product) => (
        <CartProduct
          key={product.id}
          product={product}
          onDecreaseQuantity={onDecreaseQuantity}
          onIncreaseQuantity={onIncreaseQuantity}
          onRemoveProduct={onRemoveProduct}
        />
      ))}
    </div>
  );
}

export { CartProducts };
