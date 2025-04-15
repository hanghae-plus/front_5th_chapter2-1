// prettier-ignore

export const NewItem = (itemToAdd) => {
  return (
    `<div id="${itemToAdd.id}" class="flex justify-between items-center mb-2">
      <span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span> 
      <div>
        <button 
          class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" 
          data-change="-1"
        >
          -
        </button>
        <button 
          class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" 
          data-change="1"
        >
          +
        </button> 
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">
          삭제
        </button>
      </div>
    </div>`
  );
};
