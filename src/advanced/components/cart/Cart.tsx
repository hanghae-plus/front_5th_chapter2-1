import { ItemType, ItemListType } from 'src/advanced/types/ItemType.js';
import CartItemRow from '../cartItemRow/CartItemRow.js';
import { useState } from 'react';

export default function Cart() {
  const [itemList, setItemList] = useState<ItemListType>([]);
  const handleClick = () => {};

  return (
    <div id="cart-items" onClick={handleClick}>
      {itemList.map((item: ItemType) => (
        <CartItemRow key={item.id} item={item} />
      ))}
    </div>
  );
}
