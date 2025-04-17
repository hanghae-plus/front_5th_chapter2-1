const PRODUCTS = [
    { id: 'p1', name: '상품1', price: 10000, stock: 50 },
    { id: 'p2', name: '상품2', price: 20000, stock: 30 },
    { id: 'p3', name: '상품3', price: 30000, stock: 20 },
    { id: 'p4', name: '상품4', price: 15000, stock: 0 },
    { id: 'p5', name: '상품5', price: 25000, stock: 10 },
];

const DISCOUNTS = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.25,
    p5: 0.3
}



const OUT_OF_STOCKS = '재고가 부족합니다.';
const AMOUNT_OF_STOCKS = 'x ';

export { PRODUCTS, DISCOUNTS, OUT_OF_STOCKS, AMOUNT_OF_STOCKS };