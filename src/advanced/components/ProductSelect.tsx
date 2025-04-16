import { useProduct } from "../hooks/use-product";
import { STYLES } from "../lib/styles";

const ProductSelect = () => {
  const { products } = useProduct();
  return (
    <select id={"product-select"} className={STYLES.PRODUCT_SELECT}>
      {products.map((product, key) => {
        return (
          <option
            key={key}
            value={product.id}
            disabled={product.quantity === 0}
          >
            {`${product.name} - ${product.cost}원`}
          </option>
        );
      })}
    </select>
  );
};

export default ProductSelect;
