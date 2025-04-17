import { CartItem as CartItemType } from '../types/cart';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: string, change: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-700">
        {item.name} - {item.price}원 x {item.quantity}
      </span>
      <div>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={() => onQuantityChange(item.id, -1)}
        >
          -
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={() => onQuantityChange(item.id, 1)}
        >
          +
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => onRemove(item.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
