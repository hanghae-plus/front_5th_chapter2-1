import { TotalPrice } from '../stores';
import { calculateDiscountRate, updateCartUI } from './utils/updateCartUtil';
import updateStockState from './updateStockState';
import updatePoint from './updatePoint';

/**장바구니 업데이트 */
const updateCart = () => {
  let totalPrice = new TotalPrice();

  const discountRate = calculateDiscountRate(totalPrice);
  updateCartUI(totalPrice, discountRate);

  updateStockState();
  updatePoint(totalPrice);
};

export default updateCart;
