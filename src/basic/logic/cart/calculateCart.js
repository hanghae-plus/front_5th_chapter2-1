import { CartStore } from '../../store';
import { CartItemsContainerDOM } from '../../ui';
import { getDiscountRate } from '../discount';
import { calculateCartAmounts } from './calculateCartAmounts';
import {
  updateStockStatus,
  renderBonusPoints,
  renderCartTotal,
} from '../../render';

export const calculateCart = () => {
  const cartItems = [...CartItemsContainerDOM.get().children];
  const { itemCount, subTotal, totalAmount } = calculateCartAmounts(cartItems);

  CartStore.set('itemCount', itemCount);
  CartStore.set('subTotal', subTotal);
  CartStore.set('totalAmount', totalAmount);

  const discountRate = getDiscountRate(itemCount, totalAmount, subTotal);
  renderCartTotal(totalAmount, discountRate);

  updateStockStatus();
  renderBonusPoints();
};
