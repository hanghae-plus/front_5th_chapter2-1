import React, { useEffect, useState } from 'react';
import { Product, getProductList } from '../../../../../shared/store/productList';
import { ElementIds } from '../../../../../shared/app/constants';

interface AddProductProps {
  onAddToCart: (productId: string) => void;
}

export const AddProduct: React.FC<AddProductProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  useEffect(() => {
    setProducts(getProductList());
  }, []);

  const handleAddClick = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct);
    }
  };

  return (
    <div className="mb-4 flex gap-2">
      <select
        id={ElementIds.PRODUCT_SELECT}
        className="border p-2 rounded"
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      >
        <option value="">상품을 선택하세요</option>
        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
            disabled={product.q <= 0}
          >
            {product.name} - {product.val}원
          </option>
        ))}
      </select>
      <button
        id={ElementIds.ADD_BTN}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddClick}
        disabled={!selectedProduct}
      >
        추가
      </button>
    </div>
  );
}; 