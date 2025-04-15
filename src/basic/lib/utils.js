export const startRandomlyInMs = (ms) => (callback) => {
  const startsAt = Math.random(0) * ms;
  setTimeout(callback, startsAt);
};

export const createElement = (tag, props) => {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    element[key] = value;
  }
  return element;
};

export const getProductStockStatusString = (product) => {
  const hasStock = product.quantity > 0;
  const status = hasStock ? `재고 부족 (${product.quantity}개 남음)` : '품절';

  return `${product.name}: ${status}`;
};

export const extractCartProductInfo = (itemStrElem) => {
  const itemStr = itemStrElem.textContent;
  const [name, quantityStr] = itemStr.split(' x ');

  return {
    name: name.trim(),
    quantity: parseInt(quantityStr.trim(), 10),
  };
};
