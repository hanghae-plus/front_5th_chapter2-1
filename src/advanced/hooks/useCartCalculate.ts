import { useState, useCallback, useEffect } from 'react';
import { Item, CartItem } from '../types';

export const useCartCalculate = (cartItems: CartItem[], items: Item[]) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);

  const calculateCart = useCallback(() => {
    let total = 0;
    let count = 0;
    let subtotal = 0;

    cartItems.forEach((item) => {
      const _item = items.find((i) => i.id === item.itemId);
      if (!_item) return;

      const quantity = item.quantity;
      const itemTotal = _item.value * quantity;
      let discount = 0;

      count += quantity;
      subtotal += itemTotal;

      if (quantity >= 10) {
        switch (_item.id) {
          case 'p1':
            discount = 0.1;
            break;
          case 'p2':
            discount = 0.15;
            break;
          case 'p3':
            discount = 0.2;
            break;
          case 'p4':
            discount = 0.05;
            break;
          case 'p5':
            discount = 0.25;
            break;
        }
      }

      total += itemTotal * (1 - discount);
    });

    let newDiscountRate = 0;

    if (count >= 30) {
      const bigDiscount = total * 0.25;
      const itemDiscount = subtotal - total;

      if (bigDiscount > itemDiscount) {
        total = subtotal * (1 - 0.25);
        newDiscountRate = 0.25;
      } else {
        newDiscountRate = (subtotal - total) / subtotal;
      }
    } else {
      newDiscountRate = subtotal > 0 ? (subtotal - total) / subtotal : 0;
    }

    // 화요일 할인
    if (new Date().getDay() === 2) {
      total *= 1 - 0.1;
      newDiscountRate = Math.max(newDiscountRate, 0.1);
    }

    setTotalPrice(Math.round(total));
    setItemCount(count);
    setDiscountRate(newDiscountRate);
    setPoints(Math.floor(total / 1000));
  }, [cartItems, items]);

  useEffect(() => {
    calculateCart();
  }, [cartItems, items, calculateCart]);

  return {
    totalPrice,
    itemCount,
    discountRate,
    points,
  };
};
