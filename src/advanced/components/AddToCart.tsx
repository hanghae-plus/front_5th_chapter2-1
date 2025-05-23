import { useCart } from "../hooks/use-cart";
import { useProduct } from "../hooks/use-product";
import { STYLES } from "../lib/styles";
import { PLUS_MINUS } from "../types";

const AddToCart = () => {
  const { lastSelected } = useProduct();
  const { handleCartItem } = useCart();

  const handleClick = () => {
    if (!lastSelected) return;
    handleCartItem(lastSelected, PLUS_MINUS.PLUS);
  };
  return (
    <button
      id={"add-to-cart"}
      className={STYLES.ADD_TO_CART}
      onClick={handleClick}
    >
      {"추가"}
    </button>
  );
};

export default AddToCart;
