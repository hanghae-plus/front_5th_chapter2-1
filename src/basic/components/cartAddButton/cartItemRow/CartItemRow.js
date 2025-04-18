export function CartItemRow(item) {
  const $itemRowDiv = document.createElement('div');
  $itemRowDiv.id = item.id;
  $itemRowDiv.className = 'flex justify-between items-center mb-2';
  $itemRowDiv.innerHTML = `
        <span>${item.name} - ${item.price}원 x 1</span>
        <div>
          <button 
            class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
            data-item-id="${item.id}"
            data-change="-1"
          >-</button>
          <button 
            class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
            data-item-id="${item.id}"
            data-change="1"
          >+</button>
          <button 
            class="remove-item bg-red-500 text-white px-2 py-1 rounded"
            data-item-id="${item.id}"
          >삭제</button>
        </div>
      `;

  return $itemRowDiv;
}
