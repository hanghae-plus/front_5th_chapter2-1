/**
 * @typedef {Object} Product
 * @property {string} id - 상품 ID
 * @property {string} name - 상품명
 * @property {number} price - 가격
 * @property {number} quantity - 재고
 * @property {number} discount -  할인율
 */

/** @type {Product[]} */
export const PRODUCT_LIST = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50, discount: 0.1 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30, discount: 0.15 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20, discount: 0.2 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0, discount: 0.05 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10, discount: 0.25 },
];
