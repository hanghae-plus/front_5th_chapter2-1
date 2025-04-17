import { createDOM } from '../utils';

export function renderInit(root) {
    // 요소 생성

    // 메인 컨테이너 생성
    let container = createDOM('div', {
        className: 'bg-gray-100 p-8',
        parent: root,
    });

    // 래퍼 생성
    let wrapper = createDOM('div', {
        className: 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
        parent: container,
    });

    // 헤더 생성
    createDOM('h1', {
        className: 'text-2xl font-bold mb-4',
        textContent: '장바구니',
        parent: wrapper,
    });

    // 장바구니 할당
    createDOM('div', {
        id: 'cart-items',
        parent: wrapper,
    });

    // 총액 할당
    createDOM('div', {
        id: 'cart-total',
        className: 'text-xl font-bold my-4',
        parent: wrapper,
    });

    // 상품 선택 할당
    createDOM('select', {
        id: 'product-select',
        className: 'border rounded p-2 mr-2',
        parent: wrapper,
    });

    // 추가 버튼 할당
    createDOM('button', {
        id: 'add-to-cart',
        className: 'bg-blue-500 text-white px-4 py-2 rounded',
        textContent: '추가',
        parent: wrapper,
    });

    // 재고 정보 할당
    createDOM('div', {
        id: 'stock-status',
        className: 'text-sm text-gray-500 mt-2',
        parent: wrapper,
    });

    root.appendChild(container);
}
