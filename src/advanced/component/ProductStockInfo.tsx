import React from 'react';
import { IProduct } from '../type/product';
import { LOW_STOCK_THRESHOLD } from '../constant/cart';

interface IProps {
  products: IProduct[];
}

function ProductStockInfo({ products }: IProps) {
  const lowStockProducts = products.filter((product) => product.stock < LOW_STOCK_THRESHOLD);

  const message = lowStockProducts
    .map((product) =>
      product.stock > 0
        ? `${product.name}: 재고 부족 (${product.stock}개 남음)`
        : `${product.name}: 품절`,
    )
    .join(' ');

  return (
    <div id='stock-status' className='text-sm text-gray-500 mt-2'>
      {message}
    </div>
  );
}

export { ProductStockInfo };
