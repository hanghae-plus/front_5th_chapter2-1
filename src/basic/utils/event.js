/**
 * 이벤트 리스너 등록 함수
 * @param {string} selector 선택자
 * @param {string} eventType 이벤트 타입
 * @param {Function} handler 이벤트 핸들러
 */
const addEventListeners = (selector, eventType, handler) => {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach((button) => button.addEventListener(eventType, handler));
};

export { addEventListeners };
