export const messages = {
    SALE_ALERT: (name) => `번개세일! ${name}이(가) 20% 할인 중입니다!`,
    SUGGESTION: (name) => `${name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`,
    OUT_OF_STOCK: '재고가 부족합니다.',
    ADD_SUCCESS: (name) => `${name}을(를) 장바구니에 담았습니다.`,
    POINTS: (pts) => `(포인트: ${pts})`,
    DISCOUNT: (rate) => `(${(rate * 100).toFixed(1)}% 할인 적용)`
};