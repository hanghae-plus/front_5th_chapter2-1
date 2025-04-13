/**
 * 전체 코드 중 초기 세팅으로 주로 사용되는 값들만 주입받아 엘리먼트를 반환합니다.
 * @param {string} tag
 * @param {Object} [props]
 * @param {string} [props.id]
 * @param {string} [props.className]
 * @param {string} [props.textContent]
 * @param {string} [props.value]
 * @param {boolean} [props.disabled]
 * @returns {HTMLElement} DOM 엘리먼트
 */
export const $ = (tag, props = {}) => {
  const element = document.createElement(tag);
  Object.entries(props).map(([key, value]) => (element[key] = value));
  return element;
};
