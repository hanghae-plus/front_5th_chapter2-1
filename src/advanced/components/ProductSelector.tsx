import React, { useState } from 'react';
import { IProduct } from '../types';
import AddButton from './AddButton';

interface ProductSelectorProps {
  products: IProduct[];
  onAddToCart: (productId: string) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({ products, onAddToCart }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('p1');

  const handleClickAdd = () => {
    if (!selectedProductId) {
      return;
    }
    onAddToCart(selectedProductId);
  };

  const handleChangeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductId(e.target.value);
  };

  return (
    <div>
      <select
        id="product-select"
        className="border rounded p-2 mr-2"
        value={selectedProductId}
        onChange={handleChangeSelection}
      >
        {products.map(product => (
          <option key={product.id} value={product.id} disabled={product.quantity === 0}>
            {product.name} - {product.price.toLocaleString()}원
          </option>
        ))}
      </select>
      <AddButton onClick={handleClickAdd} />
    </div>
  );
};
