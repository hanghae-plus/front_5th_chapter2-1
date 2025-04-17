import { POINT_RATE } from "../config/constants";
import { useCart } from "../hooks/use-cart";
import { STYLES } from "../lib/styles";

const CartTotal = () => {
  const { getTotalCost } = useCart();
  const { totalCost, discountRate } = getTotalCost();
  return (
    <div id={"cart-total"} className={STYLES.CART_TOTAL}>
      {`총액: ${Math.round(totalCost)}원`}
      {!!discountRate && (
        <span className={STYLES.TOTAL_TEXT}>
          {`(${(discountRate * 100).toFixed(1)}% 할인 적용)`}
        </span>
      )}
      <span id={"loyalty-points"} className={STYLES.LOYALTY_POINTS}>
        {`(포인트: ${Math.floor(totalCost * POINT_RATE)})`}
      </span>
    </div>
  );
};

export default CartTotal;
