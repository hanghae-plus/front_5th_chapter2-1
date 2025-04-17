import { useCart } from "@advanced/lib/contexts/CartProvider";

export function CartTotal() {
  const {
    state: { totalAmount, discountRate, bonusPoints },
  } = useCart();

  return (
    <div id="cart-total" className="text-xl font-bold mb-4 space-x-2">
      <span>총액: {totalAmount}원</span>
      {discountRate > 0 && <span className="text-green-500">({(discountRate * 100).toFixed(1)}% 할인 적용)</span>}
      <span id="loyalty-points" className="text-blue-500">
        (총 포인트: {bonusPoints}P)
      </span>
    </div>
  );
}
