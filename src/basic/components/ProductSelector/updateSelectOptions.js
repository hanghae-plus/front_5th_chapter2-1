import { createProductOption } from './createProductOption.js';

export const updateSelectOptions = (productSelectElement, productList) => {
    productSelectElement.innerHTML = ''; // 기존 옵션 제거
    const fragment = document.createDocumentFragment();// 미리 fragment에 담아 한 번에 추가(리플로우 최소화)
    productList.forEach(product => {
        fragment.appendChild(createProductOption(product));
    })
    productSelectElement.appendChild(fragment); // 새로운 옵션 추가
}