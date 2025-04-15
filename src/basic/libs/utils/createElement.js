/**
 * 요소 생성
 * @param {string} tagName - 요소 이름
 * @param {Object | null} attributes - 요소 속성
 * @param {(Object | string | null)[]} children - 요소 텍스트
 * @returns {HTMLElement} 생성된 요소
 */
export const createElement = (tagName, attributes, ...children) => {
  const $element = document.createElement(tagName);

  // 속성 넣기
  Object.entries(attributes ?? {}).forEach(([key, value]) => {
    // dataset 속성 처리
    if (key === "dataset" && typeof value === "object") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        $element.dataset[dataKey] = dataValue;
      });

      return;
    }

    $element.setAttribute(key, value);
  });

  // 자식 넣기
  const $fragment = document.createDocumentFragment();
  children.forEach((child) => {
    const $child = child instanceof HTMLElement ? child : document.createTextNode(child);

    $fragment.appendChild($child);
  });

  // 자식(들) 넣기
  $element.appendChild($fragment);

  return $element;
};
