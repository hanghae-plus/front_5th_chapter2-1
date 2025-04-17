import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  PropsWithChildren,
} from 'react';
import { initialItemList } from '../data/initialItemList.js';
import { ItemListType, ItemType } from '../types/ItemType.js';
import itemReducer, { ACTION_TYPE } from './itemReducer.js';

const initialState = {
  itemList: initialItemList,
  lastSelectedItem: null,
} as const;

interface ItemContextType {
  state: {
    itemList: ItemListType;
    lastSelectedItem: string | null;
  };
  findItem: (itemId: string) => ItemType | undefined;
  updateQuantity: (itemId: string, quantityDiff: number) => void;
  setLastSelectedItem: (itemId: string) => void;
}
const ItemContext = createContext<ItemContextType | null>(null);

// 상품 상태 관련 Context를 제공
export function ItemProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(itemReducer, initialState);

  // 상품 검색
  const findItem = useCallback(
    (itemId: string) => state.itemList.find((item) => item.id === itemId),
    [state.itemList],
  );

  // 상품 수량 업데이트
  const updateQuantity = useCallback((itemId: string, quantityDiff: number) => {
    dispatch({
      type: ACTION_TYPE.UPDATE_QUANTITY,
      payload: { itemId, quantityDiff },
    });
  }, []);

  // 마지막으로 선택한 상품 설정
  const setLastSelectedItem = useCallback((itemId: string | null) => {
    dispatch({ type: ACTION_TYPE.SET_LAST_ITEM, payload: { itemId } });
  }, []);

  const value: ItemContextType = {
    state,
    findItem,
    updateQuantity,
    setLastSelectedItem,
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
}

export function useItem(): ItemContextType {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItem must be used within an ItemProvider');
  }
  return context;
}
