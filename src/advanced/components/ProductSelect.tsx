import { Product } from '../types/product';

interface ProductSelectProps {
  products: Product[];
  selectedProductId: string;
  onProductSelect: (productId: string) => void;
}

const ProductSelect = ({ products, selectedProductId, onProductSelect }: ProductSelectProps) => {
  return (
    <select
      id="product-select"
      className="border rounded p-2 mr-2"
      value={selectedProductId}
      onChange={(e) => onProductSelect(e.target.value)}
    >
      {products.map((product) => (
        <option key={product.id} value={product.id} disabled={product.quantity <= 0}>
          {product.name} - {product.price}원
        </option>
      ))}
    </select>
  );
};

export default ProductSelect;
