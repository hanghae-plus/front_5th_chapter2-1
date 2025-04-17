import { useProducts } from '../contexts/ProductsContext';
import type { CartItem } from '../types';

interface Props {
  item: CartItem;
  onChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onChange, onRemove }: Props) {
  const { products, updateUnits } = useProducts();
  const product = products.find((_product) => _product.id === item.id)!;

  const increaseUnits = () => {
    if (product.units <= 0) return alert('재고 부족');
    onChange(item.id, +1);
    updateUnits(item.id, -1);
  };

  const decreaseUnits = () => {
    onChange(item.id, -1);
    updateUnits(item.id, +1);
  };

  const handleRemove = () => {
    onRemove(item.id);
    updateUnits(item.id, item.quantity);
  };

  return (
    <div id={item.id} className="flex justify-between items-center mb-2">
      <span>
        {product.name} - {product.price}원 x {item.quantity}
      </span>
      <div>
        <button onClick={decreaseUnits} className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1">
          -
        </button>
        <button onClick={increaseUnits} className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1">
          +
        </button>
        <button onClick={handleRemove} className="remove-item bg-red-500 text-white px-2 py-1 rounded">
          삭제
        </button>
      </div>
    </div>
  );
}
