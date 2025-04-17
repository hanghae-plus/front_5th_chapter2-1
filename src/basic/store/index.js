import { initialProducts } from '../constants/index.js';

const listeners = {};

export const state = {
  lastSelected: null,
  products: JSON.parse(JSON.stringify(initialProducts)), // 깊은 복사 수행
  totalAmount: 0,
  discountRate: 0,
  cartList: [],

  set(key, value) {
    this[key] = value;
    if (listeners[key]) {
      listeners[key].forEach((callback) => callback(value));
    }
  },

  subscribe(key, callback) {
    if (!listeners[key]) {
      listeners[key] = [];
    }
    listeners[key].push(callback);
  },
};

// state.subscribe('totalPrice', (newTotalPrice) => {
//   console.log(`Total price updated: ${newTotalPrice}`);
// });

// // 상태 변경
// state.set('totalPrice', 50000);
