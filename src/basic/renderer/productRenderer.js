/**
 * 상품 선택 옵션 렌더링
 * @param {Array} products 상품 목록
 */
export const renderProductOptions = (products) => {
  const selectElement = document.getElementById("product-select");
  if (!selectElement) return;

  selectElement.innerHTML = "";

  // 상품 옵션 생성
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.name} - ${product.val}원`;

    // 품절 상품은 비활성화
    if (product.q === 0) {
      option.disabled = true;
      option.textContent += " (품절)";
    }

    selectElement.appendChild(option);
  });
};
