import React from 'react';
import { Product, useCartStore } from '../store/cartStore';

function ProductSelect() {
  const { products, selectedId, setSelectedId } = useCartStore();

  return (
    <select
      id="product-select"
      className="border rounded p-2 mr-2"
      value={selectedId}
      onChange={(e) => setSelectedId(e.target.value)}
    >
      {products.map((product) => (
        <option key={product.id} value={product.id} disabled={product.q === 0}>
          {product.name} ({product.q === 0 ? '품절' : `재고: ${product.q}`})
        </option>
      ))}
    </select>
  );
}

export default ProductSelect;
