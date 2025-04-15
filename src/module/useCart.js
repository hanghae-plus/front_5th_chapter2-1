import { PRODUCT_ITEM } from "../store/PRODUCT";

// 카트에 담는 기능 구현
const useCart = () => {
  let products = [...PRODUCT_ITEM];
  let lastSelected = null;

  // 장바구니 담기
  // 1. $selectBox -> 선택된 상품 판별을 위함
  // 2. $cartItem -> 선택 후 장바구니에 담기 위함
  const addToCart = ($selectBox, $cartItem) => {
    const selectedId = $selectBox.value; // 선택된 상품 ID
    const selectedProduct = products.find((item) => item.id === selectedId); // 선택된 상품 찾기

    // 선택된 상품 + 재고 존재
    if (selectedProduct && selectedProduct.stock > 0) {
      const foundCartItem = document.getElementById(selectedProduct.id);

      // 장바구니에 담긴 경우
      if (foundCartItem) {
        // 기존 수량 + 1
        const newCount =
          parseInt(
            foundCartItem.querySelector("span").textContent.split("x ")[1]
          ) + 1;

        // 재고 체크
        if (newCount <= selectedProduct.stock) {
          foundCartItem.querySelector("span").textContent =
            selectedProduct.name +
            " - " +
            selectedProduct.price +
            "원 x " +
            newCount;
          selectedProduct.stock--;
        } else {
          alert("재고가 부족합니다.");
        }
      } else {
        const $newCartItem = document.createElement("div");
        $newCartItem.id = selectedProduct.id;
        $newCartItem.className = "flex justify-between items-center mb-2";
        $newCartItem.innerHTML = `
        <span>${selectedProduct.name} - ${selectedProduct.price}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedProduct.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedProduct.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${selectedProduct.id}">삭제</button>
        </div>`;
        $cartItem.appendChild($newCartItem);
        selectedProduct.stock--;
      }
      lastSelected = selectedId;
      return true;
    }

    return false;
  };

  //   // 장바구니 계산
  //   // 1. $
  //   const calculateCart = ($cartItem, $cartResult, $stockInfo) => {

  //   }

  return {
    getProducts: () => products,
    getLastSelected: () => lastSelected,
    addToCart,
  };
};

export { useCart };
