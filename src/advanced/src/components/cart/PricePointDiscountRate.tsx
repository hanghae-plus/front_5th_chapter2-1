import { Product } from "../../constants";
import { useCaculateCart } from "../../hooks/useCaculateCart";

type Props = {
  cartItems: Record<string, Product>;
};

export const PricePointDiscountRate = ({ cartItems }: Props) => {
  const { discountRate, point, totalPrice } = useCaculateCart(cartItems);

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {totalPrice}원(포인트: {point})
      {discountRate > 0 && (
        <span className="text-red-500">
          (할인율: {discountRate} % 할인 적용)
        </span>
      )}
    </div>
  );
};
