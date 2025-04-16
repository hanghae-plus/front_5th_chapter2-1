import { useCart } from "@advanced/lib/contexts/CartProvider";

export function CartTotal() {
  const { state } = useCart();

  return (
    <div id="cart-total" className="text-xl font-bold mb-4 space-x-2">
      <span>총액: {state.totalAmount}원</span>
      {state.discountRate > 0 && (
        <span className="text-green-500">({(state.discountRate * 100).toFixed(1)}% 할인 적용)</span>
      )}
      <span id="loyalty-points" className="text-blue-500">
        (총 포인트: {state.bonusPoints}P)
      </span>
    </div>
  );
}
