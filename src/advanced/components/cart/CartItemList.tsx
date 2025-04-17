import { useCart } from "@advanced/lib/contexts/CartProvider";
import type { CartItem } from "@advanced/lib/types";

export function CartItemList() {
  const {
    state: { addedItems },
    dispatch,
  } = useCart();

  const handleQuantityChange = (item: CartItem, change: number) => {
    dispatch({ type: "CHANGE_QUANTITY", payload: { ...item, change } });
  };

  const handleRemoveItem = (item: CartItem) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  return (
    <div id="cart-items" className="mb-4">
      {addedItems.map((item) => (
        <CartItemList.Item
          key={item.id}
          {...item}
          onAdd={() => handleQuantityChange(item, 1)}
          onRemove={() => handleQuantityChange(item, -1)}
          onDelete={() => handleRemoveItem(item)}
        />
      ))}
    </div>
  );
}

CartItemList.Item = ({
  id,
  name,
  price,
  quantity,
  onAdd,
  onRemove,
  onDelete,
}: CartItem & { onAdd: () => void; onRemove: () => void; onDelete: () => void }) => {
  return (
    <div key={id} className="flex justify-between items-center mb-2">
      <span>
        {name} - {price}원 x {quantity}
      </span>
      <div>
        <button
          type="button"
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          onClick={onRemove}
        >
          -
        </button>
        <button type="button" className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" onClick={onAdd}>
          +
        </button>
        <button type="button" className="remove-item bg-red-500 text-white px-2 py-1 rounded" onClick={onDelete}>
          삭제
        </button>
      </div>
    </div>
  );
};
