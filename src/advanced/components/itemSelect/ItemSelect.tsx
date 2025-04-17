import { ChangeEvent } from 'react';
import { useItem } from '../../context/ItemContext.js';
import ItemSelectOption from './ItemSelectOption.js';

export default function ItemSelect() {
  const { itemList, setLastSelectedItem, lastSelectedItem } = useItem();
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const itemId = e.target.value;
    setLastSelectedItem(itemId);
  };

  return (
    <select
      name="상품 선택"
      id="product-select"
      className="border rounded p-2 mr-2"
      value={lastSelectedItem ?? ''}
      onChange={handleSelect}
    >
      {itemList?.map((item) => <ItemSelectOption key={item.id} item={item} />)}
    </select>
  );
}
