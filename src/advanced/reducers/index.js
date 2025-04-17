import {
  DISCOUNT_RATES,
  TUESDAY_DISCOUNT_RATE,
  BULK_DISCOUNT_RATE,
  BULK_DISCOUNT_THRESHOLD,
  LOYALTY_POINTS_RATIO,
  INITIAL_PRODUCTS
} from "../constant/index.js";

import {
  INITIALIZE_PRODUCTS,
  UPDATE_PRODUCT_PRICE,
  UPDATE_PRODUCT_STOCK,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  SET_LAST_SELECTED,
  UPDATE_CART_TOTALS
} from "../actions/types.js";

// 초기 상태
export const initialState = {
  products: [],
  cartItems: [],
  lastSelectedProduct: null,
  totalAmount: 0,
  itemCount: 0,
  discountRate: 0,
  bonusPoints: 0
};

// 리듀서 함수
export const rootReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE_PRODUCTS:
      return {
        ...state,
        products: INITIAL_PRODUCTS
      };

    case UPDATE_PRODUCT_STOCK: {
      const { productId, changeAmount } = action.payload;
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === productId ? { ...product, quantity: product.quantity - changeAmount } : product
        )
      };
    }

    case ADD_TO_CART: {
      const { product, quantity } = action.payload;
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity
          }
        ]
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

    case UPDATE_PRODUCT_PRICE: {
      const { productId, newPrice } = action.payload;
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === productId ? { ...product, price: newPrice } : product
        )
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
      let totalAmount = 0;
      let itemCount = 0;
      let subTotal = 0;

      // 각 장바구니 아이템의 금액 계산
      state.cartItems.forEach((item) => {
        const product = state.products.find((p) => p.id === item.productId);
        if (!product) return;

        const itemTotal = item.price * item.quantity;
        let discount = 0;

        itemCount += item.quantity;
        subTotal += itemTotal;

        // 수량 할인 계산
        if (item.quantity >= 10) {
          discount = DISCOUNT_RATES[item.productId] || 0;
        }

        totalAmount += itemTotal * (1 - discount);
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
