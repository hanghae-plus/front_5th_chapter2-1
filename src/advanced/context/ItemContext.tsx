import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useEffect,
  PropsWithChildren,
} from 'react';
import { initialItemList } from '../data/initialItemList.js';
import { ItemListType, ItemType } from '../types/ItemType.js';
import itemReducer, { ACTION_TYPE, ItemState } from './itemReducer.js';
import {
  DISCOUNT_RATES,
  BUNGAE_SALE,
  SUGGEST_SALE,
} from '../constants/index.js';
import { textUtils } from '../utils/textUtils.js';

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
  // 세일
  updateItemPrice: (itemId: string, price: number) => void;
  bungaeSale: () => void;
  suggestSale: () => void;
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

  // 상품 가격 업데이트 (추천 세일 시)
  const updateItemPrice = useCallback((itemId: string, price: number) => {
    dispatch({
      type: ACTION_TYPE.UPDATE_PRICE,
      payload: { itemId, price },
    });
  }, []);

  // 번개 세일 실행
  const bungaeSale = useCallback(() => {
    const saleItem =
      state.itemList[Math.floor(Math.random() * state.itemList.length)];
    const isOnSale =
      Math.random() < DISCOUNT_RATES.RANDOM && saleItem.quantity > 0;
    if (isOnSale) {
      alert(textUtils.getBungaeSaleText(saleItem.name));

      const updatedPrice = Math.round(saleItem.price * BUNGAE_SALE.RATE);

      dispatch({
        type: ACTION_TYPE.BUNGAE_SALE,
        payload: { itemId: saleItem.id, price: updatedPrice },
      });
    }
  }, [state.itemList]);

  // 추천 세일 실행
  const suggestSale = useCallback(() => {
    if (!state.lastSelectedItem) return;

    const suggestItem = state.itemList.find(
      (item) => item.id !== state.lastSelectedItem && item.quantity > 0,
    );

    if (suggestItem) {
      const updatedPrice = Math.round(suggestItem.price * SUGGEST_SALE.RATE);
      alert(textUtils.getSuggestSaleText(suggestItem.name));
      dispatch({
        type: ACTION_TYPE.SUGGEST_SALE,
        payload: { itemId: suggestItem.id, price: updatedPrice },
      });

      dispatch({
        type: ACTION_TYPE.SET_LAST_ITEM,
        payload: { itemId: suggestItem.id },
      });
    }
  }, [state.lastSelectedItem, state.itemList]);

  // 번개 세일, 추천 세일 실행
  useEffect(() => {
    const bungaeDelay = Math.random() * BUNGAE_SALE.DELAY;
    const suggestDelay = Math.random() * SUGGEST_SALE.DELAY;

    const bungaeTimeout = setTimeout(() => {
      bungaeSale();
      const bungaeInterval = setInterval(bungaeSale, BUNGAE_SALE.INTERVAL);
      return () => clearInterval(bungaeInterval);
    }, bungaeDelay);

    const suggestTimeout = setTimeout(() => {
      suggestSale();
      const suggestInterval = setInterval(suggestSale, SUGGEST_SALE.INTERVAL);
      return () => clearInterval(suggestInterval);
    }, suggestDelay);

    return () => {
      clearTimeout(bungaeTimeout);
      clearTimeout(suggestTimeout);
    };
  }, [bungaeSale, suggestSale]);

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
    // TO-DO: 세일 context 분리하기
    updateItemPrice,
    bungaeSale,
    suggestSale,
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
