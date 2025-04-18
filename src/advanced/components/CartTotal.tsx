import { useCart } from '../provider/CartProvider';

function CartTotal() {
  const { cartState } = useCart();

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {Math.round(cartState.cartTotalPrice)}원
      {cartState.discountRate > 0 && (
        <span className="text-green-500 ml-2">
          ({(cartState.discountRate * 100).toFixed(1)}% 할인 적용)
        </span>
      )}
      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트: {Math.floor(cartState.cartTotalPrice / 1000)})
      </span>
    </div>
  );
}

export default CartTotal;
