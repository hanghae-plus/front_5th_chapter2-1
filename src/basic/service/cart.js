import MOCK_PRODUCT_LIST from '../mock/product';

/** 장바구니에 담긴 상품들의 계산 정보(totalPricce, totalItemCount, subTotalPrice)를 반환합니다. */
export const calculateCart = () => {
    const $cartContainer = document.getElementById('cart-items');

    let totalPrice = 0;
    let totalItemCount = 0;

    const cartItems = $cartContainer.children;
    let subTotalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
        (function () {
            let currentItem;
            for (let j = 0; j < MOCK_PRODUCT_LIST.length; j++) {
                if (MOCK_PRODUCT_LIST[j].id === cartItems[i].id) {
                    currentItem = MOCK_PRODUCT_LIST[j];
                    break;
                }
            }
            const itemQuantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
            const itemTotalPrice = currentItem.price * itemQuantity;
            let discount = 0;
            totalItemCount += itemQuantity;
            subTotalPrice += itemTotalPrice;
            if (itemQuantity >= 10) {
                if (currentItem.id === 'p1') {
                    discount = 0.1;
                } else if (currentItem.id === 'p2') {
                    discount = 0.15;
                } else if (currentItem.id === 'p3') {
                    discount = 0.2;
                } else if (currentItem.id === 'p4') {
                    discount = 0.05;
                } else if (currentItem.id === 'p5') {
                    discount = 0.25;
                }
            }
            totalPrice += itemTotalPrice * (1 - discount);
        })();
    }

    return { totalPrice, totalItemCount, subTotalPrice };
};

/** 장바구니의 상품들에 대한 총 할인율을 계산하여 반환합니다. */
export const calculateDiscountRate = (totalPrice, totalItemCount, subTotalPrice) => {
    let discountRate = 0;

    if (totalItemCount >= 30) {
        const bulkDiscount = totalPrice * 0.25;
        const itemDisccount = subTotalPrice - totalPrice;
        if (bulkDiscount > itemDisccount) {
            totalPrice = subTotalPrice * (1 - 0.25);
            discountRate = 0.25;
        } else {
            discountRate = (subTotalPrice - totalPrice) / subTotalPrice;
        }
    } else {
        discountRate = (subTotalPrice - totalPrice) / subTotalPrice;
    }
    if (new Date().getDay() === 2) {
        totalPrice *= 1 - 0.1;
        discountRate = Math.max(discountRate, 0.1);
    }

    return discountRate;
};