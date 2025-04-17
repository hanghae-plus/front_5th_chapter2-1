import { renderCartTotal } from '../render';

/**
 * 장바구니 총 금액 계산 함수
 */
export const calculateCart = (products) => {
    // 할인 전 금액
    let subTotal = 0;
    // 총 금액
    let totalPrice = 0;
    // 총 개수 초기화
    let totalQuantity = 0;
    // 할인 초기화
    let discountRate = 0;

    // 장바구니 아이템 목록
    const $cartDisplay = document.getElementById('cart-items');
    const cartItems = $cartDisplay.children;

    // 장바구니 아이템 목록 반복
    for (let i = 0; i < cartItems.length; i++) {
        // 현재 아이템
        let currentItem;
        // 상품 목록 반복
        for (let j = 0; j < products.length; j++) {
            // 현재 아이템 찾기
            if (products[j].id === cartItems[i].id) {
                currentItem = products[j];
                break;
            }
        }
        // 현재 아이템 개수
        const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
        // 현재 아이템 총 금액
        const beforeDiscountPrice = currentItem.price * quantity;
        // 할인 초기화
        let discountRate = 0;
        // 총 개수 증가
        totalQuantity += quantity;
        // 총 금액 증가
        subTotal += beforeDiscountPrice;

        // 10개 이상 구매 시 할인 적용
        if (quantity >= 10) {
            if (currentItem.id === 'p1') discountRate = 0.1;
            else if (currentItem.id === 'p2') discountRate = 0.15;
            else if (currentItem.id === 'p3') discountRate = 0.2;
            else if (currentItem.id === 'p4') discountRate = 0.05;
            else if (currentItem.id === 'p5') discountRate = 0.25;
        }
        // 총 금액 계산
        totalPrice += beforeDiscountPrice * (1 - discountRate);
    }

    // 30개 이상 구매 시 할인 적용
    if (totalQuantity >= 30) {
        // 대량 할인 적용
        let bulkDiscount = totalPrice * 0.25;
        // 아이템 할인 적용
        let itemDiscount = subTotal - totalPrice;
        // 대량 할인 적용
        if (bulkDiscount > itemDiscount) {
            totalPrice = subTotal * (1 - 0.25);
            discountRate = 0.25;
        } else {
            // 아이템 할인 적용
            discountRate = (subTotal - totalPrice) / subTotal;
        }
    } else {
        discountRate = (subTotal - totalPrice) / subTotal;
    }
    // 깜짝 화요일 할인 적용
    if (new Date().getDay() === 2) {
        totalPrice *= 1 - 0.1;
        discountRate = Math.max(discountRate, 0.1);
    }

    renderCartTotal(totalPrice, discountRate, products);
};
