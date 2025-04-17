import { Product } from '../types/product';

interface SelectBoxProps {
  products: Product[];
  value: string;
  onChange: (value: string) => void;
}

export const SelectBox = ({ products, value, onChange }: SelectBoxProps) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="product-select">
      {products.map(({ id, name, price, quantity }) => (
        <option key={id} value={id} disabled={quantity === 0}>
          {`${name} - ${price}원`}
        </option>
      ))}
    </select>
  );
};
