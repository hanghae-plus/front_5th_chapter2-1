import { createObserver } from "./createObserver";

/**
 * 상태 저장소를 생성합니다.
 * 상태를 관리하고 변경 시 구독자에게 알립니다.
 *
 * @param {Object} initialState - 초기 상태 객체
 * @returns {Object} 상태 저장소 객체
 */
export const createStore = (initialState = {}) => {
  const { subscribe, notify } = createObserver();

  /** @type {Object} 현재 상태를 저장하는 객체 */
  let state = { ...initialState };

  /**
   * 현재 상태의 복사본을 반환합니다.
   *
   * @returns {Object} 현재 상태의 복사본
   */
  const getState = () => ({ ...state });

  /**
   * 상태를 업데이트하고 구독자에게 알립니다.
   *
   * @param {Object} newState - 새로운 상태 객체
   */
  const setState = (newState) => {
    state = { ...state, ...newState };
    notify(state);
  };

  return {
    getState,
    setState,
    subscribe,
  };
};
