import { useState } from 'react';
import ITEMS from '../constants/items';
import { Item } from '../types/items';

const useSelect = () => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const isSelectedItem = (p: Item, selectedItemId: string) => {
    return p.id === selectedItemId;
  };

  const getSelectedItem = () => {
    return ITEMS.find((id) => isSelectedItem(id, selectedItemId));
  };

  const selectedItem: Item = getSelectedItem()!;

  const handleItemSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemId(event.target.value);
  };
  return { selectedItemId, selectedItem, handleItemSelect };
};
export default useSelect;
