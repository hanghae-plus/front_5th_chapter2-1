import {
  calculateBulkDiscount,
  calculateDiscountForTuesday,
  calculateRegularDiscount,
  isTuesday,
} from "../lib/utils/discountUtils";

const BULK_DISCOUNT_THRESHOLD = 30;

class DiscountService {
  constructor() {
    this._discRate = 0;
  }

  get discountRate() {
    return this._discRate;
  }

  set discountRate(newRate) {
    this._discRate = newRate;
  }

  applyDiscount(itemCount, discountedTotal, originalSubtotal) {
    if (isTuesday()) {
      const result = calculateDiscountForTuesday(discountedTotal);
      this.discountRate = result.discountRate;
      return result.discountedPrice;
    }

    if (itemCount < BULK_DISCOUNT_THRESHOLD) {
      const result = calculateRegularDiscount(
        discountedTotal,
        originalSubtotal,
      );
      this.discountRate = result.discountRate;
      return result.discountedPrice;
    }

    const result = calculateBulkDiscount(discountedTotal, originalSubtotal);
    this.discountRate = result.discountRate;
    return result.discountedPrice;
  }
}

export const discountService = new DiscountService();
