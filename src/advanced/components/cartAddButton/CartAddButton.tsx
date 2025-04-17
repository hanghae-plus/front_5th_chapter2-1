import { MouseEvent } from 'react';
import { useItem } from '../../context/ItemContext.js';

export default function CartAddButton() {
  const { itemList, lastSelectedItem, updateQuantity } = useItem();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const $target = e.target as HTMLButtonElement;
    const itemId = $target?.dataset?.id;
    if (!itemId) return;

    const stockQuantity =
      itemList.find((item) => item.id === itemId)?.quantity || 0;
    if (stockQuantity === 0) {
      // TO-DO: 상수화하기
      alert('재고가 없습니다.');
      return;
    }
    updateQuantity(itemId, -1);
  };

  return (
    <button
      id="add-to-cart"
      className="bg-blue-500 text-white px-4 py-2 rounded"
      data-id={lastSelectedItem}
      onClick={handleClick}
    >
      추가
    </button>
  );
}
