import type React from "react";
import { DOM_IDS, STYLES } from "@/basic/consts";
import { useProductSelect } from "@/advanced/hooks/useProductSelect";

export const ProductSelect: React.FC = () => {
  const { options, handleSelectChange, selectedProductId } = useProductSelect();

  return (
    <select 
      id={DOM_IDS.PRODUCT.SELECT} 
      className={STYLES.FORM.SELECT}
      value={selectedProductId}
      onChange={(e) => handleSelectChange(e.target.value)}
    >
      {options.map(({ id, label, disabled }) => (
        <option
          key={id}
          value={id}
          disabled={disabled}
        >
          {label}
        </option>
      ))}
    </select>
  );
};