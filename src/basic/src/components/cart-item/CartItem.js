export const createCartItem = (product) => {
	const { id, name, price } = product;
	const cartItem = document.createElement('div');
	cartItem.id = id;
	cartItem.className = 'flex justify-between items-center mb-2';

	cartItem.innerHTML = `
    <span>${name} - ${price}원 x 1</span>
    <div>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="-1">-</button>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="1">+</button>
      <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${id}">삭제</button>
    </div>
  `;

	return cartItem;
};
