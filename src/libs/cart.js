import {
  DAY,
  DISCOUNT_RATE,
  NUMBER_OF_BULK,
  NUMBER_OF_STOCK_SHORTAGES,
} from "../stores/constant";
import { productList } from "../stores/store";
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

// 장바구니 계산.
function calculateCart($discountedPrice, $cartBox, $stockStatus) {
  const {
    discountedPrice,
    totalQuantity: quantity,
    totalPrice: price,
  } = calcQuantityAndPrice($cartBox);

  // 총 할인 계산
  let discountRate = 0;
  discountRate = getBulkDiscountRate(quantity, discountedPrice, price);

  $discountedPrice.textContent = "총액: " + Math.round(discountedPrice) + "원";
  appendDiscountRate($discountedPrice, discountRate);

  // 재고 상태 업데이트
  updateStockStatus($stockStatus);

  // 보너스 포인트 렌더링
  renderBonusPts($discountedPrice, discountedPrice);
}

// 장바구니에 있는 모든 상품의 수량과 가격을 계산.
function calcQuantityAndPrice($cartBox) {
  let discountedPrice = 0;
  let totalQuantity = 0;
  let totalPrice = 0;

  const $cartItems = $cartBox.children;
  for (const $cartItem of $cartItems) {
    const cartProductId = $cartItem.id;
    const product = productList.find((product) => product.id === cartProductId);

    // 현재 수량 계산
    const currentQuantity = parseInt(
      $cartItem.querySelector("span").textContent.split("x ")[1]
    );

    if (currentQuantity > 0) {
      totalQuantity += currentQuantity;
    }

    // product별 가격 계산
    const sumProductPrice = product.val * currentQuantity;
    if (sumProductPrice > 0) {
      totalPrice += sumProductPrice;
    }

    // product별 할인 계산
    let discount = 0;
    if (currentQuantity >= 10) {
      discount = getDiscountRate(cartProductId);
    }

    // 할인 적용 가격 계산
    discountedPrice += sumProductPrice * (1 - discount);
  }

  return { discountedPrice, totalQuantity, totalPrice };
}

// bulk수량 & 화요일 할인율 계산.
function getBulkDiscountRate(quantity, discountedPrice, price) {
  let discountRate = 0;
  if (typeof quantity !== "number" || typeof discountedPrice !== "number") {
    return 0;
  }
  if (quantity === 0 || discountedPrice === 0 || price === 0) {
    return 0;
  }

  // 기본 할인율
  discountRate = calculateDiscountRate(discountedPrice, price);

  // bulk 수량인 경우 bulk 할인율 적용
  if (quantity >= NUMBER_OF_BULK) {
    discountRate = caculateBulkDiscountRate(quantity, discountedPrice, price);
  }

  // 특정요일 할인 check 후 할인율 적용
  discountRate = calculateDayDiscountRate(discountedPrice, discountRate);
  return discountRate;
}

function calculateDiscountRate(discountedPrice, price) {
  return (price - discountedPrice) / price;
}

function caculateBulkDiscountRate(quantity, discountedPrice, price) {
  let discountRate = 0;
  if (quantity >= NUMBER_OF_BULK) {
    const bulkDiscountedPrice = discountedPrice * DISCOUNT_RATE.BULK;
    const discount = price - discountedPrice;
    if (bulkDiscountedPrice > discount) {
      discountedPrice = price * (1 - DISCOUNT_RATE.BULK);
      discountRate = DISCOUNT_RATE.BULK;
    }
  }

  return discountRate;
}

function calculateDayDiscountRate(discountedPrice, discountRate) {
  let _discountRate = discountRate;
  if (new Date().getDay() === DAY.TUESDAY) {
    // 가격에 화요일 할인율 적용
    discountedPrice *= 1 - DISCOUNT_RATE.TUESDAY;

    // 화요일 할인율과 기존 할인율 중 큰 값으로 설정
    _discountRate = Math.max(discountRate, DISCOUNT_RATE.TUESDAY);
  }

  return _discountRate;
}

// 할인율 span으로 추가
function appendDiscountRate($discountedPrice, discountRate) {
  if (discountRate > 0) {
    var span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
    $discountedPrice.appendChild(span);
  }
}

// 재고 상태 업데이트
function updateStockStatus($stockStatus) {
  var infoMsg = "";
  productList.forEach((item) => {
    if (item.quantity < NUMBER_OF_STOCK_SHORTAGES) {
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
function renderBonusPts($discountedPrice, discountedPrice) {
  const bonusPts = Math.floor(discountedPrice / 1000);
  var ptsTag = document.getElementById("loyalty-points");
  if (!ptsTag) {
    ptsTag = document.createElement("span");
    ptsTag.id = "loyalty-points";
    ptsTag.className = "text-blue-500 ml-2";
    $discountedPrice.appendChild(ptsTag);
  }
  ptsTag.textContent = "(포인트: " + bonusPts + ")";
}

function getDiscountRate(productId) {
  return DISCOUNT_RATE[productId] || 0;
}

export { calculateCart, addNewProductToCart, addProductToCart };
