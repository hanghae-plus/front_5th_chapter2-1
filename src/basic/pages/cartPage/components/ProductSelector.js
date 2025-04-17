export const ProductSelector = ({ products }) => {
  return `
    <select id="product-select" class="border rounded p-2 mr-2">
      ${products
        .map((product) => {
          return `
          <option ${product.stock === 0 ? 'disabled' : ''} value="${product.id}">${product.name} - ${product.price}원</option>
        `;
        })
        .join('')}
    </select>
    <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
  `;
};
