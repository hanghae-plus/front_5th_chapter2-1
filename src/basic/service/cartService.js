// 개별 상품 할인
function getItemDiscount(orderCount, currentCartItem) {
    let discount = 0;
    const DISCOUNBT_RATES = {
        p1: 0.1,
        p2: 0.15,
        p3: 0.2,
        p4: 0.05,
        p5: 0.25,
    };

    if (orderCount > 10) {
        discount = DISCOUNBT_RATES[currentCartItem.id] || 0;
    }

    return discount;
}

// 대량 구매 할인
function applyBulkDiscount(productCount, subTotalBeforeDiscount, totalAmount) {
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
                (subTotalBeforeDiscount - totalAmount) / subTotalBeforeDiscount;
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
}

// 요일 할인
function applyWeekdayDiscount(totalAmount, discountRate) {
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
}

// 가격 책정
function calculateTotalAmount(cartItems, productList) {
    let totalAmount = 0;
    let productCount = 0;
    let subTotalBeforeDiscount = 0;

    // 상품별 가격 계산 로직
    for (let i = 0; i < cartItems.length; i++) {
        (function () {
            const currentItem = cartItems[i];
            const currentCartItem = productList.find(
                (product) => product.id === currentItem.id
            );

            const orderCount = parseInt(
                currentItem.querySelector("span").textContent.split("x ")[1]
            );

            const itemPriceTotal = currentCartItem.val * orderCount; // 상품가격 * 개수
            const discount = getItemDiscount(orderCount, currentCartItem);
            productCount += orderCount; // 총 상품 갯수
            subTotalBeforeDiscount += itemPriceTotal; // 할인 전 전체 금액

            totalAmount += itemPriceTotal * (1 - discount); // 할인 적용 된 후의 전체 금액
            console.log("orderCount(현재 선택한 주문수량): ", orderCount);
            console.log("itemPriceTotal(상품가격 * 개수): ", itemPriceTotal);
            console.log("productCount(총 상품 갯수): ", productCount);
            console.log(
                "subTotalBeforeDiscount(할인 전 총 상품 가격): ",
                subTotalBeforeDiscount
            );
            console.log("totalAmount(총 상품 가격): ", totalAmount);
        })();
    }

    return {
        totalAmount,
        productCount,
        subTotalBeforeDiscount,
    };
}
// 카트 계산 함수
export function calculateCart(cartItems, productList) {
    // 개별 상품 계산
    let { totalAmount, productCount, subTotalBeforeDiscount } =
        calculateTotalAmount(cartItems, productList);

    // 대량 구매 시 할인이 가능한 조건
    // 대량 구매조건은 분리
    const { totalAfterBulkDiscount, bulkDIscountRate } = applyBulkDiscount(
        productCount,
        subTotalBeforeDiscount,
        totalAmount
    );

    // 0: 일요일, 1: 월요일, 2: 화요일 ... 6:토요일..
    // 화요일이면 할인 적용
    const { finalAmount, finalDiscountRate } = applyWeekdayDiscount(
        totalAfterBulkDiscount,
        bulkDIscountRate
    );

    return {
        totalAmount: finalAmount,
        discountRate: finalDiscountRate,
    };
}
