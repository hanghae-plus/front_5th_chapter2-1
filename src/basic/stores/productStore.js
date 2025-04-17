import { createStore } from '../@lib/createStore';

/**
 * @typedef {Object} Product
 * @property {string} id - 상품 ID
 * @property {string} name - 상품 이름
 * @property {number} price - 상품 가격
 * @property {number} stock - 상품 재고
 * @property {number} bulkDiscountRate - 상품 할인율 (0~1)
 **/

const initialState = {
  /**  @type {Product[]} **/
  products: [
    { id: 'p1', name: '상품1', price: 10000, stock: 50, bulkDiscountRate: 0.1 },
    { id: 'p2', name: '상품2', price: 20000, stock: 30, bulkDiscountRate: 0.15 },
    { id: 'p3', name: '상품3', price: 30000, stock: 20, bulkDiscountRate: 0.2 },
    { id: 'p4', name: '상품4', price: 15000, stock: 0, bulkDiscountRate: 0.05 },
    { id: 'p5', name: '상품5', price: 25000, stock: 10, bulkDiscountRate: 0.25 },
  ],
  /**  @type {string | null} **/
  lastSelectedProductId: null,
};

export const productStore = createStore(initialState, {
  updateProduct: (state, updatedProduct) => ({
    ...state,
    products: state.products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
  }),
  decreaseStock: (state, productId) => ({
    ...state,
    products: state.products.map((product) =>
      product.id === productId ? { ...product, stock: product.stock - 1 } : product,
    ),
  }),
  increaseStock: (state, productId, increaseCount = 1) => ({
    ...state,
    products: state.products.map((product) =>
      product.id === productId ? { ...product, stock: product.stock + increaseCount } : product,
    ),
  }),
  setLastSelectedProductId: (state, lastSelectedProductId) => ({
    ...state,
    lastSelectedProductId,
  }),
});
