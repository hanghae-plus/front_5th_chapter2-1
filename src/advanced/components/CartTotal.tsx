import type { CartItem, Product } from '../types';
import { useCartTotals } from '../hooks/useCartTotals';

interface Props {
  cart: CartItem[];
  products: Product[];
}

export default function CartTotal({ cart, products }: Props) {
  const { total, rate, points } = useCartTotals(cart, products);

  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {total}원
      {rate > 0 && (
        <span className="text-green-500 ml-2">({(rate * 100).toFixed(1)}% 할인 적용)</span>
      )}
      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트: {points})
      </span>
    </div>
  );
}
