import { createStore } from "./createStore";

/**
 * 도메인 모델을 생성합니다.
 * 상태와 액션을 관리하는 단위입니다.
 *
 * @param {Object} initialState - 초기 상태 객체
 * @param {Object} actions - 액션 함수 객체
 * @returns {Object} 상태와 액션이 포함된 도메인 객체
 */
export const createDomain = (initialState = {}, actions = {}) => {
  const store = createStore(initialState);

  /** @type {Object} 바인딩된 액션 함수들을 저장하는 객체 */
  const boundActions = {};

  // 각 액션 함수를 스토어에 바인딩
  for (const [name, action] of Object.entries(actions)) {
    /**
     * 액션 실행 함수
     *
     * @param {...*} actionPayload - 액션에 전달할 매개변수들
     * @returns {*} 액션 실행 결과
     */
    boundActions[name] = (...payload) => {
      const result = action(store.getState(), ...payload);
      store.setState(result);

      return result;
    };
  }

  return {
    /**
     * 현재 상태를 반환하는 게터
     * @returns {Object} 현재 상태
     */
    get state() {
      return store.getState();
    },
    subscribe: store.subscribe,
    ...boundActions,
  };
};
