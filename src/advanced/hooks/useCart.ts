import { useMemo } from 'react';
import { Product, CartItem } from '../types/product';

// 모든 계산 유틸리티 함수는 이쪽에 따로 분리
import {
    calculateItemTotal,
    applyDiscount,
    calculateDiscountRate,
    applyWeeklyDiscount,
} from '../utils/cart';

export const useCart = (cartItems: CartItem[]) => {
    return useMemo(() => {
        let itemCount = 0;
        let totalAmount = 0;
        let subTotal = 0;

        cartItems.forEach(item => {
            const quantity = item.quantity ?? 1;
            const itemTotal = calculateItemTotal(item, quantity);
            const discount = applyDiscount(item, quantity);

            itemCount += quantity;
            subTotal += itemTotal;
            totalAmount += itemTotal * (1 - discount);
        });

        let bulkDiscountRate = 0;
        let bulkDiscountedTotal = totalAmount;

        if (itemCount > 0 && subTotal > 0) {
            const result = calculateDiscountRate(itemCount, totalAmount, subTotal);
            bulkDiscountRate = result.totalDiscount;
            bulkDiscountedTotal = result.totalAmount;
        }

        const { discountedTotal, totalDiscount: finalDiscountRate } =
            applyWeeklyDiscount(bulkDiscountedTotal, bulkDiscountRate);

        const totalPoints = Math.floor(discountedTotal / 1000);

        return {
            totalAmount: Math.round(discountedTotal),
            totalDiscount: finalDiscountRate ?? 0,
            totalPoints,
            itemCount,
        };
    }, [cartItems]);
};
