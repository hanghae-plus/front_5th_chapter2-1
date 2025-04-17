import type React from "react";
import { STYLES, DOM_CLASSES } from "@/basic/consts";
import { formatPrice } from "@/advanced/utils/format";
import type { Product } from "@/advanced/types/product";
import { useCartItem } from "@/advanced/hooks";

interface CartItemProps {
  item: Product;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {

  const { changeQuantity, removeItem } = useCartItem(item);
  
  return (
    <div id={item.id} className={STYLES.LAYOUT.FLEX}>
      <span data-value={item.value} data-quantity={item.quantity}>
        {`${item.name} - ${formatPrice(item.value)} x ${item.quantity}`}
      </span>
      <div>
        <button
          type="button"
          className={`${STYLES.BUTTON.PRIMARY} ${STYLES.BUTTON.SMALL} ${DOM_CLASSES.BUTTON.QUANTITY_CHANGE}`}
          data-product-id={item.id}
          onClick={() => changeQuantity(-1)}
        >
          -
        </button>
        <button
          type="button"
          className={`${STYLES.BUTTON.PRIMARY} ${STYLES.BUTTON.SMALL} ${DOM_CLASSES.BUTTON.QUANTITY_CHANGE}`}
          data-product-id={item.id}
          onClick={() => changeQuantity(1)}
        >
          +
        </button>
        <button
          type="button"
          className={`${STYLES.BUTTON.DANGER} ${DOM_CLASSES.BUTTON.REMOVE_ITEM}`}
          data-product-id={item.id}
          onClick={removeItem}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
