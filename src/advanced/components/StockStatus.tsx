import React, { useEffect, useState } from 'react';
import { getState, subscribe } from '../store';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const StockStatus = (): React.ReactElement => {
  const [products, setProducts] = useState(getState().products || []);

  useEffect(() => {
    const unsubscribe = subscribe('products', () => {
      setProducts(getState().products);
    });

    return () => unsubscribe();
  }, []);

  // 재고가 5개 미만인 상품만 표시
  const lowStockProducts = products.filter(
    (product: Product) => product.stock < 5,
  );

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {lowStockProducts.map((product: Product) => (
        <div key={product.id}>
          {product.name}:{' '}
          {product.stock > 0 ? `재고 부족 (${product.stock}개 남음)` : `품절`}
        </div>
      ))}
    </div>
  );
};

export default StockStatus;
