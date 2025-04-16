import type React from "react";
import { STYLES } from "@/basic/consts/styles";
import { DOM_IDS } from "@/basic/consts/dom";

export const AddButton: React.FC = () => {
  return (
    <button 
      type="button"
      id={DOM_IDS.PRODUCT.ADD_BUTTON} 
      className={STYLES.BUTTON.PRIMARY}
    >
      추가
    </button>
  );
};
