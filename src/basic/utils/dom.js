/*
* 문자열 템플릿을 DOM 요소로 변환하는 함수
* @param {string}
* @param {string}
* @return {HTMLElement}
* */
// function createElementFromTemplate(template, children = '') {
//   const tempDiv = document.createElement('div');
//   tempDiv.innerHTML = template;
//   return tempDiv.firstChild;
// }

/*
* 태그 함수를 사용한 HTML 요소 생성
* */
export function html(strings, ...values) {
  const template = strings.reduce((result, string, i) => {
    return result + string + (values[i] || '');
  }, '');

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = template.trim();
  return tempDiv.firstChild;
}

// 자식 요소 추가 헬퍼 함수
export function appendChildren(parent, ...children) {
  children.forEach(child => {
    if (child) parent.appendChild(child);
  });
  return parent;
}