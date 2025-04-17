import { initialItemList } from '../data/initialItemList.js';
import { ItemListType } from '../types/ItemType.js';

export const ACTION_TYPE = {
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  SET_LAST_ITEM: 'SET_LAST_ITEM',
  INCREASE_CART_ITEM: 'INCREASE_CART_ITEM',
  DECREASE_CART_ITEM: 'DECREASE_CART_ITEM',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
} as const;

interface ItemState {
  itemList: ItemListType;
  cartItemList: ItemListType;
  lastSelectedItem: string | null;
}

type ItemActionType =
  | {
      type: typeof ACTION_TYPE.UPDATE_QUANTITY;
      payload: {
        itemId: string;
        quantityDiff: number;
      };
    }
  | {
      type: typeof ACTION_TYPE.SET_LAST_ITEM;
      payload: { itemId: string | null };
    }
  | {
      type: typeof ACTION_TYPE.INCREASE_CART_ITEM;
      payload: { itemId: string };
    }
  | {
      type: typeof ACTION_TYPE.DECREASE_CART_ITEM;
      payload: { itemId: string };
    }
  | {
      type: typeof ACTION_TYPE.REMOVE_CART_ITEM;
      payload: { itemId: string };
    };

// 상품 상태 관련 Reducer
export default function itemReducer(state: ItemState, action: ItemActionType) {
  if (action.type === ACTION_TYPE.UPDATE_QUANTITY) {
    return {
      ...state,
      itemList: state.itemList.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, quantity: item.quantity + action.payload.quantityDiff }
          : item,
      ),
    };
  }
  if (action.type === ACTION_TYPE.SET_LAST_ITEM) {
    return {
      ...state,
      lastSelectedItem: action.payload.itemId,
    };
  }

  // TO-DO: 장바구니에 담긴 상품 관련 Reducer 분리하기
  if (action.type === ACTION_TYPE.INCREASE_CART_ITEM) {
    return {
      ...state,
      cartItemList: state.cartItemList.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    };
  }
  if (action.type === ACTION_TYPE.DECREASE_CART_ITEM) {
    return {
      ...state,
      cartItemList: state.cartItemList.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    };
  }
  if (action.type === ACTION_TYPE.REMOVE_CART_ITEM) {
    return {
      ...state,
      cartItemList: state.cartItemList.filter(
        (item) => item.id !== action.payload.itemId,
      ),
      itemList: state.itemList.map((item) =>
        item.id === action.payload.itemId
          ? {
              ...item,
              quantity:
                initialItemList.find((it) => it.id === item.id)?.quantity || 0,
            }
          : item,
      ),
    };
  }
  return state;
}
