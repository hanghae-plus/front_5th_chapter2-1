import { stores } from "../stores";

export const setupEventListeners = () => {
  document.addEventListener("click", (e) => {
    const target = e.target;

    if (target && (target.matches("#add-to-cart") || target.id === "add-to-cart")) {
      const selectedId = document.getElementById("product-select").value;
      const { productList } = stores.product.getState();
      const selectedProduct = productList.find((product) => product.id === selectedId);

      if (!selectedProduct) {
        alert("상품을 선택해주세요.");
        return;
      }

      const result = stores.product.actions.decreaseStock(selectedId, 1);
      if (!result) {
        alert("재고가 부족합니다.");
        return;
      }

      // 장바구니 추가
      stores.cart.actions.addItem(selectedProduct, 1);
      // 마지막 선택 상품 기록
      stores.product.actions.setLastSelectedProduct(selectedId);
    }

    // 수량 변경 버튼 클릭
    if (target && target.matches(".quantity-change")) {
      const productId = target.dataset.productId;
      const changeQuantity = Number(target.dataset.change);

      const { cartItemList } = stores.cart.getState();
      const cartItem = cartItemList.find((item) => item.id === productId);

      if (!cartItem) {
        return;
      }

      const newQuantity = cartItem.quantity + changeQuantity;

      if (newQuantity <= 0) {
        // alert("수량은 0보다 작을 수 없습니다.");
        return;
      }

      // 수량 업데이트
      if (changeQuantity > 0) {
        const { productList } = stores.product.getState();
        const product = productList.find((product) => product.id === productId);

        if (!product || product.stock < changeQuantity) {
          alert("재고가 부족합니다.");
          return;
        }

        stores.product.actions.decreaseStock(productId, changeQuantity);
      } else {
        stores.product.actions.increaseStock(productId, Math.abs(changeQuantity));
      }

      stores.cart.actions.updateItemQuantity(productId, newQuantity);
    }

    // 아이템 삭제 버튼 클릭
    if (target && target.matches(".remove-item")) {
      const productId = target.dataset.productId;

      const { cartItemList } = stores.cart.getState();
      const cartItem = cartItemList.find((item) => item.id === productId);

      if (cartItem) {
        stores.product.actions.increaseStock(productId, cartItem.quantity);
      }

      stores.cart.actions.removeItem(productId);
    }
  });
};
