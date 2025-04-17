import { useItem } from '../../context/ItemContext.js';
import { getInfoText } from './getInfoText.js';

export default function StockStatus() {
  const { itemList } = useItem();
  const text = getInfoText(itemList);

  return (
    <div id="stock-status" className="text-sm text-gray-500 mt-2">
      {text}
    </div>
  );
}
