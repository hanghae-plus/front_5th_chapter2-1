export default function cartItem(item) {
  const newItem = document.createElement('div');
  newItem.id = item.id;
  newItem.className = 'flex justify-between items-center mb-2';
  newItem.innerHTML = `
          <span>${item.name} - ${item.price}원 x 1</span>
          <div>
            <button
              class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id="${item.id}"
              data-change="-1"
            >-</button>
            <button
              class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
              data-product-id="${item.id}"
              data-change="1"
            >+</button>
            <button
              class="remove-item bg-red-500 text-white px-2 py-1 rounded"
              data-product-id="${item.id}"
            >삭제</button>
          </div>
      `;
  return newItem;
}
