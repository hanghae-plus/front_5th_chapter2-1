import { $ } from "./utils/$";

/// constant

/** @const 개별 할인 적용 수량 기준 */
const BULK_DISCOUNT_LIMIT = 10;
/** @const 전체 할인 적용 수량 기준 */
const TOTAL_BULK_DISCOUNT_LIMIT = 30;
/** @const 전체 할인 적용 할인율  */
const TOTAL_BULK_DISCOUNT_RATE = 0.25;

/** @const 특별 추가 할인 날짜 기준 */
const MONTHLY_SPECIAL_DAY = 2;
/** @const 특별 추가 할인 날짜 기준 할인율 */
const MONTHLY_SPECIAL_DISCOUNT_RATE = 0.1;

/** @const 구매 포인트 비율 */
const POINT_RATE = 1 / 1_000;

/** @const 재고 부족 경고 기준 */
const STOCK_WARNING_LIMIT = 5;

/** @const 재고 부족 텍스트*/
const STOCK_ALERT_TEXT = "재고가 부족합니다.";

/** @const 상품 정보 배열 */
const PRODUCT_LIST = [
  { id: "p1", name: "상품1", cost: 10_000, quantity: 50, discount: 0.1 },
  { id: "p2", name: "상품2", cost: 20_000, quantity: 30, discount: 0.15 },
  { id: "p3", name: "상품3", cost: 30_000, quantity: 20, discount: 0.2 },
  { id: "p4", name: "상품4", cost: 15_000, quantity: 0, discount: 0.05 },
  { id: "p5", name: "상품5", cost: 25_000, quantity: 10, discount: 0.25 },
];

/// global element
let $productSelect, $addToCart, $cartItems, $cartTotal, $stockStatus;

/// global state
let lastSelected,
  bonusPoints = 0,
  totalCost = 0,
  itemCount = 0;

/// functions

/**
 * [Render] 장바구니 총액 랜더 함수
 * 장바구니에 계산된 총액 기준 포인트 랜더링
 *
 * - 장바구니 총액 계산 후 포인트 계산
 * - TODO 사용하는 함수가 renderCalculateCart만 있음
 *   - 로직상으로도 총액 계산 이후에만 동작하여 통합도 고려
 *
 * @see POINT_RATE - 구매 포인트 비율
 */
const renderBonusPoints = () => {
  bonusPoints = Math.floor(totalCost * POINT_RATE);
  let $loyaltyPoints = $("#loyalty-points");
  if (!$loyaltyPoints) {
    $loyaltyPoints = $("span", { id: "loyalty-points", className: "text-blue-500 ml-2" });
    $cartTotal.appendChild($loyaltyPoints);
  }
  $loyaltyPoints.textContent = "(포인트: " + bonusPoints + ")";
};

/**
 * [Render] 재고 부족 랜더 함수
 * 장바구니 총액 계산 이후 재고 부족 상품 경고 랜더링
 *
 * - 장바구니 총액 계산 이후 재고 부족 표기
 * - TODO 사용하는 함수가 renderCalculateCart만 있음
 *   - 로직상으로도 총액 계산 이후에만 동작하여 통합도 고려
 *
 * @see PRODUCT_LIST - 상품 정보 배열
 * @see STOCK_WARNING_LIMIT - 재고 부족 경오 기준
 */
const renderStockInfo = () => {
  $stockStatus.textContent = PRODUCT_LIST.filter((i) => i.quantity < STOCK_WARNING_LIMIT)
    .map((item) => item.name + ": " + (item.quantity > 0 ? "재고 부족 (" + item.quantity + "개 남음)" : "품절"))
    .join("\n");
};

/**
 * [Render] 상품 선택(select) 요소의 옵션 목록을 **PRODUCT_LIST**에 따라 랜더링
 * 할인 상품이 생겼을 때 갱신 후 랜더링
 *
 * - 기존 옵션을 모두 제거
 * - 상품 리스트를 기반으로 option 요소들을 생성
 * - DocumentFragment에 담아 한 번에 select 요소에 추가
 *
 * disabled 속성은 품절 여부(quantity === 0)에 따라 설정
 *
 * @see PRODUCT_LIST - 상품 데이터 배열
 */
