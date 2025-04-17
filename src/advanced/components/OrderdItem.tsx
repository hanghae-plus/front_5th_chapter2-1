import { useEffect } from 'react';
import { useProdListContext } from '../store/prodList/ProdListContext';
import { ALERT_MESSAGE } from '../constants/alertMessage';

interface PropsType {
  name: string;
  price: number;
  cartCount: number;
  id: string;
}

const OrderedItem = ({ name, price, cartCount, id }: PropsType) => {
  const { prodList, setProdList } = useProdListContext();

  const handleDecreaseQuantity = () => {
    const targetItem = prodList.find((item) => item.id === id);

    if (!targetItem) return;

    setProdList(
      prodList.map((item) => {
        if (item.id === id) {
          return { ...item, cartCount: item.cartCount - 1, quantity: item.quantity + 1 };
        }
        return { ...item };
      }),
    );
  };

  const handleIncreaseQuantity = () => {
    const targetItem = prodList.find((item) => item.id === id);

    if (!targetItem) return;

    if (targetItem.quantity <= 0) {
      alert(ALERT_MESSAGE.OUT_OF_STOCK);
      return;
    }

    setProdList(
      prodList.map((item) => {
        if (item.id === id) {
          return { ...item, cartCount: item.cartCount + 1, quantity: item.quantity - 1 };
        }
        return { ...item };
      }),
    );
  };

  const handleRemove = () => {
    setProdList(
      prodList.map((item) => {
        if (item.id === id) {
          return { ...item, cartCount: 0, quantity: item.quantity + item.cartCount };
        }
        return { ...item };
      }),
    );
  };

  //handleIncreaseQuantity handleDecreaseQuantity에서 공통 부분을 빼면 오히려 과도할것 같아 빼지 않음 나만의 기준
  return (
    <div className="flex justify-between items-center mb-2">
      <span>
        {name} - {price}원 x {cartCount}
      </span>
      <div>
        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1" onClick={handleDecreaseQuantity}>
          -
        </button>
        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1" onClick={handleIncreaseQuantity}>
          +
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={handleRemove}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default OrderedItem;
