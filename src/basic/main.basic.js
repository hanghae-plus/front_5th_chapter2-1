// lib
import { $, STYLES } from "@/basic/lib";

// render
import { renderCartTotal, renderProductOptions } from "@/basic/render";

// handlers
import { handleAddToCart } from "@/basic/handlers/handleAddToCart";
import { handleCartItems } from "@/basic/handlers/handleCartItems";

// data
const products = [
  { id: "p1", name: "상품1", cost: 10_000, quantity: 50, discount: 0.1 },
  { id: "p2", name: "상품2", cost: 20_000, quantity: 30, discount: 0.15 },
  { id: "p3", name: "상품3", cost: 30_000, quantity: 20, discount: 0.2 },
  { id: "p4", name: "상품4", cost: 15_000, quantity: 0, discount: 0.05 },
  { id: "p5", name: "상품5", cost: 25_000, quantity: 10, discount: 0.25 },
];

/// global state
let lastSelected;

/**
 * 랜덤 할인 세팅 함수
 *
 * - 랜덤한 시간마다 번개 할인
 * - 랜덤한 시간마다 마지막에 선택하지 않은 상품 5% 추가 할인
 *   * TODO: 이미 담겨있는 상품이 할인되는 상황 예외처리
 *
 * @see products - 상품 정보 배열
 * @fires renderSelectOptions
 */
const setRandomDiscount = () => {
  setTimeout(() => {
    setInterval(() => {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.cost = Math.round(luckyItem.cost * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        renderProductOptions(products);
      }
    }, 30_000);
  }, Math.random() * 10_000);

  setTimeout(() => {
    setInterval(() => {
      if (!lastSelected) return;
      const suggest = products.find(
        (item) => item.id !== lastSelected && item.quantity > 0,
      );
      if (!suggest) return;
      alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
      suggest.cost = Math.round(suggest.cost * 0.95);
      renderProductOptions(products);
    }, 60_000);
  }, Math.random() * 20_000);
};

const setListener = () => {
  const $addToCart = $("#add-to-cart");
  const $cartItems = $("#cart-items");

  const handleClickAddToCart = () => {
    lastSelected = handleAddToCart(products) || lastSelected;
    renderCartTotal(products);
  };
  const handleClickCartItems = (e) => {
    handleCartItems(e.target, products);
    renderCartTotal(products);
  };

  $addToCart.addEventListener("click", handleClickAddToCart);
  $cartItems.addEventListener("click", handleClickCartItems);
};

/// main

/**
 * [Main] 엘리먼트 생성 및 조립
 * 엘리먼트를 선언하여 컴포넌트를 조립하고, 초기값과 스케쥴링 함수 세팅
 *
 * - 엘리먼트 생성(id, class, textContent)
 *    - 상품 목록을 option으로 세팅
 * - 컴포넌트 조립
 * - 장바구니 초기값 세팅
 * - 스케쥴링 함수 호출
 *
 * @fires renderProductOptions
 * @fires renderCartTotal
 * @fires setRandomDiscount
 */
const main = () => {
  // UI 앨리먼트 생성 및 속성 설정 커스텀 $ 함수 사용

  // $app 컴포넌트 조립
  $("#app").appendChild(
    $(
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
    ),
  );

  // 초기 세팅 함수
  renderProductOptions(products);
  renderCartTotal(products);
  setRandomDiscount();
  setListener();
};

main();
