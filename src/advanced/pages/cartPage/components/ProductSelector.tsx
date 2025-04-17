import { Select } from '../../../components';
import { Product } from '../../../types/product';

// 습관: 프롭스 타입 이름에 props를 붙인다
interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product;
  onSelectProduct: (productId: string) => void;
}

export default function ProductSelector({
  products,
  selectedProduct,
  onSelectProduct,
}: ProductSelectorProps) {
  return (
    <Select
      value={selectedProduct.id || products[0]?.id}
      onChange={onSelectProduct}
      className="border rounded p-2 mr-2"
    >
      {products.map((product) => (
        <Select.Option key={product.id} value={product.id} disabled={product.stock === 0}>
          {`${product.name} - ${product.price}원`}
        </Select.Option>
      ))}
    </Select>
  );
}
