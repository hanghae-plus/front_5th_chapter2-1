import React from 'react';
import { ProductSelectItem } from './ProductSelectItem';
import { IProduct } from '../type/product';

interface IProps {
  products: IProduct[];
  onClick: (productId: string) => void;
}

function ProductSelectOption({ products, onClick }: IProps) {
  return (
    <select
      id='product-select'
      className='border rounded p-2 mr-2'
      onChange={(e) => onClick(e.target.value)}
    >
      {products.map((product) => (
        <ProductSelectItem product={product} key={product.id} />
      ))}
    </select>
  );
}

export { ProductSelectOption };
