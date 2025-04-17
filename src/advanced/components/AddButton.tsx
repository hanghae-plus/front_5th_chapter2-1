import { ALERT_MESSAGE } from '../constants/alertMessage';
import { useProdListContext } from '../store/prodList/ProdListContext';
import { useSelectContext } from '../store/select/SelectContext';

const AddButton = () => {
  const { select } = useSelectContext();
  const { prodList, setProdList } = useProdListContext();
  const handleClick = () => {
    const targetItem = prodList.find((item) => item.id === select);

    if (!targetItem) return;

    if (targetItem.quantity <= 0) {
      alert(ALERT_MESSAGE.OUT_OF_STOCK);
      return;
    }
    setProdList(
      prodList.map((item) => {
        if (item.id === select) {
          return { ...item, cartCount: item.cartCount + 1, quantity: item.quantity - 1 };
        }
        return item;
      }),
    );
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      추가
    </button>
  );
};

export default AddButton;
