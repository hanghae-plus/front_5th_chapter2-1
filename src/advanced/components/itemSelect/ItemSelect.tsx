import { ItemListType } from 'src/advanced/types/ItemType.js';
import ItemSelectOption from './ItemSelectOption.js';

export default function ItemSelect() {
  const itemList: ItemListType = [];

  return (
    <select
      name="상품 선택"
      id="product-select"
      className="border rounded p-2 mr-2"
    >
      {itemList?.map((item) => <ItemSelectOption key={item.id} item={item} />)}
    </select>
  );
}
