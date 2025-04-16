import {
  calcPoints,
  handleAddItem,
  showSumText,
  updateStockInfo,
} from "../main.basic";

// 장바구니 계산
const calcCart = () => {
  var cartDiv = document.getElementById("cart-items");
  var cartItems = cartDiv.children;
  var addItemResult = handleAddItem(cartItems);
  var noDiscountTotalPrice = addItemResult.noDiscountTotalPrice;
  var totalPrice = addItemResult.totalPrice;
  var totalEa = addItemResult.totalEa;

  let totalDiscountRate = 0; // 전체 할인율
  var discountedPrice = noDiscountTotalPrice - totalPrice; // (이미 적용된) 할인 가격
  // 전체 30개 이상 구매 시 할인율 계산
  if (totalEa >= 30) {
    const BULK_DISCOUNT_RATE = 0.25;
    var bulkDiscountedPrice = totalPrice * BULK_DISCOUNT_RATE;

    if (bulkDiscountedPrice > discountedPrice) {
      totalPrice = noDiscountTotalPrice * (1 - BULK_DISCOUNT_RATE);
      totalDiscountRate = BULK_DISCOUNT_RATE;
    } else {
      totalDiscountRate = discountedPrice / noDiscountTotalPrice;
    }
  } else {
    totalDiscountRate = discountedPrice / noDiscountTotalPrice;
  }

  // 화요일 할인율 계산
  if (new Date().getDay() === 2) {
    const TUESDAY_DISCOUNT_RATE = 0.1;
    totalPrice *= 1 - TUESDAY_DISCOUNT_RATE;
    totalDiscountRate = Math.max(totalDiscountRate, TUESDAY_DISCOUNT_RATE);
  }

  showSumText(totalPrice, totalDiscountRate);
  updateStockInfo();
  calcPoints(totalPrice);
};

export default calcCart;
