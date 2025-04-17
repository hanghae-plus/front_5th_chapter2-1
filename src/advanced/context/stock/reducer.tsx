import { Product, StockAction } from '../../config/types';

// Reducer 함수 정의
export const stockReducer = (
  state: Product[],
  action: StockAction,
): Product[] => {
  switch (action.type) {
    case 'INCREMENT':
      return state.map((product) =>
        product.id === action.id
          ? {
              ...product,
              cartQuantity: product.cartQuantity + 1,
              stockQuantity: product.stockQuantity - 1,
            }
          : product,
      );
    case 'DECREMENT':
      return state.map((product) =>
        product.id === action.id && product.cartQuantity > 0
          ? {
              ...product,
              cartQuantity: product.cartQuantity - 1,
              stockQuantity: product.stockQuantity + 1,
            }
          : product,
      );
    case 'REMOVE':
      return state.map((product) =>
        product.id === action.id
          ? {
              ...product,
              cartQuantity: 0,
              stockQuantity: product.stockQuantity + product.cartQuantity,
            }
          : product,
      );
    case 'APPLY_DISCOUNT':
      return state.map((product) =>
        product.id === action.id
          ? {
              ...product,
              price: Math.round(product.price * (1 - product.discountRate)),
            }
          : product,
      );

    default:
      return state;
  }
};
