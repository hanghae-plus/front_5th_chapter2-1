import { ICartItem } from '../types';

interface CartItemProps {
  item: ICartItem;
  onChangeQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onChangeQuantity,
  onRemoveItem,
}: CartItemProps) => {
  return (
    <div id={item.id} className="flex justify-between items-center mb-2">
      <span>
        {item.name} - {item.price.toLocaleString()}원 x {item.quantity}
      </span>
      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id={item.id}
          data-change="-1"
          onClick={() => onChangeQuantity(item.id, -1)}
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id={item.id}
          data-change="1"
          onClick={() => onChangeQuantity(item.id, 1)}
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-product-id={item.id}
          onClick={() => onRemoveItem(item.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
