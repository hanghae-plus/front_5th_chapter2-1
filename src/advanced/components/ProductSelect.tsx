import { useCart } from "../hooks/use-cart";
import { useProduct } from "../hooks/use-product";
import { STYLES } from "../lib/styles";

const ProductSelect = () => {
  const { products } = useProduct();
  const { lastSelected, setLastSelected } = useCart();

  return (
    <select
      id={"product-select"}
      className={STYLES.PRODUCT_SELECT}
      value={lastSelected || ""}
      onChange={(e) => setLastSelected(e.target.value)}
    >
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
