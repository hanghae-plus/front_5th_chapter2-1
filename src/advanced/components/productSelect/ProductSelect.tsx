import type React from "react";
import { DOM_IDS, STYLES } from "@/basic/consts";
import { useShoppingContext } from "@/advanced/context";
import { formatProductOption } from "@/advanced/utils";

export const ProductSelect: React.FC = () => {
  const { 
    products, 
    selectedProductId, 
    setSelectedProductId 
  } = useShoppingContext();

  return (
    <select 
      id={DOM_IDS.PRODUCT.SELECT} 
      className={STYLES.FORM.SELECT}
      value={selectedProductId}
      onChange={(e) => setSelectedProductId(e.target.value)}
    >
      {products.map((item) => (
        <option
          key={item.id}
          value={item.id}
          disabled={item.quantity === 0}
        >
          {formatProductOption(item)}
        </option>
      ))}
    </select>
  );
};