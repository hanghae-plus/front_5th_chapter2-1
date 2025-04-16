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
  setTimeout(() => {
    setInterval(() => {
      const { products } = getStore();
      const luckyItemIndex = Math.floor(Math.random() * products.length);
      const luckyItem = products[luckyItemIndex];

      if (Math.random() < 0.3 && luckyItem.q > 0) {
        const updatedProducts = products.map((p, index) =>
          index === luckyItemIndex ? { ...p, val: Math.round(p.val * 0.8) } : p
        );

        updateStore({ products: updatedProducts });
        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
      }
    }, 30000);
  }, Math.random() * 10000);

  // 추천 상품 타이머
  setTimeout(() => {
    setInterval(() => {
      const { products, lastSelected } = getStore();

      if (lastSelected) {
        const suggestedProduct = products.find((p) => p.id !== lastSelected && p.q > 0);

        if (suggestedProduct) {
          const updatedProducts = products.map((p) =>
            p.id === suggestedProduct.id ? { ...p, val: Math.round(p.val * 0.95) } : p
          );

          updateStore({ products: updatedProducts });
          alert(`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};
