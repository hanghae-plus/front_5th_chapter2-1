import React from 'react';
import { ICartProduct } from '../type/product';

interface IProps {
  product: ICartProduct;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
  onRemoveProduct: (productId: string) => void;
}

function CartProduct({ product, onIncreaseQuantity, onDecreaseQuantity, onRemoveProduct }: IProps) {
  return (
    <div id={product.id} className='flex justify-between items-center mb-2'>
      <span>
        {product.name} - {product.price}원 x {product.quantity}
      </span>
      <div>
        <button
          className='quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1'
          onClick={() => onDecreaseQuantity(product.id)}
        >
          -
        </button>
        <button
          className='quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1'
          onClick={() => onIncreaseQuantity(product.id)}
        >
          +
        </button>
        <button
          className='remove-item bg-red-500 text-white px-2 py-1 rounded'
          onClick={() => onRemoveProduct(product.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export { CartProduct };
