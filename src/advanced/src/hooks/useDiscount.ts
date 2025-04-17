import { CartItemType } from '../types';

export const useDiscount = () => {
    const calculateTotal = (cartItems: CartItemType[]) => {
        let subTotal = 0;
        let total = 0;
        let itemCount = 0;

        cartItems.forEach((item) => {
            const itemTotal = item.product.price * item.quantity;
            let discount = 0;
            itemCount += item.quantity;
            subTotal += itemTotal;

            if (item.quantity >= 10) {
                discount = item.product.discountRate;
            }
            total += itemTotal * (1 - discount);
        });

        let discountRate = 0;
        if (itemCount >= 30) {
            const bulkDiscount = total * 0.25;
            const itemDiscount = subTotal - total;
            if (bulkDiscount > itemDiscount) {
                total = subTotal * (1 - 0.25);
                discountRate = 0.25;
            } else {
                discountRate = (subTotal - total) / subTotal;
            }
        } else {
            discountRate = (subTotal - total) / subTotal;
        }

        if (new Date().getDay() === 2) {
            total *= 1 - 0.1;
            discountRate = Math.max(discountRate, 0.1);
        }

        return { total, discountRate };
    };

    return { calculateTotal };
};
