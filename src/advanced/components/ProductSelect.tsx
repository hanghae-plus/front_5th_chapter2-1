import React, { useEffect, useState } from 'react';
import { initialProducts } from '../constants';
import { getState, subscribe } from '../store';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const ProductSelect = (): React.ReactElement => {
  const [products, setProducts] = useState(
    getState().products || initialProducts,
  );

  useEffect(() => {
    const unsubscribe = subscribe('products', () => {
      setProducts(getState().products);
    });

    return () => unsubscribe();
  }, []);

  return (
    <select id="product-select" className="border rounded p-2 mr-2">
      {products.map((product: Product) => (
        <option
          key={product.id}
          value={product.id}
          disabled={product.stock === 0}
        >
          {product.name} - {product.price}원
        </option>
      ))}
    </select>
  );
};

export default ProductSelect;
