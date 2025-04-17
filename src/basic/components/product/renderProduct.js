export default function renderProduct({ id, name, price }) {
  const product = document.createElement('div');

  product.id = id;
  product.className = 'flex justify-between items-center mb-2';
  product.innerHTML = `
    <span>${name} - ${price}원 x 1</span>
    <div>
      <button
        class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
        data-product-id="${id}"
        data-change="-1"
      >-</button>
      <button
        class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
        data-product-id="${id}"
        data-change="1"
      >+</button>
      <button
        class="remove-item bg-red-500 text-white px-2 py-1 rounded"
        data-product-id="${id}"
      >삭제</button>
    </div>
  `;
  return product;
}
