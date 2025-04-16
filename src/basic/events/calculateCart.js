import {
  BULK_DISCOUNT_RATE,
  BULK_DISCOUNT_START,
  SPECIAL_DAY_DISCOUNT_DATE,
  SPECIAL_DAY_DISCOUNT_RATE,
} from "../consts/discounts";
import {
  calcPoints,
  handleAddItem,
  showSumText,
  updateStockInfo,
} from "../main.basic";

// 장바구니 계산
const calculateCart = () => {
  var cartDiv = document.getElementById("cart-items");
  var cartItems = cartDiv.children;
  var addItemResult = handleAddItem(cartItems);
  var noDiscountTotalPrice = addItemResult.noDiscountTotalPrice;
  var totalPrice = addItemResult.totalPrice;
  var totalEa = addItemResult.totalEa;

  let totalDiscountRate = 0; // 전체 할인율
  var discountedPrice = noDiscountTotalPrice - totalPrice; // (이미 적용된) 할인 가격
  // 전체 n개 이상 구매 시 할인율 계산
  if (totalEa >= BULK_DISCOUNT_START) {
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
  if (new Date().getDay() === SPECIAL_DAY_DISCOUNT_DATE) {
    totalPrice *= 1 - SPECIAL_DAY_DISCOUNT_RATE;
    totalDiscountRate = Math.max(totalDiscountRate, SPECIAL_DAY_DISCOUNT_RATE);
  }

  showSumText(totalPrice, totalDiscountRate);
  updateStockInfo();
  calcPoints(totalPrice);
};

export default calculateCart;
