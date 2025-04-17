import React from 'react';
import { IProduct } from '../type/product';

interface IProps {
  product: IProduct;
}

function ProductSelectItem({ product }: IProps) {
  return (
    <option key={product.id} value={product.id} disabled={product.stock === 0}>
      {product.name} - {product.price}원
    </option>
  );
}

export { ProductSelectItem };
