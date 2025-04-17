import { CartItem } from '../types';
import { useCartSummary } from '../hooks/useCartSummary.ts';

interface TotalPaymentProps {
  cartItems: CartItem[];
}

const TotalPayment = ({ cartItems }: TotalPaymentProps) => {
  const {
    discountRate,
    finalTotal,
    earnedPoints,
  } = useCartSummary(cartItems);


  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: {finalTotal.toLocaleString()}원
      {!!discountRate && (
        <span className="text-green-500 ml-2">
          ({(discountRate * 100).toFixed(1)}% 할인 적용)
        </span>
      )}

      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트:{earnedPoints.toLocaleString()})
      </span>
    </div>
  );
};

export default TotalPayment;
