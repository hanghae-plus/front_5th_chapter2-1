import {
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  SET_LAST_SELECTED,
  UPDATE_CART_TOTALS
} from "../actions/types.js";

import {
  DISCOUNT_RATES,
  TUESDAY_DISCOUNT_RATE,
  BULK_DISCOUNT_RATE,
  BULK_DISCOUNT_THRESHOLD,
  LOYALTY_POINTS_RATIO
} from "../../constant/index.js";

// 초기 상태
export const initialCartState = {
  cartItems: [], // 장바구니 아이템 목록
  lastSelectedProduct: null, // 마지막으로 선택한 상품
  totalAmount: 0, // 총 금액
  itemCount: 0, // 아이템 총 개수
  discountRate: 0, // 할인율
  bonusPoints: 0 // 보너스 포인트
};

/**
 * 장바구니 관련 리듀서
 * @param {Object} state - 현재 상태
 * @param {Object} action - 액션 객체
 * @returns {Object} 새 상태
 */
const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existingCartItemIndex = state.cartItems.findIndex((item) => item.productId === product.id);

      let updatedCartItems;

      if (existingCartItemIndex >= 0) {
        // 기존 아이템 수량 증가
        updatedCartItems = state.cartItems.map((item, index) =>
          index === existingCartItemIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // 새 아이템 추가
        updatedCartItems = [
          ...state.cartItems,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity
          }
        ];
      }

      return {
        ...state,
        cartItems: updatedCartItems
      };
    }

    case UPDATE_CART_ITEM: {
      const { productId, quantity } = action.payload;

      // 수량이 0 이하면 아이템 제거
      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.productId !== productId)
        };
      }

      // 수량 업데이트
      return {
        ...state,
        cartItems: state.cartItems.map((item) => (item.productId === productId ? { ...item, quantity } : item))
      };
    }

    case REMOVE_FROM_CART: {
      const { productId } = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.productId !== productId)
      };
    }

    case SET_LAST_SELECTED: {
      return {
        ...state,
        lastSelectedProduct: action.payload.productId
      };
    }

    case UPDATE_CART_TOTALS: {
      const { products } = action.payload;
      let totalAmount = 0;
      let itemCount = 0;
      let subTotal = 0;

      // 각 장바구니 아이템의 금액 계산
      state.cartItems.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return;

        const cartItemTotal = item.price * item.quantity;
        let discount = 0;

        itemCount += item.quantity;
        subTotal += cartItemTotal;

        // 수량 할인 계산
        if (item.quantity >= 10) {
          discount = DISCOUNT_RATES[item.productId] || 0;
        }

        totalAmount += cartItemTotal * (1 - discount);
      });

      // 추가 할인 계산
      let discountRate = 0;
      if (itemCount >= BULK_DISCOUNT_THRESHOLD) {
        const bulkDiscount = totalAmount * BULK_DISCOUNT_RATE;
        const itemDiscount = subTotal - totalAmount;

        if (bulkDiscount > itemDiscount) {
          totalAmount = subTotal * (1 - BULK_DISCOUNT_RATE);
          discountRate = BULK_DISCOUNT_RATE;
        } else {
          discountRate = (subTotal - totalAmount) / subTotal || 0;
        }
      } else {
        discountRate = (subTotal - totalAmount) / subTotal || 0;
      }

      // 화요일 할인 적용
      if (new Date().getDay() === 2) {
        totalAmount *= 1 - TUESDAY_DISCOUNT_RATE;
        discountRate = Math.max(discountRate, TUESDAY_DISCOUNT_RATE);
      }

      // 포인트 계산
      const bonusPoints = Math.floor(totalAmount / LOYALTY_POINTS_RATIO);

      return {
        ...state,
        totalAmount,
        discountRate,
        bonusPoints,
        itemCount
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
