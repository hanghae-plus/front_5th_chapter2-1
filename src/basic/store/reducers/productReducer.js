import { INITIALIZE_PRODUCTS, UPDATE_PRODUCT_STOCK } from "../actions/types.js";

// 초기 상태
export const initialProductState = {
  products: [] // 상품 목록
};

/**
 * 상품 관련 리듀서
 * @param {Object} state - 현재 상태
 * @param {Object} action - 액션 객체
 * @returns {Object} 새 상태
 */
const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case INITIALIZE_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case UPDATE_PRODUCT_STOCK:
      const { productId, changeAmount } = action.payload;

      return {
        ...state,
        products: state.products.map((product) =>
          product.id === productId ? { ...product, quantity: product.quantity - changeAmount } : product
        )
      };

    default:
      return state;
  }
};

export default productReducer;
