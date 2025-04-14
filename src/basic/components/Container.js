import { $, STYLES } from "@/basic/lib";

export const Container = () => {
  // UI 앨리먼트 생성 및 속성 설정 커스텀 $ 함수 사용
  return $(
    "div",
    { className: STYLES.CONTAINER }, // container props
    $(
      "div",
      { className: STYLES.WRAPPER }, // wrapper props
      $("h1", { className: STYLES.TITLE, textContent: "장바구니" }),
      $("div", { id: "cart-items" }),
      $("div", { id: "cart-total", className: STYLES.CART_TOTAL }),
      $("select", {
        id: "product-select",
        className: STYLES.PRODUCT_SELECT,
      }),
      $("button", {
        id: "add-to-cart",
        className: STYLES.ADD_TO_CART,
        textContent: "추가",
      }),
      $("div", { id: "stock-status", className: STYLES.STOCK_STATUS }),
    ),
  );
};
