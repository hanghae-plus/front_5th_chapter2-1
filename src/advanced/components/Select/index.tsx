import { ChangeEvent } from 'react';
import { useCartControls } from '../../context';

interface Props {
  productId: string;
  onChange: (productId: string) => void;
}

export const Select = ({ productId, onChange }: Props) => {
  const { productList } = useCartControls();

  return (
    <select
      value={productId}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
      className="border rounded p-2 mr-2"
    >
      {productList.map((product) => (
        <option disabled={product.quantity <= 0} value={product.id} key={product.id}>
          {product.name} - {product.price}원
        </option>
      ))}
    </select>
  );
};
