import React from 'react';

import products from '../data/products.json';

export default function ProductSelect({
  setSelectedProductId,
}: {
  setSelectedProductId: (id: string) => void;
}) {
  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductId(e.target.value);
  };

  return (
    <select
      id="product-select"
      className="border rounded p-2 mr-2"
      onChange={(e) => handleChangeOption(e)}
    >
      {products.map((product) => (
        <option
          key={product.id}
          value={product.id}
          disabled={product.quantity === 0}
        >
          {product.name} - {product.price}원
        </option>
      ))}
    </select>
  );
}
