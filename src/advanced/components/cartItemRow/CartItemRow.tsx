import { ItemType } from 'src/advanced/types/ItemType.js';

interface Props {
  item: ItemType;
}

export default function CartItemRow({ item }: Props) {
  return (
    <>
      <span>
        ${item.name} - ${item.price}원 x 1
      </span>
      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-item-id="${item.id}"
          data-change="-1"
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-item-id="${item.id}"
          data-change="1"
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-item-id="${item.id}"
        >
          삭제
        </button>
      </div>
    </>
  );
}
