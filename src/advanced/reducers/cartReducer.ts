import { CartState, CartAction, CartItem } from '../types/cart';
import {
  calculateProductDiscount,
  calculateCartDiscount,
  calculateTuesdayDiscount,
} from '../utils/calculateDiscount';

const calculateTotal = (items: CartItem[]) => {
  let totalPrice = 0;
  let totalProductCount = 0;
  let totalPriceBeforeDiscount = 0;

  items.forEach((item) => {
    totalProductCount += item.quantity;

    const productTotalPrice = item.price * item.quantity;

    totalPriceBeforeDiscount += productTotalPrice;
    totalPrice += calculateProductDiscount(item, item.quantity);
  });

  let totalCartDiscountRate = calculateCartDiscount(
    totalPrice,
    totalPriceBeforeDiscount,
    totalProductCount,
  );

  const tuesdayDiscount = calculateTuesdayDiscount(totalPrice, totalCartDiscountRate);

  return {
    totalPrice: tuesdayDiscount.price,
    discountRate: tuesdayDiscount.discountRate,
    bonusPoints: Math.floor(tuesdayDiscount.price / 1000),
  };
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      const newItems = existingItem
        ? state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      const { totalPrice, discountRate, bonusPoints } = calculateTotal(newItems);

      return { ...state, items: newItems, totalPrice, discountRate, bonusPoints };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      const { totalPrice, discountRate, bonusPoints } = calculateTotal(newItems);

      return { ...state, items: newItems, totalPrice, discountRate, bonusPoints };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items
        .map((item) => {
          if (item.id === action.payload.id) {
            const newQuantity = item.quantity + action.payload.change;

            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }

          return item;
        })
        .filter(Boolean) as CartItem[];

      const { totalPrice, discountRate, bonusPoints } = calculateTotal(newItems);

      return { ...state, items: newItems, totalPrice, discountRate, bonusPoints };
    }

    default:
      return state;
  }
};
