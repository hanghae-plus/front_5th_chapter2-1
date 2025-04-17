import type React from "react";
import { STYLES, DOM_CLASSES } from "@/basic/consts";
import { formatPrice } from "@/advanced/utils/format";
import type { Product } from "@/advanced/types/product";
import { useShoppingContext } from "@/advanced/context";

interface CartItemProps {
  item: Product;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateProductQuantity, removeProductFromCart } = useShoppingContext();
  
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
          onClick={() => updateProductQuantity(item.id, -1)}
        >
          -
        </button>
        <button
          type="button"
          className={`${STYLES.BUTTON.PRIMARY} ${STYLES.BUTTON.SMALL} ${DOM_CLASSES.BUTTON.QUANTITY_CHANGE}`}
          data-product-id={item.id}
          onClick={() => updateProductQuantity(item.id, 1)}
        >
          +
        </button>
        <button
          type="button"
          className={`${STYLES.BUTTON.DANGER} ${DOM_CLASSES.BUTTON.REMOVE_ITEM}`}
          data-product-id={item.id}
          onClick={() => removeProductFromCart(item.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
