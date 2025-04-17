export const CartItemList = ({ cartItems = [] }) => {
  return `
    <div id="cart-items">
      ${cartItems
        .map(
          (item) => `
        <div id="${item.id}">
          <span>${item.name} - ${item.price}원 x ${item.quantity}</span>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${item.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${item.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${item.id}">삭제</button>
        </div>
      `
        )
        .join('')}
    </div>
  `;
};
