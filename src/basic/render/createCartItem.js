import { createDOM } from '../utils';

/**
 * 장바구니 아이템 생성 함수
 */
export const createCartItem = (product) => {
    const $cartDisplay = document.getElementById('cart-items');
    let $newItem = createDOM('div', {
        id: product.id,
        className: 'flex justify-between items-center mb-2',
        parent: $cartDisplay,
    });

    createDOM('span', {
        textContent: product.name + ' - ' + product.price + '원 x 1',
        parent: $newItem,
    });

    let $buttonGroup = createDOM('div', {
        parent: $newItem,
    });

    // 감소 버튼
    createDOM('button', {
        className: `quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1`,
        parent: $buttonGroup,
        textContent: '-',
        dataset: {
            productId: product.id,
            change: -1,
        },
    });

    // 증가 버튼
    createDOM('button', {
        className: `quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1`,
        parent: $buttonGroup,
        textContent: '+',
        dataset: {
            productId: product.id,
            change: 1,
        },
    });

    // 삭제 버튼
    createDOM('button', {
        className: `remove-item bg-red-500 text-white px-2 py-1 rounded`,
        parent: $buttonGroup,
        textContent: '삭제',
        dataset: {
            productId: product.id,
        },
    });
};
