// lib
import { $, STYLES } from "./lib";

// constant
import { EVENT_FRAGMENT } from "./config/fragments";
import { STOCK_ALERT_TEXT } from "./config/messages";

// logic

// components
import { CartItem } from "@/basic/components";

// render
import { renderCartTotal, renderProductOptions } from "@/basic/render";

// data
const products = [
  { id: "p1", name: "상품1", cost: 10_000, quantity: 50, discount: 0.1 },
  { id: "p2", name: "상품2", cost: 20_000, quantity: 30, discount: 0.15 },
  { id: "p3", name: "상품3", cost: 30_000, quantity: 20, discount: 0.2 },
  { id: "p4", name: "상품4", cost: 15_000, quantity: 0, discount: 0.05 },
  { id: "p5", name: "상품5", cost: 25_000, quantity: 10, discount: 0.25 },
];

/// global element
let $addToCart, $cartItems;

/// global state
let lastSelected;

/**
 * [Handler] 장바구니에 추가 핸들러
 * 추가 버튼을 클릭하면 장바구니에 아이템이 추가되어 재랜더링
 *
 * - 추가 버튼을 상품이 추가
 *   - 이미 있는 상품이라면 수량 증가
 *   - 새로운 아이템이라면 엘리먼트 추가
 * - 현재 재고가 없으면 추가되지 않음
 *
 * @returns {void}
 * @fires renderCalculateCart
 */
const handleClickAddToCart = () => {
  const $productSelect = $("#product-select");
  if (!$productSelect) return;
  const selectedItemId = $productSelect.value;
  const itemToAdd = products.find((p) => p.id === selectedItemId);

  if (!itemToAdd || itemToAdd.quantity <= 0) return;

  const currentItem = $("#" + itemToAdd.id);
  if (currentItem) {
    // 이미 있는 상품
    const newQuantity =
      parseInt(currentItem.querySelector("span").textContent.split("x ")[1]) +
      1;
    if (newQuantity <= itemToAdd.quantity) {
      currentItem.querySelector("span").textContent =
        itemToAdd.name + " - " + itemToAdd.cost + "원 x " + newQuantity;
      itemToAdd.quantity -= 1;
    } else {
      alert(STOCK_ALERT_TEXT);
    }
  } else {
    // 장바구니에 새 상품 추가
    $cartItems.appendChild(CartItem({ ...itemToAdd }));
    itemToAdd.quantity -= 1;
  }
  renderCartTotal(products);
  lastSelected = selectedItemId;
};

/**
 * [Handler] 수량 변경, 삭제 핸들러
 * 장바구니 내의 아이템의 수량을 조정하거나, 삭제
 *
 * - 장바구니 아이템의 버튼을 클릭
 * - 수량 변경 클릭 시
 *   - 증가 버튼은 수량 1개 증가
 *     - 재고가 없을 시 증가되지 않음
 *   - 감소 버튼은 수량 1개 감소
 *     - 변경된 수량이 0개이면 상품 제거
 * - 제거 버튼 클릭 시 제거
 *
 * @param {MouseEvent} event
 * @returns {void}
 *
 * @see EVENT_FRAGMENT
 * @fires renderCalculateCart
 */
const handleClickCartItems = (event) => {
  // 수량 변경, 상품 삭제 이벤트 처리
  const target = event.target;
  const isQuantityChange = target.classList.contains(
    EVENT_FRAGMENT.QUANTITY_CHANGE,
  );
  const isRemoveItem = target.classList.contains(EVENT_FRAGMENT.REMOVE_ITEM);
  if (!isQuantityChange && !isRemoveItem) return;

  const productId = target.dataset.productId;
  const $item = $("#" + productId);
  const product = products.find((p) => p.id === productId);

  // 기존 수량 확인
  const $quantity = $item.querySelector("span");
  let [prefix, quantity] = $quantity.textContent.split("x ");
  quantity = parseInt(quantity);

  if (isQuantityChange) {
    // 상품 수량 변경
    const quantityChange = parseInt(target.dataset.change);
    const newQuantity = quantity + quantityChange;

    if (newQuantity > 0 && newQuantity <= product.quantity + quantity) {
      $quantity.textContent = prefix + "x " + newQuantity;
      product.quantity -= quantityChange;
    } else if (newQuantity <= 0) {
      $item.remove();
      product.quantity -= quantityChange;
    } else {
      alert(STOCK_ALERT_TEXT);
    }
  } else if (isRemoveItem) {
    // 상품 삭제
    const remainQuantity = quantity;
    product.quantity += remainQuantity;
    $item.remove();
  }

  renderCartTotal(products);
};

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

  // global element
  $cartItems = $("div", { id: "cart-items" });
  $addToCart = $("button", {
    id: "add-to-cart",
    className: STYLES.ADD_TO_CART,
    textContent: "추가",
  });

  // $app 컴포넌트 조립
  $("#app").appendChild(
    $(
      "div",
      { className: STYLES.CONTAINER }, // container props
      $(
        "div",
        { className: STYLES.WRAPPER }, // wrapper props
        $("h1", { className: STYLES.TITLE, textContent: "장바구니" }),
        $cartItems,
        $("div", { id: "cart-total", className: STYLES.CART_TOTAL }),
        $("select", {
          id: "product-select",
          className: STYLES.PRODUCT_SELECT,
        }),
        $addToCart,
        $("div", { id: "stock-status", className: STYLES.STOCK_STATUS }),
      ),
    ),
  );

  // 초기 세팅 함수
  renderProductOptions(products);
  renderCartTotal(products);
  setRandomDiscount();
};

main();
$addToCart.addEventListener("click", handleClickAddToCart);
$cartItems.addEventListener("click", handleClickCartItems);
