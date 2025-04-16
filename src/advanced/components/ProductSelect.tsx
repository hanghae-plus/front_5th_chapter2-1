import { useState } from 'react';
import { Product } from '../types';

interface ProductSelectProps {
  products: Product[];
  onProductAdd: (product: Product) => void;
  disabled?: boolean;
}
const ProductSelect = ({
  products,
  onProductAdd,
  disabled = false,
}: ProductSelectProps) => {
    const [selectedProductId, setSelectedProductId] = useState<string>('');

  const handleAddClick = () => {
    if (selectedProductId) {
        const selectedProduct = products.find(p => p.id === selectedProductId);
        if (selectedProduct) {
            onProductAdd(selectedProduct);
            setSelectedProductId(''); // 선택 초기화
        }
    }
};
  return (
    <>
      <select
        className="border rounded p-2 flex-1"
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
        disabled={disabled}
      >
        <option value="">상품을 선택하세요</option>
        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
            disabled={product.quantity === 0}
          >
            {product.name} - {product.price}원
            {product.quantity === 0 && ' (품절)'}
          </option>
        ))}
      </select>
      <button
        id="add-to-cart"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddClick}
        disabled={!selectedProductId || disabled}
      >
        추가
      </button>
    </>
  );
};

export default ProductSelect;
