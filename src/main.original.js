import { additionalSale, flashSale } from "./utils/intervalAlerts";

// 전역 변수 선언
let $cartBox;
let $totalPrice;
let $select;
let $addBtn;
let $stockStatus;

// 마지막 선택한 상품 id
let lastSelectedProductId;

// 상품 목록
const productList = [
  { id: "p1", name: "상품1", val: 10000, quantity: 50 },
  { id: "p2", name: "상품2", val: 20000, quantity: 30 },
  { id: "p3", name: "상품3", val: 30000, quantity: 20 },
  { id: "p4", name: "상품4", val: 15000, quantity: 0 },
  { id: "p5", name: "상품5", val: 25000, quantity: 10 },
];

function initCreateElements() {
  $cartBox = document.createElement("div");
  $totalPrice = document.createElement("div");
  $select = document.createElement("select");
  $addBtn = document.createElement("button");
  $stockStatus = document.createElement("div");
}

function initSetElementProperties() {
  $cartBox.id = "cart-items";
  $totalPrice.id = "cart-total";
  $select.id = "product-select";
  $addBtn.id = "add-to-cart";
  $stockStatus.id = "stock-status";
  $totalPrice.className = "text-xl font-bold my-4";
  $select.className = "border rounded p-2 mr-2";
  $addBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  $stockStatus.className = "text-sm text-gray-500 mt-2";
  $addBtn.textContent = "추가";
}

// 상품 선택 옵션 초기화화
function initSelectOpts() {
  $select.innerHTML = "";
  productList.forEach((item) => {
    const $opt = document.createElement("option");
    $opt.value = item.id;
    $opt.textContent = item.name + " - " + item.val + "원";
    if (item.quantity === 0) $opt.disabled = true;
    $select.appendChild($opt);
  });
}

function initElementsAndProperties() {
  initCreateElements();
  initSetElementProperties();
  initSelectOpts();
}

// element 생성
function createElementsAndReturn(elements) {
  const $elements = elements.map((element) => document.createElement(element));
  return $elements;
}

// element에 id className 설정
function setElementProperties($container, $wrap, $h1) {
  $container.className = "bg-gray-100 p-8";
  $wrap.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  $h1.className = "text-2xl font-bold mb-4";
  $h1.textContent = "장바구니";
}

// appendChild 추가
function appendChildElements($container, $wrap, $h1) {
  const $root = document.getElementById("app");

  $wrap.appendChild($h1);
  $wrap.appendChild($cartBox);
  $wrap.appendChild($totalPrice);
  $wrap.appendChild($select);
  $wrap.appendChild($addBtn);
  $wrap.appendChild($stockStatus);
  $container.appendChild($wrap);
  $root.appendChild($container);
}

function main() {
  // 전역 element 생성 및 properties 주입
  initElementsAndProperties();

  // 추가 요소 생성
  const elements = ["div", "div", "h1"];
  const [$container, $wrap, $h1] = createElementsAndReturn(elements);
  setElementProperties($container, $wrap, $h1);
  appendChildElements($container, $wrap, $h1);

  // 이벤트 리스너 초기화
  initEventListeners();

  // 장바구니 계산
  calcCart();

  // 번개세일 알림
  flashSale(productList);

  // 추가 할인 알림
  additionalSale(lastSelectedProductId, productList);
}

// 보너스 포인트 렌더링
function renderBonusPts(totalPrice) {
  const bonusPts = Math.floor(totalPrice / 1000);
  var ptsTag = document.getElementById("loyalty-points");
  if (!ptsTag) {
    ptsTag = document.createElement("span");
    ptsTag.id = "loyalty-points";
    ptsTag.className = "text-blue-500 ml-2";
    $totalPrice.appendChild(ptsTag);
  }
  ptsTag.textContent = "(포인트: " + bonusPts + ")";
}

// 재고 상태 업데이트
function updateStockStatus() {
  var infoMsg = "";
  productList.forEach((item) => {
    if (item.quantity < 5) {
      infoMsg +=
        item.name +
        ": " +
        (item.quantity > 0
          ? "재고 부족 (" + item.quantity + "개 남음)"
          : "품절") +
        "\n";
    }
  });
  $stockStatus.textContent = infoMsg;
}

// main 함수 호출
main();

