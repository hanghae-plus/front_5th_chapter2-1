import { productList } from "../stores";
import { createProductElement } from "../utils/function";

// product 요소 생성하고 장바구니에 넣기
function addNewProductToCart($cartBox, product) {
  if (!$cartBox) return;

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
function calculateCart($totalPrice, $cartBox, $stockStatus) {
  const { totalPrice, totalQuantity, sumPrice } =
    calcQuantityAndPrice($cartBox);

  // 총 할인 계산
  let discRate = 0;
  discRate = getBulkDiscountRate(totalQuantity, totalPrice, sumPrice);

  $totalPrice.textContent = "총액: " + Math.round(totalPrice) + "원";
  appendDiscountRate($totalPrice, discRate);

  // 재고 상태 업데이트
  updateStockStatus($stockStatus);

  // 보너스 포인트 렌더링
  renderBonusPts($totalPrice, totalPrice);
}

// 장바구니에 있는 모든 상품의 수량과 가격을 계산
function calcQuantityAndPrice($cartBox) {
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

// bulk수량 & 화요일 할인율 계산
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

// 할인율 span으로 추가
function appendDiscountRate($totalPrice, discRate) {
  if (discRate > 0) {
    var span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
    $totalPrice.appendChild(span);
  }
}

// 재고 상태 업데이트
function updateStockStatus($stockStatus) {
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

// 보너스 포인트 렌더링
function renderBonusPts($totalPrice, totalPrice) {
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

function getDiscountRate(productId) {
  let discount = 0;
  if (productId === "p1") discount = 0.1;
  else if (productId === "p2") discount = 0.15;
  else if (productId === "p3") discount = 0.2;
  else if (productId === "p4") discount = 0.05;
  else if (productId === "p5") discount = 0.25;

  return discount;
}

export { calculateCart, addNewProductToCart, addProductToCart };
