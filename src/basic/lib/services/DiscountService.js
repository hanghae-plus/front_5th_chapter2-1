import { BULK_DISCOUNT_THRESHOLD } from "../configs/discounts";
import {
  calculateBulkDiscount,
  calculateDiscountForTuesday,
  calculateRegularDiscount,
  isTuesday,
} from "../utils/discountUtils";

class DiscountService {
  constructor() {
    if (DiscountService.instance) return DiscountService.instance;
    DiscountService.instance = this;

    this.discountRate = 0;
  }

  applyDiscount(itemCount, discountedTotal, originalSubtotal) {
    if (isTuesday()) {
      const { discountedPrice, discountRate } =
        calculateDiscountForTuesday(discountedTotal);

      this.discountRate = discountRate;
      return discountedPrice;
    }

    const { discountedPrice, discountRate } =
      itemCount < BULK_DISCOUNT_THRESHOLD
        ? calculateRegularDiscount(discountedTotal, originalSubtotal)
        : calculateBulkDiscount(discountedTotal, originalSubtotal);

    this.discountRate = discountRate;
    return discountedPrice;
  }
}

export const discountService = new DiscountService();
