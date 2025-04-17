import { useProdListContext } from '../store/prodList/ProdListContext';

const setStockInfoText = (quantity: number) => {
  return quantity > 0 ? `재고 부족 ( ${quantity} 개 남음)` : '품절';
};

const SoldOutInfo = () => {
  const { prodList } = useProdListContext();

  let soldOutInfoMessage = '';

  prodList.forEach((item) => {
    if (item.quantity >= 5) return;
    soldOutInfoMessage += `${item.name}: ${setStockInfoText(item.quantity)} \n`;
  });
  return <div className="text-sm text-gray-500 mt-2">{soldOutInfoMessage}</div>;
};

export default SoldOutInfo;
