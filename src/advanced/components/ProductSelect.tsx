import React from 'react';
import { Product } from '../hooks/useProduct';

interface ProductSelectProps {
  products: Product[];
  selectedId: string | null;
  onSelect: (productId: string) => void;
}

const ProductSelect = ({
  products,
  selectedId,
  onSelect,
}: ProductSelectProps) => {
  return (
    <select
      id="product-select"
      className="border rounded p-2 mr-2"
      value={selectedId || ''}
      onChange={(e) => onSelect(e.target.value)}
    >
      {/* <option value="" disabled>
        상품을 선택하세요
      </option> */}
      {products.map((product) => (
        <option
          key={product.id}
          value={product.id}
          disabled={product.quantity === 0}
        >
          {product.name} - {product.price}원{' '}
        </option>
      ))}
    </select>
  );
};
export default ProductSelect;
