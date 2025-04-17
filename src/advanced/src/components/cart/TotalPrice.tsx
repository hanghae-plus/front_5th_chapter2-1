import { useAtom } from "jotai";
import { cartAtom } from "../../state";

export const TotalPrice = () => {
  const [cart] = useAtom(cartAtom);
  return (
    <div className="text-xl font-bold my-4">
      총액: {cart.totalPrice}원
      {(cart.totalDiscountRate * 10) / 10 > 0 ? (
        <span className="text-green-500 ml-2">({(cart.totalDiscountRate * 100).toFixed(1)}% 할인 적용)</span>
      ) : (
        <></>
      )}
      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트: {Math.round((cart.totalPrice / 1000) * 10) / 10})
      </span>
    </div>
  );
};
