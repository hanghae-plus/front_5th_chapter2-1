/**
 * 이벤트 위임 시스템
 * DOM 이벤트를 중앙에서 관리하고 이벤트 핸들러를 등록/실행하는 시스템
 */
const EventManager = (() => {
  // 이벤트 핸들러 저장소
  const handlers = {};

  /**
   * 이벤트 핸들러 등록
   * @param {string} eventType - 이벤트 타입 (예: 'click', 'change')
   * @param {string} selector - CSS 선택자
   * @param {Function} handler - 이벤트 핸들러 함수
   */
  const on = (eventType, selector, handler) => {
    if (!handlers[eventType]) {
      handlers[eventType] = [];
      document.addEventListener(eventType, handleEvent, false);
    }

    handlers[eventType].push({
      selector,
      handler
    });
  };

  /**
   * 이벤트 핸들러 제거
   * @param {string} eventType - 이벤트 타입
   * @param {string} selector - CSS 선택자
   * @param {Function} handler - 이벤트 핸들러 함수 (선택적)
   */
  const off = (eventType, selector, handler) => {
    if (!handlers[eventType]) return;

    // 특정 핸들러 제거
    if (handler) {
      handlers[eventType] = handlers[eventType].filter(
        (item) => item.selector !== selector || item.handler !== handler
      );
    }
    // 선택자에 해당하는 모든 핸들러 제거
    else {
      handlers[eventType] = handlers[eventType].filter((item) => item.selector !== selector);
    }

    // 해당 이벤트 타입의 핸들러가 없으면 이벤트 리스너 제거
    if (handlers[eventType].length === 0) {
      document.removeEventListener(eventType, handleEvent, false);
      delete handlers[eventType];
    }
  };

  /**
   * 이벤트 처리 함수
   * @param {Event} event - DOM 이벤트 객체
   */
  const handleEvent = (event) => {
    const eventHandlers = handlers[event.type];
    if (!eventHandlers) return;

    let target = event.target;

    // 이벤트 버블링
    while (target && target !== document) {
      for (const { selector, handler } of eventHandlers) {
        // 선택자와 일치하는 요소 확인
        if (target.matches(selector)) {
          // 이벤트 핸들러 실행
          handler.call(target, event);
        }
      }

      // 부모 요소로 올라가며 확인
      target = target.parentNode;
    }
  };

  /**
   * 특정 요소에 직접 이벤트 발생시키기 (사용자 이벤트 시뮬레이션)
   * @param {Element} element - 이벤트를 발생시킬 요소
   * @param {string} eventType - 이벤트 타입
   * @param {Object} detail - 이벤트에 포함할 추가 데이터
   */
  const trigger = (element, eventType, detail = {}) => {
    const event = new CustomEvent(eventType, {
      bubbles: true,
      cancelable: true,
      detail
    });

    element.dispatchEvent(event);
  };

  // 공개 API
  return {
    on,
    off,
    trigger
  };
})();

export default EventManager;
