import { cartTotal, stockQuantityStatus } from '../components';
import { getBulkDiscountRate, getSpecialDiscountRate } from './discountUtils';
import { cartStore } from '../store';

export function updateCart() {
  cartStore.resetCartState();

  cartTotal.calculateCartTotal();

  getBulkDiscountRate();
  getSpecialDiscountRate();

  cartTotal.updateCartTotal();

  if (cartStore.getDiscountRate() > 0) {
    cartTotal.updateCartDiscount();
  }

  stockQuantityStatus.updateStockStatus();

  cartTotal.updateCartPoint();
}
