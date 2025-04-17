import { createElementFromHTML } from '../utils/dom-utils.js';

/**
 * 장바구니 상품 생성
 * @param {Object} product 상품 객체
 * @returns {Element} 장바구니 상품 요소
 */
const $cartItem = (product) => {
  return createElementFromHTML(
    /* html */
    `<div id="${product.id}" class="flex justify-between items-center mb-2">
          <span>${product.name} - ${product.price}원 x 1</span>
          <div>
            <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                    data-product-id="${product.id}" data-change="-1">-</button>
            <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                    data-product-id="${product.id}" data-change="1">+</button>
            <button class="remove-item bg-red-500 text-white px-2 py-1 rounded"
                    data-product-id="${product.id}">삭제</button>
          </div>
        </div>
      `,
  );
};

export { $cartItem };
