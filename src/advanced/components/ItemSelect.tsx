import { Items } from '../types/items';

const ItemSelect = ({ items, selectedItemId, onSelectItem }) => {
  // return <select id="product-select" className="border rounded p-2 mr-2"></select>;
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
      {items.map((item: Items) => (
        <option key={item.id} value={item.id} disabled={item.stock === 0}>
          {item.name} - {item.price}원
        </option>
      ))}
    </select>
  );
};

export default ItemSelect;
