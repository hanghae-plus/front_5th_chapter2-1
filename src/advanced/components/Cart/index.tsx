import React, { useEffect, useState } from 'react';
import { useCart, useProducts } from '../../context';
import CartItem from '../CartItems';
import { DAY_OF_WEEK } from '../../lib';

const Cart: React.FC = () => {
  const [displayAmount, setDisplayAmount] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);

  const { cart } = useCart();
  const { getProductById, getDiscountRate } = useProducts();

  useEffect(() => {
    if (!cart.items.length) {
      setDisplayAmount(0);
      setDiscountRate(0);
      setBonusPoints(0);

      return;
    }

    let originalTotalAmount = 0;
    let totalAmount = 0;
    let itemCount = 0;

    cart.items.forEach((item) => {
      const product = getProductById(item.productId);

      if (!product) return;

      const itemTotalAmount = product.price * item.quantity;
      originalTotalAmount += itemTotalAmount;

      const productDiscountRate = item.quantity >= 10 ? getDiscountRate(item.productId) : 0;
      totalAmount += itemTotalAmount * (1 - productDiscountRate);

      itemCount += item.quantity;
    });

    let finalDiscountRate = 0;

    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = originalTotalAmount - totalAmount;
    const isBulkDiscount = itemCount >= 30 && bulkDiscount > itemDiscount;

    if (isBulkDiscount) {
      totalAmount = totalAmount * (1 - 0.25);
      finalDiscountRate = 0.25;
    } else if (itemDiscount > 0) {
      finalDiscountRate = itemDiscount / originalTotalAmount;
    }

    if (new Date().getDay() === DAY_OF_WEEK.TUESDAY) {
      totalAmount = totalAmount * (1 - 0.1);
      finalDiscountRate = Math.max(finalDiscountRate, 0.1);
    }

    const points = Math.floor(totalAmount / 1000);

    setDisplayAmount(Math.round(totalAmount));
    setDiscountRate(finalDiscountRate);
    setBonusPoints(points);
  }, [cart.items, getProductById, getDiscountRate]);

  return (
    <>
      <div id="cart-items">
        {cart.items.map((item) => (
          <CartItem key={item.productId} productId={item.productId} quantity={item.quantity} />
        ))}
      </div>

      <div id="cart-total" className="text-xl font-bold my-4">
        총액: {displayAmount}원
        {discountRate > 0 && (
          <span className="text-green-500 ml-2">({(discountRate * 100).toFixed(1)}% 할인 적용)</span>
        )}
        {bonusPoints > 0 && (
          <span id="loyalty-points" className="text-blue-500 ml-2">
            (포인트: {bonusPoints})
          </span>
        )}
      </div>
    </>
  );
};

export default Cart;
