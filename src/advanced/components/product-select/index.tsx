import { SelectProvider } from '../../context/select';
import { useStock } from '../../context/stock';
import { Select } from './select';
import { AddProductButton } from './add-product-button';

export const ProductSelect = () => {
  const { stockList } = useStock();

  return (
    <SelectProvider>
      <Select>
        {stockList.map((product) => (
          <option
            key={product.id}
            disabled={product.stockQuantity === 0}
            value={product.id}
          >
            {product.name} - {product.price}원
          </option>
        ))}
      </Select>
      <AddProductButton />
    </SelectProvider>
  );
};