const renderSelectOptions = () => {
  $productSelect.innerHTML = "";

  const frag = $("frag");
  PRODUCT_LIST.forEach((item) => {
    const props = { textContent: `${item.name} - ${item.cost}원`, value: item.id, disabled: item.quantity === 0 };
    frag.appendChild($("option", props));
  });

  $productSelect.appendChild(frag);
};

/**
 * [Render] 총액 및 할인율 랜더 함수
 * 장바구니에 포함된 상품의 총액 및 할인율을 계산하여 랜더링
 *
 * - 장바구니에 포함된 상품의 수량, 소계, 개별 대량 구매 할인율을 계산
 * - 총 상품 갯수에 의한 할인율 계산
 *   - 개별 할인 총액보다, 총 갯수 할인이 클 경우만 적용
 * - 매월 2일 총액에서 추가할인 계산
 *
 * @see PRODUCT_LIST - 상품 정보 배열
 * @see BULK_DISCOUNT_LIMIT - 개별 할인 적용 수량 기준
 * @see TOTAL_BULK_DISCOUNT_LIMIT - 전체 할인 적용 수량 기준
 * @see TOTAL_BULK_DISCOUNT_RATE - 전체 할인 적용 할인율
 * @see MONTHLY_SPECIAL_DAY - 특별 추가 할인 날짜 기준
 * @see MONTHLY_SPECIAL_DISCOUNT_RATE - 특별 추가 할인 날짜 기준 할인율
 *
 * @fires renderStockInfo
 * @fires renderBonusPoints
 */
const renderCalculateCart = () => {
  totalCost = 0;
  itemCount = 0;

  const cartItems = $cartItems.children;
  let subTotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    // 장바구니 상품만 확인하여 전체 수량 및 소계, 할인된 총계 계산
    const currentItem = PRODUCT_LIST.find((item) => item.id === cartItems[i].id);
    if (!currentItem) continue;

    const quantity = parseInt(cartItems[i].querySelector("span").textContent.split("x ")[1]);
    const itemTotal = currentItem.cost * quantity;
    const discount = quantity >= BULK_DISCOUNT_LIMIT && !!currentItem.discount ? currentItem.discount : 0;

    itemCount += quantity;
    subTotal += itemTotal;
    totalCost += itemTotal * (1 - discount);
  }

  // 전체 수량 기준 할인율 계산
  let discountRate = 0;
  if (itemCount >= TOTAL_BULK_DISCOUNT_LIMIT) {
    const bulkDiscount = totalCost * TOTAL_BULK_DISCOUNT_RATE;
    const itemDiscount = subTotal - totalCost;
    if (bulkDiscount > itemDiscount) {
      totalCost = subTotal * (1 - TOTAL_BULK_DISCOUNT_RATE);
      discountRate = TOTAL_BULK_DISCOUNT_RATE;
    } else {
      discountRate = (subTotal - totalCost) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalCost) / subTotal;
  }

  // 매월 2일 특별 할인?
  if (new Date().getDay() === MONTHLY_SPECIAL_DAY) {
    totalCost *= 1 - MONTHLY_SPECIAL_DISCOUNT_RATE;
    discountRate = Math.max(discountRate, MONTHLY_SPECIAL_DISCOUNT_RATE);
  }

  // 총액 및 할인 랜더링
  $cartTotal.textContent = "총액: " + Math.round(totalCost) + "원";
  if (discountRate > 0) {
    const textContent = "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
    const props = { className: "text-green-500 ml-2", textContent };
    $cartTotal.appendChild($("span", props));
  }
  renderStockInfo();
  renderBonusPoints();
};

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
  const selectedItemId = $productSelect.value;
  const itemToAdd = PRODUCT_LIST.find((p) => p.id === selectedItemId);

  if (!itemToAdd || itemToAdd.quantity <= 0) return;

  const currentItem = $("#" + itemToAdd.id);
  if (currentItem) {
    // 이미 있는 상품
    const newQuantity = parseInt(currentItem.querySelector("span").textContent.split("x ")[1]) + 1;
    if (newQuantity <= itemToAdd.quantity) {
      currentItem.querySelector("span").textContent = itemToAdd.name + " - " + itemToAdd.cost + "원 x " + newQuantity;
      itemToAdd.quantity -= 1;
    } else {
      alert(STOCK_ALERT_TEXT);
    }
  } else {
    // 장바구니에 새 상품 추가
    const { id, name, cost } = itemToAdd;
    $cartItems.appendChild(
      $(
        "div",
        { id, className: "flex justify-between items-center mb-2" },
        $("span", { textContent: name + " - " + cost + "원 x 1" }),
        $(
          "div",
          {},
          $("button", { className: "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1", dataset: { productId: id, change: -1 }, textContent: "-" }),
          $("button", { className: "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1", dataset: { productId: id, change: 1 }, textContent: "+" }),
          $("button", { className: "remove-item bg-red-500 text-white px-2 py-1 rounded", dataset: { productId: id }, textContent: "삭제" })
        )
      )
    );
    itemToAdd.quantity -= 1;
  }
  renderCalculateCart();
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
 * @fires renderCalculateCart
 */
