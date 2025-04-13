/**
 * 지정된 태그 혹은 선택자에 따라 적절한 DOM 노드를 반환
 *
 * - `"#id"` 또는 `".class"`로 시작하면 `document.querySelector`를 사용해 DOM을 조회
 * - `"frag"` 문자열을 전달하면 `DocumentFragment`를 반환
 * - 그 외에는 일반 DOM 요소를 생성하며, 전달된 `props`를 속성으로 할당
 *
 * @param {string} type
 * @param {Object} [props]
 * @param {string} [props.id]
 * @param {string} [props.className]
 * @param {string} [props.textContent]
 * @param {string} [props.value]
 * @param {boolean} [props.disabled]
 * @param {Object<string, string>} [props.dataset] data-* 오브젝트
 * @param {...(HTMLElement | Text | DocumentFragment)} children
 * @returns {HTMLElement | DocumentFragment | null} DOM 엘리먼트
 *
 * @example
 * const div = $("div", { className: "bg-gray-100 p-8", dataset: { productId: "p1" } });
 * const option = $("option", { value: "p1", textContent: "상품1", disabled: false });
 * const frag = $("frag");
 * const existingEl = $("#app"); // querySelector
 */
export const $ = (type, props = {}, ...children) => {
  // querySelector
  if (type.startsWith("#") || type.startsWith(".")) {
    return document.querySelector(type);
  }

  // fragment 생성
  if (type === "frag") {
    return document.createDocumentFragment();
  }

  // 일반 element 생성
  const element = document.createElement(type);
  Object.entries(props || {}).forEach(([key, value]) => {
    if (key === "dataset" && typeof value === "object") {
      // dataset 처리
      Object.entries(value).forEach(([dataKey, dataValue]) => (element.dataset[dataKey] = dataValue));
    } else {
      // id, className 및 기타 속성 처리
      element[key] = value;
    }
  });

  // element children 생성 시 추가
  if (children && Array.isArray(children)) {
    children.filter((c) => !!c && c instanceof Node).forEach((el) => element.appendChild(el));
  }
  return element;
};
