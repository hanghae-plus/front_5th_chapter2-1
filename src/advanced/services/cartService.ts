// import CartItem from '../components/CartItem';
import { Product, CartItem, CartCalculation } from "./../types/index";

export const cartService = {
    calculateCart(
        cartItems: CartItem[],
        productList: Product[]
    ): CartCalculation {
        // console.log("calculateCart: ????");

        const { totalAmount, productCount, subTotalBeforeDiscount } =
            this.calculateTotalAmount(cartItems, productList);

        // console.log("totalAmount: ", totalAmount);
        // console.log("productCount: ", productCount);
        // console.log("subTotalBeforeDiscount: ", subTotalBeforeDiscount);

        // 대량 구매 시 할인이 가능한 조건
        // 대량 구매조건은 분리
        const { totalAfterBulkDiscount, bulkDIscountRate } =
            this.applyBulkDiscount(
                productCount,
                subTotalBeforeDiscount,
                totalAmount
            );

        // 0: 일요일, 1: 월요일, 2: 화요일 ... 6:토요일..
        // 화요일이면 할인 적용
        const { finalAmount, finalDiscountRate } = this.applyWeekdayDiscount(
            totalAfterBulkDiscount,
            bulkDIscountRate
        );

        // 포인트 계산 (1%)
        const points = Math.floor(finalAmount / 1000); //Math.round(totalAmount * 0.01);

        return {
            totalAmount: finalAmount,
            discountRate: finalDiscountRate,
            hasDiscount: finalDiscountRate > 0, // 할인율이 0보다 크면 true
            discountPercentage: finalDiscountRate * 100, // 퍼센트로 변환
            points,
        };
    },

    // 요일 할인
    applyWeekdayDiscount(totalAmount: number, discountRate: number) {
        let finalAmount = totalAmount;
        let finalDiscountRate = discountRate;

        const today = new Date().getDay();
        if (today === 2) {
            finalAmount = totalAmount * 0.9;
            finalDiscountRate = Math.max(discountRate, 0.1);
        }
        return {
            finalAmount,
            finalDiscountRate,
        };
    },

    // 가격 책정
    calculateTotalAmount(cartItems: CartItem[], productList: Product[]) {
        let totalAmount = 0;
        let productCount = 0;
        let subTotalBeforeDiscount = 0;

        cartItems.forEach((item) => {
            const orderCount = item.quantity;
            const itemPriceTotal = item.product.val * orderCount;
            const discount = this.getItemDiscount(orderCount, item.product.id);

            productCount += orderCount;
            subTotalBeforeDiscount += itemPriceTotal;
            totalAmount += itemPriceTotal * (1 - discount);
        });

        return {
            totalAmount,
            productCount,
            subTotalBeforeDiscount,
        };
    },

    getItemDiscount(orderCount: number, productId: string): number {
        let discount = 0;
        const DISCOUNT_RATES: Record<string, number> = {
            p1: 0.1,
            p2: 0.15,
            p3: 0.2,
            p4: 0.05,
            p5: 0.25,
        };

        if (orderCount > 10) {
            discount = DISCOUNT_RATES[productId] || 0;
        }

        return discount;
    },

    applyBulkDiscount(
        productCount: number,
        subTotalBeforeDiscount: number,
        totalAmount: number
    ) {
        let discountRate = 0;
        if (productCount >= 30) {
            const bulkDisc = totalAmount * 0.25;
            const itemDisc = subTotalBeforeDiscount - totalAmount;
            // 대량할인이 개별할인보다 큰 경우 25할인으로 갈아끼움
            if (bulkDisc > itemDisc) {
                totalAmount = subTotalBeforeDiscount * (1 - 0.25);
                discountRate = 0.25;
            } else {
                discountRate =
                    (subTotalBeforeDiscount - totalAmount) /
                    subTotalBeforeDiscount;
            }
            // 30개 미만이면 그냥 개발 할인만 적용
        } else {
            discountRate =
                (subTotalBeforeDiscount - totalAmount) / subTotalBeforeDiscount;
        }

        return {
            totalAfterBulkDiscount: totalAmount,
            bulkDIscountRate: discountRate,
        };
    },
};

export default cartService;
