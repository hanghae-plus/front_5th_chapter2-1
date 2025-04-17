import { DISCOUNT_RATES } from "../constants/constants";
import { Product } from "../types/product";

export const calculateItemTotal = (product: Product, quantity: number) => {
    return product.price * quantity;
};

export const applyDiscount = (product: Product, quantity: number) => {
    return quantity >= 10 ? (DISCOUNT_RATES[product.id] || 0) : 0;
};

export const calculateDiscountRate = (itemCount: number, totalAmount: number, subTotal: number) => {
    const BULK_DISCOUNT_THRESHOLD = 30;
    const BULK_DISCOUNT_RATE = 0.25;

    if (itemCount >= BULK_DISCOUNT_THRESHOLD) {
        const bulkDiscount = subTotal * BULK_DISCOUNT_RATE;
        const itemDiscount = subTotal - totalAmount;

        return bulkDiscount > itemDiscount
            ? { totalDiscount: BULK_DISCOUNT_RATE, totalAmount: subTotal * (1 - BULK_DISCOUNT_RATE) }
            : { totalDiscount: itemDiscount / subTotal, totalAmount };
    }

    return { totalDiscount: (subTotal - totalAmount) / subTotal, totalAmount };
};

export const applyWeeklyDiscount = (totalAmount: number, totalDiscount: number) => {
    const WEEKLY_DISCOUNT_DAY = 2; // Tuesday
    if (new Date().getDay() === WEEKLY_DISCOUNT_DAY) {
        const discountedTotal = totalAmount * 0.9;
        return {
            discountedTotal,
            totalDiscount: Math.max(totalDiscount, 0.1),
        };
    }
    return { discountedTotal: totalAmount, totalDiscount };
};