const handleClickCartItems = (event) => {
  // 수량 변경, 상품 삭제 이벤트 처리
  const target = event.target;
  const isQuantityChange = target.classList.contains("quantity-change");
  const isRemoveItem = target.classList.contains("remove-item");
  if (!isQuantityChange && !isRemoveItem) return;

  const productId = target.dataset.productId;
  const $item = $("#" + productId);
  const product = PRODUCT_LIST.find((p) => p.id === productId);

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

  renderCalculateCart();
};

/**
 * 랜덤 할인 세팅 함수
 *
 * - 랜덤한 시간마다 번개 할인
 * - 랜덤한 시간마다 마지막에 선택하지 않은 상품 5% 추가 할인
 *   * TODO: 이미 담겨있는 상품이 할인되는 상황 예외처리
 *
 * @see PRODUCT_LIST - 상품 정보 배열
 * @fires renderSelectOptions
 */
const setRandomDiscount = () => {
  setTimeout(() => {
    setInterval(() => {
      const luckyItem = PRODUCT_LIST[Math.floor(Math.random() * PRODUCT_LIST.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.cost = Math.round(luckyItem.cost * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        renderSelectOptions();
      }
    }, 30_000);
  }, Math.random() * 10_000);

  setTimeout(() => {
    setInterval(() => {
      if (!lastSelected) return;
      const suggest = PRODUCT_LIST.find((item) => item.id !== lastSelected && item.quantity > 0);
      if (!suggest) return;
      alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
      suggest.cost = Math.round(suggest.cost * 0.95);
      renderSelectOptions();
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
 * @fires renderSelectOptions
 * @fires renderCalculateCart
 * @fires setRandomDiscount
 */
const main = () => {
  // UI 앨리먼트 생성 및 속성 설정 커스텀 $ 함수 사용

  // global element
  $cartItems = $("div", { id: "cart-items" });
  $cartTotal = $("div", { id: "cart-total", className: "text-xl font-bold my-4" });
  $productSelect = $("select", { id: "product-select", className: "border rounded p-2 mr-2" });
  $addToCart = $("button", { id: "add-to-cart", className: "bg-blue-500 text-white px-4 py-2 rounded", textContent: "추가" });
  $stockStatus = $("div", { id: "stock-status", className: "text-sm text-gray-500 mt-2" });

  renderSelectOptions();

  // $app 컴포넌트 조립
  $("#app").appendChild(
    $(
      "div",
      { className: "bg-gray-100 p-8" }, // container props
      $(
        "div",
        { className: "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8" }, // wrapper props
        $("h1", { className: "text-2xl font-bold mb-4", textContent: "장바구니" }),
        $cartItems,
        $cartTotal,
        $productSelect,
        $addToCart,
        $stockStatus
      )
    )
  );

  // 초기 세팅 함수
  renderCalculateCart();
  setRandomDiscount();
};

main();
$addToCart.addEventListener("click", handleClickAddToCart);
$cartItems.addEventListener("click", handleClickCartItems);
