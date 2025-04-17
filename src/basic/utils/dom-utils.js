/**
 * 요소 생성 및 속성 추가
 * @param {string} tag 요소 태그 이름
 * @param {Object} properties 요소 속성
 * @returns {Element} 요소
 */

export const createElementFromHTML = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};