// 버튼 클릭 이벤트 처리.
// 추가 버튼 이벤트
function initEventListeners() {
  $addBtn.addEventListener("click", () => {
    const selectedProductId = $select.value;
    const targetProduct = productList.find(
      (product) => product.id === selectedProductId
    );
    if (!targetProduct || targetProduct.quantity < 1) return;

    const $product = document.getElementById(targetProduct.id);
    if ($product) {
      addProductToCart($product, targetProduct);
    } else {
      addNewProductToCart(targetProduct);
    }

    calcCart();
    lastSelectedProductId = selectedProductId;
  });

  // cartBox 이벤트 리스너 - 수량 변경과 삭제를 하나로 통합
  $cartBox.addEventListener("click", (event) => {
    const $target = event.target;

    // 수량 변경 또는 삭제 버튼이 아닌 경우 무시
    if (
      !$target.classList.contains("quantity-change") &&
      !$target.classList.contains("remove-item")
    ) {
      return;
    }

    const productId = $target.dataset.productId;
    const $product = document.getElementById(productId);
    const product = productList.find((p) => p.id === productId);

    if ($target.classList.contains("quantity-change")) {
      // 수량 변경 처리
      const changeAmount = parseInt($target.dataset.change);
      const currentQuantity = parseInt(
        $product.querySelector("span").textContent.split("x ")[1]
      );
      const newQuantity = currentQuantity + changeAmount;

      if (
        newQuantity > 0 &&
        newQuantity <= product.quantity + currentQuantity
      ) {
        $product.querySelector("span").textContent =
          product.name + " - " + product.val + "원 x " + newQuantity;
        product.quantity -= changeAmount;
      } else if (newQuantity <= 0) {
        $product.remove();
        product.quantity -= changeAmount;
      } else {
        alert("재고가 부족합니다.");
      }
    } else if ($target.classList.contains("remove-item")) {
      // 삭제 처리
      const remainQuantity = parseInt(
        $product.querySelector("span").textContent.split("x ")[1]
      );
      product.quantity += remainQuantity;
      $product.remove();
    }

    calcCart();
  });

  // 장바구니 삭제 버튼 클릭 이벤트 처리
  $cartBox.addEventListener("click", (event) => {
    const $target = event.target;
    const hasRemoveItemClass = $target.classList.contains("remove-item");
    if (!hasRemoveItemClass) return;

    const { $product, product } = getProductElementAndProduct($target);

    if (!$product || !product) return;
    const remainQuantity = parseInt(
      $product.querySelector("span").textContent.split("x ")[1]
    );
    product.quantity += remainQuantity;
    $product.remove();

    calcCart();
  });
}

// dataset id 요소 get
function getProductElementAndProduct($element) {
  if (!$element) return;

  const productId = $element.dataset.productId;
  const $product = document.getElementById(productId);
  const product = productList.find((product) => product.id === productId);
  return { $product, product };
}

function createProductElement(product) {
  const $product = document.createElement("div");
  $product.id = product.id;
  $product.className = "flex justify-between items-center mb-2";
  $product.innerHTML =
    "<span>" +
    product.name +
    " - " +
    product.val +
    "원 x 1</span><div>" +
    '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
    product.id +
    '" data-change="-1">-</button>' +
    '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
    product.id +
    '" data-change="1">+</button>' +
    '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
    product.id +
    '">삭제</button></div>';
  return $product;
}

// product 요소 생성하고 장바구니에 넣기
function addNewProductToCart(product) {
  const $newProduct = createProductElement(product);
  $cartBox.appendChild($newProduct);
  product.quantity--;
}

// 수량 확인하고
function addProductToCart($product, product) {
  const newQuantity =
    parseInt($product.querySelector("span").textContent.split("x ")[1]) + 1;
  if (newQuantity <= product.quantity) {
    $product.querySelector("span").textContent =
      product.name + " - " + product.val + "원 x " + newQuantity;
    product.quantity--;
  } else {
    alert("재고가 부족합니다.");
  }
}

// 장바구니 계산
function calcCart() {
  const { totalPrice, totalQuantity, sumPrice } = calcQuantityAndPrice();

  // 총 할인 계산
  let discRate = 0;
  discRate = getBulkDiscountRate(totalQuantity, totalPrice, sumPrice);

  $totalPrice.textContent = "총액: " + Math.round(totalPrice) + "원";
  appendDiscountRate(discRate);

  // 재고 상태 업데이트
  updateStockStatus();

  // 보너스 포인트 렌더링
  renderBonusPts(totalPrice);
}

function getDiscountRate(productId) {
  let discount = 0;
  if (productId === "p1") discount = 0.1;
  else if (productId === "p2") discount = 0.15;
  else if (productId === "p3") discount = 0.2;
  else if (productId === "p4") discount = 0.05;
  else if (productId === "p5") discount = 0.25;

  return discount;
}

function getBulkDiscountRate(totalQuantity, totalPrice, sumPrice) {
  let discRate = 0;
  if (totalQuantity === 0 || totalPrice === 0 || sumPrice === 0)
    return discRate;

  // 수량으로 먼저 계산하고
  if (totalQuantity >= 30) {
    const bulkDisc = totalPrice * 0.25;
    const itemDisc = sumPrice - totalPrice;
    if (bulkDisc > itemDisc) {
      totalPrice = sumPrice * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (sumPrice - totalPrice) / sumPrice;
    }
  } else {
    discRate = (sumPrice - totalPrice) / sumPrice;
  }

  // 날짜 할인 걸리면 둘중 큰 할인으로 적용
  if (new Date().getDay() === 2) {
    totalPrice *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }

  return discRate;
}

function appendDiscountRate(discRate) {
  if (discRate > 0) {
    var span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
    $totalPrice.appendChild(span);
  }
}

function calcQuantityAndPrice() {
  let totalPrice = 0;
  let totalQuantity = 0;
  let sumPrice = 0;

  const $cartItems = $cartBox.children;
  for (const $cartItem of $cartItems) {
    const cartProductId = $cartItem.id;
    const product = productList.find((product) => product.id === cartProductId);

    // 현재 수량 계산
    const currentQuantity = parseInt(
      $cartItem.querySelector("span").textContent.split("x ")[1]
    );
    totalQuantity += currentQuantity;

    // product별 가격 계산
    const sumProductPrice = product.val * currentQuantity;
    sumPrice += sumProductPrice;

    // product별 할인 계산
    let discount = 0;
    if (currentQuantity >= 10) {
      discount = getDiscountRate(cartProductId);
    }

    // 할인 적용 가격 계산
    totalPrice += sumProductPrice * (1 - discount);
  }

  return { totalPrice, totalQuantity, sumPrice };
}
