/**
 * 옵저버 패턴을 구현한 옵저버 생성 함수입니다.
 * 데이터 변경을 감지하고 등록된 리스너들에게 알립니다.
 *
 * @returns {Object} 구독 및 알림 기능을 가진 옵저버 객체
 */
export const createObserver = () => {
  /** @type {Set<Function>} 등록된 리스너 함수들의 집합 */
  const listeners = new Set();

  /**
   * 리스너를 구독 목록에 추가합니다.
   *
   * @param {Function} listener - 데이터 변경 시 호출될 콜백 함수
   * @returns {Function} 구독 취소 함수
   */
  const subscribe = (listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  /**
   * 모든 구독자에게 데이터 변경을 알립니다.
   *
   * @param {*} data - 리스너에 전달할 데이터
   */
  const notify = (data) => {
    for (const listener of listeners) {
      listener(data);
    }
  };

  return {
    subscribe,
    notify,
  };
};
