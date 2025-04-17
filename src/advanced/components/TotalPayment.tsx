import { CartItem } from '../types';
import { DISCOUNT } from '../constants';
import { useEffect, useState } from 'react';

interface TotalPaymentProps {
  cartItems: CartItem[];
}

const TotalPayment = ({ cartItems }: TotalPaymentProps) => {
  const [subTotal, setSubTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);

  function calculateDiscount(): number {
    if (totalQuantity >= 30) {
      return DISCOUNT.BULK_RATE;
    }
    if (new Date().getDay() === 2) {
      return DISCOUNT.TUESDAY_RATE;
    }
    const itemDiscounts = cartItems.reduce(function(total, item) {
      if (item.quantity >= 10) {
        let rate = DISCOUNT.PRODUCT_RATES[item.product.id] || 0;
        return total + item.product.price * item.quantity * rate;
      }
      return total;
    }, 0);

    return subTotal > 0 ? itemDiscounts / subTotal : 0;
  }

  useEffect(function() {
    const newSubTotal = cartItems.reduce(function(sum, item) {
      return sum + item.product.price * item.quantity;
    }, 0);
    const newTotalQuantity = cartItems.reduce(function(sum, item) {
      return sum + item.quantity;
    }, 0);

    setSubTotal(newSubTotal);
    setTotalQuantity(newTotalQuantity);
  }, [cartItems]);

  useEffect(function() {
    const rate = calculateDiscount();
    setDiscountRate(rate);
  }, [cartItems, totalQuantity, subTotal]);

  useEffect(function() {
    const discountAmount = subTotal * discountRate;
    setFinalTotal(subTotal - discountAmount);
    setEarnedPoints(Math.floor((subTotal - discountAmount) * 0.01));
  }, [subTotal, discountRate]);

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
