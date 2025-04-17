const createNewCartItem = ($cartList, product) => {
  const { id, name, price } = product;
  const $newItem = document.createElement('div');

  $newItem.id = id;
  $newItem.className = 'flex justify-between items-center mb-2';
  $newItem.innerHTML = `
    <span>${name} - ${price}원 x 1</span>
    <div>
      <button 
        class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
        data-product-id="${id}" 
        data-change="-1"
      >
        -
      </button>
      <button 
        class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
        data-product-id="${id}" 
        data-change="1"
      >
        +
      </button>
      <button 
        class="remove-item bg-red-500 text-white px-2 py-1 rounded" 
        data-product-id="${id}"
      >
        삭제
      </button>
    </div>`;

  $cartList.appendChild($newItem);
  product.quantity--;
};

export default createNewCartItem;
