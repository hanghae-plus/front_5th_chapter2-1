import { initialProducts } from '../constants/index.js';

const state = {
  lastSelected: null,
  products: JSON.parse(JSON.stringify(initialProducts)), // 깊은 복사 수행
  totalAmount: 0,
  cartItemCount: 0,
};

export { state };
