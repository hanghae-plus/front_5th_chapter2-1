export const CartItem = ({ id, name, price, counts }) =>
  `
  <div id ="${id}" class="flex justify-between items-center mb-1">
    <span>${name} - ${price} x ${counts}</span>
    <div class="flex justify-between items-center mb-2">
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-action="subtract" data-action="add">-</button>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}">+</button>
      <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded" data-product-id="${id}">삭제</button>
    </div>
  </div>`;
