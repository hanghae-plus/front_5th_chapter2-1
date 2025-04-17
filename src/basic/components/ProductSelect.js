import { initFlashSaleTimer, initSuggestionTimer } from "../services/timerService.js";
import { getStore, updateStore } from "../store/store.js";

export const ProductSelect = () => {
  return `<select id="product-select" class="border rounded p-2 mr-2"></select>`;
};

export const updateProductOptions = () => {
  const { products } = getStore();
  const selectElement = document.getElementById("product-select");
  if (!selectElement) return;

  selectElement.innerHTML = "";

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.name} - ${product.val}원`;

    if (product.q === 0) {
      option.disabled = true;
    }

    selectElement.appendChild(option);
  });
};

export const initProductEvents = () => {
  const addButton = document.getElementById("add-to-cart");
  if (!addButton) return;

  addButton.addEventListener("click", () => {
    const selectElement = document.getElementById("product-select");
    if (!selectElement) return;

    const selectedId = selectElement.value;
    const { products, cartItems } = getStore();

    const selectedProduct = products.find((p) => p.id === selectedId);
    if (!selectedProduct || selectedProduct.q <= 0) return;

    // 카트에 추가
    const currentQuantity = cartItems[selectedId] || 0;
    const updatedCartItems = {
      ...cartItems,
      [selectedId]: currentQuantity + 1
    };

    // 재고 감소
    const updatedProducts = products.map((p) => (p.id === selectedId ? { ...p, q: p.q - 1 } : p));

    // 상태 업데이트
    updateStore({
      cartItems: updatedCartItems,
      products: updatedProducts,
      lastSelected: selectedId
    });
  });

  // 타이머 함수 설정: 번개세일
  initFlashSaleTimer();
  initSuggestionTimer();
};
