/**
 * DOM 요소 생성 함수
 * @param {string} tagName - 생성할 HTML 태그 이름
 * @param {Object} options - 요소 설정 옵션
 * @returns {HTMLElement} 생성된 DOM 요소
 */
function createDOM(tagName, options = {}) {
    // 요소 생성
    const element = document.createElement(tagName);

    const { parent, ...rest } = options;

    Object.entries(rest).forEach(([key, value]) => {
        if (key === 'dataset') {
            Object.entries(value).forEach(([datasetKey, datasetValue]) => {
                element.dataset[datasetKey] = datasetValue;
            });
        } else {
            element[key] = value;
        }
    });
    // appendChild 할 parent 를 변수로 넘겨준다면!!
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}

export default createDOM;
