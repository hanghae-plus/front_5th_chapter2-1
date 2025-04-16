import { DOM_IDS, STYLES } from "@/basic/consts";
import { formatProductOption } from "@/advanced/utils";
import { PRODUCT_LIST } from "@/basic/consts";

export const ProductSelect: React.FC = () => {
  return (
    <select 
      id={DOM_IDS.PRODUCT.SELECT} 
      className={STYLES.FORM.SELECT}
    >
      {PRODUCT_LIST.map((item) => (
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