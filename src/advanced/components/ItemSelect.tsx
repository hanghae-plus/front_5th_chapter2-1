import ITEMS from '../constants/items';
import { Item } from '../types/items';

const ItemSelect = ({
  selectedItemId,
  onSelectItem,
}: {
  selectedItemId: string;
  onSelectItem: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <select
      id="product-select"
      className="border rounded p-2 mr-2"
      value={selectedItemId || ''}
      onChange={onSelectItem}
    >
      <option value="" disabled>
        상품을 선택하세요
      </option>
      {ITEMS.map((item: Item) => (
        <option key={item.id} value={item.id} disabled={item.stock === 0}>
          {item.name} - {item.price}원
        </option>
      ))}
    </select>
  );
};

export default ItemSelect;
