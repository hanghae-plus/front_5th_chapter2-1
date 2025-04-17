import { ItemListType } from '../types/ItemType.js';

export const ACTION_TYPE = {
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  SET_LAST_ITEM: 'SET_LAST_ITEM',
} as const;

interface ItemState {
  itemList: ItemListType;
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
    };

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
  return state;
}
