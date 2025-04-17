import { initialItemList } from '../data/initialItemList.js';
import { ItemListType, ItemType } from '../types/ItemType.js';

export const ACTION_TYPE = {
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  SET_LAST_ITEM: 'SET_LAST_ITEM',
  INCREASE_CART_ITEM: 'INCREASE_CART_ITEM',
  DECREASE_CART_ITEM: 'DECREASE_CART_ITEM',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
  // 세일
  UPDATE_PRICE: 'UPDATE_PRICE',
  BUNGAE_SALE: 'BUNGAE_SALE',
  SUGGEST_SALE: 'SUGGEST_SALE',
} as const;

export interface ItemState {
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
      payload: { itemId: string };
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
    }
  | {
      type: typeof ACTION_TYPE.UPDATE_PRICE;
      payload: { itemId: string; price: number };
    }
  | {
      type: typeof ACTION_TYPE.BUNGAE_SALE;
      payload: { itemId: string; price: number };
    }
  | {
      type: typeof ACTION_TYPE.SUGGEST_SALE;
      payload: { itemId: string; price: number };
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
      cartItemList: state.cartItemList.some(
        (item) => item.id === action.payload.itemId,
      )
        ? state.cartItemList.map((item) =>
            item.id === action.payload.itemId
              ? {
                  ...item,
                  quantity: item.quantity - action.payload.quantityDiff,
                }
              : item,
          )
        : [
            ...state.cartItemList,
            {
              ...state.itemList.find(
                (item) => item.id === action.payload.itemId,
              ),
              quantity: 1,
            } as ItemType,
          ],
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
      itemList: state.itemList.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
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
      itemList: state.itemList.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
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

  // TO-DO: 세일 관련 Reducer 분리하기
  if (action.type === ACTION_TYPE.UPDATE_PRICE) {
    return {
      ...state,
      itemList: state.itemList.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, price: action.payload.price }
          : item,
      ),
    };
  }
  if (
    action.type === ACTION_TYPE.BUNGAE_SALE ||
    action.type === ACTION_TYPE.SUGGEST_SALE
  ) {
    const { itemId, price } = action.payload;
    return {
      ...state,
      itemList: state.itemList.map((item) =>
        item.id === itemId ? { ...item, price } : item,
      ),
      cartItemList: state.cartItemList.map((item) =>
        item.id === itemId ? { ...item, price } : item,
      ),
    };
  }
  return state;
}
