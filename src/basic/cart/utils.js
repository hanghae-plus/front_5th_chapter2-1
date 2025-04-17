export const getQuantity = item => {
  return parseInt(item.querySelector('span').textContent.split('x ')[1]);
};

export const updateCartItemText = (itemElement, name, price, quantity) => {
  itemElement.querySelector('span').textContent =
    `${name} - ${price}원 x ${quantity}`;
};
