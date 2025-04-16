/**
 * 요소 생성 및 속성 추가
 * @param {string} tag 요소 태그 이름
 * @param {Object} properties 요소 속성 object
 * @returns {Element} 요소
 */
const createElement = (tag, properties = {}) => {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(properties)) {
    if (key && value) element[key] = value;
  }
  return element;
};

export { createElement };
