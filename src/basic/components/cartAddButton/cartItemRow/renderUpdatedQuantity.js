export function renderUpdatedQuantity($element, item, quantity) {
  $element.querySelector('span').textContent =
    `${item.name} - ${item.price}원 x ${quantity}`;
}
