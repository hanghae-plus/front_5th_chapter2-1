let $cartDisplay;

const TEXT_CART_ITEM = (name, price, count) => `${name} - ${price}원 x ${count}`;

/**
 * 장바구니 div 렌더
 * @returns {HTMLDivElement}
 */
function createCartDisplayElement() {
  $cartDisplay = document.createElement('div');
  $cartDisplay.id = 'cart-items';
  return $cartDisplay;
}

// 장바구니 element getter
function getCartDisplayElement() {
  return $cartDisplay;
}

/**
 * 새로 추가되는 장바구니 목록의 text
 * @param selectedItem
 * @param quantity
 * @returns {HTMLSpanElement}
 */
function createCartItemText(selectedItem, quantity) {
  const $span = document.createElement('span');
  $span.textContent = `${selectedItem.name} - ${selectedItem.price}원 x ${quantity}`;
  return $span;
}

/**
 * 수량  버튼 (- 또는 +)
 * @param id
 * @param change
 * @returns {HTMLButtonElement}
 */
function createQuantityButton(id, change) {
  const $btn = document.createElement('button');
  $btn.className = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
  $btn.dataset.productId = id;
  $btn.dataset.change = change;
  $btn.textContent = change > 0 ? '+' : '-';
  return $btn;
}

/**
 * 삭제 버튼
 * @param id
 * @returns {HTMLButtonElement}
 */
function createRemoveButton(id) {
  const $btn = document.createElement('button');
  $btn.className = 'remove-item bg-red-500 text-white px-2 py-1 rounded';
  $btn.dataset.productId = id;
  $btn.textContent = '삭제';
  return $btn;
}

/**
 * 장바구니 목록 렌더
 * @param selectedItem
 */
function createCartItemElement(selectedItem) {
  let $newItem = document.createElement('div');
  $newItem.id = selectedItem.id;
  $newItem.className = 'flex justify-between items-center mb-2';

  const $span = createCartItemText(selectedItem, 1);

  const $minusBtn = createQuantityButton(selectedItem.id, -1);
  const $plusBtn = createQuantityButton(selectedItem.id, 1);
  const $removeBtn = createRemoveButton(selectedItem.id);

  const $groupDiv = document.createElement('div');

  $groupDiv.appendChild($minusBtn);
  $groupDiv.appendChild($plusBtn);
  $groupDiv.appendChild($removeBtn);

  $newItem.appendChild($span);
  $newItem.appendChild($groupDiv);

  $cartDisplay.appendChild($newItem);
}

/**
 *
 * @param itemElement 장바구니 목록 요소
 * @param selectedItem 판매 상품 정보
 * @param change 변경될 개수
 */
function updateItemInfo($itemElement, selectedItem, change) {
  $itemElement.querySelector('span').textContent = TEXT_CART_ITEM(
    selectedItem.name,
    selectedItem.price,
    change,
  );
}

export { createCartDisplayElement, getCartDisplayElement, createCartItemElement, updateItemInfo };
