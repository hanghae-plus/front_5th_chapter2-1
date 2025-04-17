import { Product, CartItem } from '../types/product';

export const INITIAL_PRODUCTS: Product[] = [
    { id: 'p1', name: '상품1', price: 10000, stock: 50 },
    { id: 'p2', name: '상품2', price: 20000, stock: 30 },
    { id: 'p3', name: '상품3', price: 30000, stock: 20 },
    { id: 'p4', name: '상품4', price: 15000, stock: 0 },
    { id: 'p5', name: '상품5', price: 25000, stock: 10 },
];

export const DISCOUNT_RATES: Record<string, number> = {
    'p1': 0.1,
    'p2': 0.15,
    'p3': 0.2,
    'p4': 0.05,
    'p5': 0.25,
};

export const messages = {
    SALE_ALERT: (name: string) => `번개세일! ${name}이(가) 20% 할인 중입니다!`,
    SUGGESTION: (name: string) => `${name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`,
    OUT_OF_STOCK: '재고가 부족합니다.',
    ADD_SUCCESS: (name: string) => `${name}을(를) 장바구니에 담았습니다.`,
    POINTS: (pts: number | string) => `(포인트: ${pts})`,
    DISCOUNT: (rate: number) => `(${(rate * 100).toFixed(1)}% 할인 적용)`
};