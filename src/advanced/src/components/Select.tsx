import { useState } from 'react';
import Button from './Button';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface SelectProps {
  products: Product[];
  onClick: (productId: string) => void;
}

function Select({ products, onClick }: SelectProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>(() => {
    return products[0].id;
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(e.target.value);
  };

  const handleAddToCart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProduct) {
      onClick(selectedProduct);
    }
  };

  return (
    <form onSubmit={handleAddToCart} className='flex items-center'>
      <select
        id='product-select'
        className='border rounded p-2 mr-2'
        onChange={handleChange}
        value={selectedProduct}>
        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
            disabled={product.quantity === 0}>
            {`${product.name} - ${product.price}원`}
          </option>
        ))}
      </select>
      <Button
        id='add-to-cart'
        className='bg-blue-500 text-white px-4 py-2 rounded'
        type='submit'>
        추가
      </Button>
    </form>
  );
}

export default Select;
