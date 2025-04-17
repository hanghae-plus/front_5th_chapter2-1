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
}

function Select({ products }: SelectProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedProduct(products.find((product) => product.id === id) || null);
  };

  const handleClickAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedProduct);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <form onSubmit={handleClickAdd}>
        <select
          id='product-select'
          className='border rounded p-2 mr-2'
          onChange={handleChange}>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {`${product.name}-${product.price}원`}
            </option>
          ))}
        </select>
        <Button />
      </form>
    </div>
  );
}

export default Select;
