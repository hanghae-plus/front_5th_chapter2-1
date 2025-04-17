import { DOM_IDS, STYLES } from "@/basic/consts";
import { formatProductOption } from "@/advanced/utils";
import { useProduct } from "@/advanced/context";

export const ProductSelect: React.FC = () => {
  const { productList, setSelectedProductId } = useProduct();

  return (
    <select 
      id={DOM_IDS.PRODUCT.SELECT} 
      className={STYLES.FORM.SELECT}
      onChange={(e) => setSelectedProductId(e.target.value)}
    >
      {productList.map((item) => (
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