import {
  calcPoints,
  handleAddItem,
  showSumText,
  updateStockInfo,
} from "../../main.basic";
import calculateBulkDiscount from "./calculateBulkDiscount";
import calculateSpecialDiscount from "./calculateSpecialDiscount";

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

  ({ totalPrice, totalDiscountRate } = calculateBulkDiscount(
    totalEa,
    totalPrice,
    discountedPrice,
    totalDiscountRate,
    noDiscountTotalPrice,
  ));

  ({ totalPrice, totalDiscountRate } = calculateSpecialDiscount(
    totalPrice,
    totalDiscountRate,
  ));

  showSumText(totalPrice, totalDiscountRate);
  updateStockInfo();
  calcPoints(totalPrice);
};

export default calculateCart;
