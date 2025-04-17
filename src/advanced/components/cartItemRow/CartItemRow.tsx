import { ItemType } from 'src/advanced/types/ItemType.js';

interface Props {
  item: ItemType;
  handleIncrease: (itemId: string, itemQuuantity: number) => void;
  handleDecrease: (itemId: string, itemQuuantity: number) => void;
  handleRemove: (itemId: string) => void;
}

export default function CartItemRow({
  item,
  handleIncrease,
  handleDecrease,
  handleRemove,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span>
        {item.name} - {item.price}원 x {item.quantity}
      </span>
      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-item-id="${item.id}"
          data-change="-1"
          onClick={() => handleDecrease(item.id, item.quantity)}
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-item-id="${item.id}"
          data-change="1"
          onClick={() => handleIncrease(item.id, item.quantity)}
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-item-id="${item.id}"
          onClick={() => handleRemove(item.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
