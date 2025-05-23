import { useCart } from "../hooks/use-cart";
import { STYLES } from "../lib/styles";
import CartItem from "./CartItem";

const CartItems = () => {
  const { cart } = useCart();

  const cardItems = Object.entries(cart).map(([id, quantity], key) => {
    return <CartItem key={key} id={id} quantity={quantity} />;
  });

  return (
    <div id={"cart-items"} className={STYLES.CART_ITEMS}>
      {cardItems}
    </div>
  );
};

export default CartItems;
