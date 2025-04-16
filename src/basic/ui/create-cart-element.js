/**
 * 주어진 상품 정보를 기반으로 장바구니 항목 DOM 요소를 생성
 *
 * @param {Object} itemToAdd - 장바구니에 추가할 상품 객체
 * @param {string} itemToAdd.id - 상품 고유 ID
 * @param {string} itemToAdd.name - 상품 이름
 * @param {number} itemToAdd.val - 상품 가격
 * @returns {HTMLElement} 생성된 장바구니 항목 DOM 요소
 */

export const createCartItemElement = (itemToAdd) => {
  const $newItem = document.createElement("div");
  $newItem.id = itemToAdd.id;
  $newItem.className = "flex justify-between items-center mb-2";

  $newItem.innerHTML = `
    <span>${itemToAdd.name} - ${itemToAdd.val}원 x 1</span>
    <div>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id="${itemToAdd.id}" data-change="-1">-</button>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id="${itemToAdd.id}" data-change="1">+</button>
      <button class="remove-item bg-red-500 text-white px-2 py-1 rounded"
              data-product-id="${itemToAdd.id}">삭제</button>
    </div>
  `.trim();

  return $newItem;
};
