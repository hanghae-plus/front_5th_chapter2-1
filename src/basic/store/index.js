import { initialProducts } from '../constants/index.js';

const listeners = {};

export const state = {
  lastSelected: null,
  products: JSON.parse(JSON.stringify(initialProducts)), // 깊은 복사 수행
  totalAmount: 0,
  discountRate: 0,
  cartCount: 0,
  cartList: [],

  /**
   * 상태 설정
   * @param {string} key 상태 키
   * @param {any} value 상태 값
   */
  set(key, value) {
    this[key] = value;
    if (listeners[key]) {
      listeners[key].forEach((callback) => callback(value));
    }
  },

  /**
   * 상태 구독
   * @param {string} key 상태 키
   * @param {Function} callback 구독 콜백
   */
  subscribe(key, callback) {
    if (!listeners[key]) {
      listeners[key] = [];
    }
    listeners[key].push(callback);
  },
};
