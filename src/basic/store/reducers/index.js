import productReducer, { initialProductState } from "./productReducer.js";
import cartReducer, { initialCartState } from "./cartReducer.js";

// 초기 상태 조합
export const initialState = {
  ...initialProductState,
  ...initialCartState
};

/**
 * 루트 리듀서 - 모든 리듀서를 하나로 결합
 * @param {Object} state - 현재 상태
 * @param {Object} action - 액션 객체
 * @returns {Object} 새 상태
 */
const rootReducer = (state = initialState, action) => {
  // 각 리듀서에서 처리한 결과 결합
  const productState = productReducer(
    {
      products: state.products
    },
    action
  );

  const cartState = cartReducer(
    {
      cartItems: state.cartItems,
      lastSelectedProduct: state.lastSelectedProduct,
      totalAmount: state.totalAmount,
      itemCount: state.itemCount,
      discountRate: state.discountRate,
      bonusPoints: state.bonusPoints
    },
    action
  );

  // 결합된 새 상태 반환
  return {
    ...productState,
    ...cartState
  };
};

export default rootReducer;
