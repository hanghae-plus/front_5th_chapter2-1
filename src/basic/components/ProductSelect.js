/**
 * 상품 선택 컴포넌트
 * @param {Array} products - 상품 목록
 */
const ProductSelect = (products) => {
  const options = products
    ?.map(
      (product) =>
        `<option value="${product.id}" ${product.quantity === 0 ? "disabled" : ""}>${product.name} - ${product.price}원</option>`
    )
    .join("");

  return `<select id="product-select" class="border rounded p-2 mr-2">${options}</select>`;
};

export default ProductSelect;
