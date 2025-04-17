import type React from "react";
import { STYLES } from "@/basic/consts/styles";
import { DOM_IDS } from "@/basic/consts/dom";
import { useAddCartItem } from "@/advanced/hooks";

export const AddButton: React.FC = () => {
  const { handleAddButtonClick } = useAddCartItem();

  return (
    <button
      type="button"
      id={DOM_IDS.PRODUCT.ADD_BUTTON}
      className={STYLES.BUTTON.PRIMARY}
      onClick={handleAddButtonClick}
    >
      추가
    </button>
  );
};
