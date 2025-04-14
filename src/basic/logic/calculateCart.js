import { CartStore } from '../store';
import { CartItemsContainerDOM } from '../ui';
import { getDiscountRate } from './getDiscountRate';
import { calculateCartTotals } from './calculateCartTotal';
import {
  updateStockStatus,
  renderBonusPoints,
  renderCartTotal,
} from '../render';

export const calculateCart = () => {
  const cartItems = [...CartItemsContainerDOM.get().children];
  const { itemCount, subTotal, totalAmount } = calculateCartTotals(cartItems);

  CartStore.set('itemCount', itemCount);
  CartStore.set('subTotal', subTotal);
  CartStore.set('totalAmount', totalAmount);

  const discountRate = getDiscountRate(subTotal);
  renderCartTotal(totalAmount, discountRate);

  updateStockStatus();
  renderBonusPoints();
};
