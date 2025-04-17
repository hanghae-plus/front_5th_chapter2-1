import { initialProducts } from '../constants/index.js';

const state = {
  lastSelected: null,
  products: JSON.parse(JSON.stringify(initialProducts)), // 깊은 복사 수행
  totalAmount: 0,
  discountRate: 0,
  points: 0,
  cartCount: 0,
  cartList: [],
};

const listeners = {};

/**
 * 상태 조회
 * @returns {Object} 현재 상태 객체
 */
export const getState = () => {
  return { ...state };
};

/**
 * 상태 설정
 * @param {string} key 상태 키
 * @param {any} value 상태 값
 */
export const setState = (key, value) => {
  state[key] = value;
  if (listeners[key]) {
    listeners[key].forEach((callback) => callback(value));
  }
};

/**
 * 상태 구독
 * @param {string} key 상태 키
 * @param {Function} callback 구독 콜백
 * @returns {Function} 구독 취소 함수
 */
export const subscribe = (key, callback) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(callback);

  // 구독 취소 함수 반환
  return () => {
    if (listeners[key]) {
      const index = listeners[key].indexOf(callback);
      if (index !== -1) {
        listeners[key].splice(index, 1);
      }
    }
  };
};
