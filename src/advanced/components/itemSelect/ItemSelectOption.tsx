import { ItemType } from 'src/advanced/types/ItemType.js';

interface Props {
  item: ItemType;
}

export default function ItemSelectOption({ item }: Props) {
  return (
    <option value={item.id} disabled={item.quantity === 0}>
      {item.name} - {item.price.toFixed(0)}원
    </option>
  );
}
