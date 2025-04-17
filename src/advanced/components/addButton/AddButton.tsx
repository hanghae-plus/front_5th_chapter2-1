import type React from "react";
import { STYLES } from "@/basic/consts/styles";
import { DOM_IDS } from "@/basic/consts/dom";
import { useShoppingContext } from "@/advanced/context";

export const AddButton: React.FC = () => {
  const { selectedProductId, addProductToCart } = useShoppingContext();

  return (
    <button
      type="button"
      id={DOM_IDS.PRODUCT.ADD_BUTTON}
      className={STYLES.BUTTON.PRIMARY}
      onClick={() => addProductToCart(selectedProductId)}
    >
      추가
    </button>
  );
};
