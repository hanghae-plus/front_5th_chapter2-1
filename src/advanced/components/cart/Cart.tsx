import { ItemType } from 'src/advanced/types/ItemType.js';
import CartItemRow from '../cartItemRow/CartItemRow.js';
import { useItem } from '../../context/ItemContext.js';
import { textUtils } from '../../utils/textUtils.js';

export default function Cart() {
  const {
    cartItemList,
    itemList,
    increaseCartItem,
    decreaseCartItem,
    removeCartItem,
  } = useItem();

  const handleIncrease = (id: string) => {
    const stockQuantity =
      itemList.find((item) => item.id === id)?.quantity || 0;
    if (stockQuantity === 0) {
      alert(textUtils.OUT_OF_STOCK);
      return;
    }
    increaseCartItem(id);
  };

  const handleDecrease = (id: string) => {
    const cartQuantity =
      cartItemList.find((item) => item.id === id)?.quantity || 0;
    if (cartQuantity <= 1) {
      removeCartItem(id);
      return;
    }
    decreaseCartItem(id);
  };

  return (
    <div id="cart-items">
      {cartItemList.map((item: ItemType) => (
        <CartItemRow
          key={item.id}
          item={item}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleRemove={removeCartItem}
        />
      ))}
    </div>
  );
}
