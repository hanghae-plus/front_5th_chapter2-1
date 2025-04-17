import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  PropsWithChildren,
} from 'react';
import { initialItemList } from '../data/initialItemList.js';
import { ItemListType, ItemType } from '../types/ItemType.js';
import itemReducer, { ACTION_TYPE, ItemState } from './itemReducer.js';

const initialState = {
  itemList: initialItemList,
  cartItemList: [] as ItemListType,
  lastSelectedItem: initialItemList[0].id,
} as const;

interface ItemContextType extends ItemState {
  findItem: (itemId: string) => ItemType | undefined;
  updateQuantity: (itemId: string, quantityDiff: number) => void;
  setLastSelectedItem: (itemId: string) => void;
  // 장바구니
  increaseCartItem: (itemId: string) => void;
  decreaseCartItem: (itemId: string) => void;
  removeCartItem: (itemId: string) => void;
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
  const setLastSelectedItem = useCallback((itemId: string) => {
    dispatch({ type: ACTION_TYPE.SET_LAST_ITEM, payload: { itemId } });
  }, []);

  // 장바구니 상품 수량 추가
  const increaseCartItem = useCallback((itemId: string) => {
    dispatch({
      type: ACTION_TYPE.INCREASE_CART_ITEM,
      payload: { itemId },
    });
  }, []);

  // 장바구니 상품 수량 감소
  const decreaseCartItem = useCallback((itemId: string) => {
    dispatch({
      type: ACTION_TYPE.DECREASE_CART_ITEM,
      payload: { itemId },
    });
  }, []);

  // 장바구니 상품 제거
  const removeCartItem = useCallback((itemId: string) => {
    dispatch({
      type: ACTION_TYPE.REMOVE_CART_ITEM,
      payload: { itemId },
    });
  }, []);

  const value: ItemContextType = {
    cartItemList: state.cartItemList,
    itemList: state.itemList,
    lastSelectedItem: state.lastSelectedItem,
    findItem,
    updateQuantity,
    setLastSelectedItem,
    // TO-DO: 장바구니에 담긴 상품 context 분리하기
    increaseCartItem,
    decreaseCartItem,
    removeCartItem,
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
