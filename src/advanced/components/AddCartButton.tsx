import ITEMS from '../constants/items';
import useCart from '../hooks/useCart';
import { Item } from '../types/items';

const AddCartButton = ({ selectedItemId }: { selectedItemId: string }) => {
  //
  const { isClickAddButton, setIsClickAddButton } = useCart();

  const isSelectedItem = (p: Item, selectedItemId: string) => {
    return p.id === selectedItemId;
  };

  const getSelectedItem = (selectedItemId: string) => {
    return ITEMS.find((id) => isSelectedItem(id, selectedItemId));
  };

  const isItemAvailable = (selecedItem: Item) => {
    return selecedItem && selecedItem.stock > 0;
  };

  const handleAddToCart = () => {
    setIsClickAddButton(!isClickAddButton);

    let selectedItem = getSelectedItem(selectedItemId);
    console.log('id는', selectedItemId);
    if (!selectedItem) return;
    if (!isItemAvailable(selectedItem)) return;
  };

  return (
    <button
      id="add-to-cart"
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      추가
    </button>
  );
};

export default AddCartButton;
