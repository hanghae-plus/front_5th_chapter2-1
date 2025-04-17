import { useCart } from "../hooks/use-cart";
import { useProduct } from "../hooks/use-product";
import { STYLES } from "../lib/styles";
import { PLUS_MINUS } from "../types";

type CartItemProps = {
  id: string;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { products } = useProduct();
  const { handleCartItem: handleAddToCart } = useCart();
  const product = products.find((p) => p.id === id);
  if (!product) return null;
  return (
    <div id={id} className={STYLES.NEW_ITEM}>
      <span>{`${product.name} - ${product.cost}원 x ${quantity}`}</span>
      <div>
        <button
          className={STYLES.QUANTITY_CHANGE}
          onClick={() => handleAddToCart(id, PLUS_MINUS.PLUS)}
        >
          {"+"}
        </button>
        <button
          className={STYLES.QUANTITY_CHANGE}
          onClick={() => handleAddToCart(id, PLUS_MINUS.MINUS)}
        >
          {"-"}
        </button>
        <button className={STYLES.REMOVE_ITEM}>{"삭제"}</button>
      </div>
    </div>
  );
};

export default CartItem;
