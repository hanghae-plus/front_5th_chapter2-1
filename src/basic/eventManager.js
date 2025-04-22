import ERROR_MESSAGES from './constants/errorMessages.js';
import { state } from './state.js';
import { elements } from './ui/element.js';

export function attachEventListener(calculateCartItem) {
  attachAddToCartHandler(calculateCartItem);
  attachCartControlHandler(calculateCartItem);
}

function attachAddToCartHandler(calculateCartItem) {
  elements.AddToCartButton.addEventListener('click', handleAddToCart);

  function handleAddToCart() {
    const selItem = elements.ProductSelect.value;
    const addItemState = state.productList.find(
      (product) => product.id === selItem,
    );

    if (!addItemState || addItemState.count <= 0) return;

    const addItemCartContainer = document.getElementById(addItemState.id);

    if (addItemCartContainer) {
      const newQuantity =
        parseInt(
          addItemCartContainer.querySelector('span').textContent.split('x ')[1],
        ) + 1;

      if (newQuantity <= addItemState.count) {
        addItemCartContainer.querySelector('span').textContent =
          addItemState.name +
          ' - ' +
          addItemState.price +
          '원 x ' +
          newQuantity;
        addItemState.count--;
      }
      if (newQuantity > addItemState.count) {
        alert(ERROR_MESSAGES.PRODUCT.NO_STOCK);
      }
    }

    if (!addItemCartContainer) {
      let newItem = document.createElement('div');
      newItem.id = addItemState.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML =
        '<span>' +
        addItemState.name +
        ' - ' +
        addItemState.price +
        '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        addItemState.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        addItemState.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        addItemState.id +
        '">삭제</button></div>';
      elements.CartContainer.appendChild(newItem);
      addItemState.count--;
    }

    calculateCartItem();
    state.lastSel = selItem;
  }
}

function attachCartControlHandler(calculateCartItem) {
  elements.CartContainer.addEventListener('click', handleCartQuantity);

  function handleCartQuantity(event) {
    const targetElement = event.target;

    if (
      !targetElement.classList.contains('quantity-change') &&
      !targetElement.classList.contains('remove-item')
    )
      return;

    const productId = targetElement.dataset.productId;
    let itemCartContainer = document.getElementById(productId);
    let product = state.productList.find((product) => product.id === productId);

    //수량 변경 처리
    if (targetElement.classList.contains('quantity-change')) {
      const quantityChange = parseInt(targetElement.dataset.change);
      const spanElem = itemCartContainer.querySelector('span');
      const currentQuantity = parseInt(spanElem.textContent.split('x ')[1]);
      const newQuantity = currentQuantity + quantityChange;

      const productName = spanElem.textContent.split('x ')[0];

      if (newQuantity > product.count + currentQuantity) {
        alert(ERROR_MESSAGES.PRODUCT.NO_STOCK);
        return;
      }

      if (newQuantity <= 0) {
        itemCartContainer.remove();
        product.count -= quantityChange;
        return;
      }

      // 정상 수량 변경
      spanElem.textContent = `${productName}x ${newQuantity}`;
      product.count -= quantityChange;
    }

    //삭제 처리
    if (targetElement.classList.contains('remove-item')) {
      const removeQuantity = parseInt(
        itemCartContainer.querySelector('span').textContent.split('x ')[1],
      );
      product.count += removeQuantity;
      itemCartContainer.remove();
    }

    calculateCartItem();
  }
}
