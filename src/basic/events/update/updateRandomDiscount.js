import {
  LUCKY_ITEM_DISCOUNT_RATE,
  LUCKY_ITEM_DISCOUNT_TIME,
} from "../../consts/discounts";
import products from "../../consts/products";
import { updateSelectOptions } from "../../main.basic";

// 랜덤 할인 이벤트 설정
const updateRandomDiscount = () => {
  setTimeout(function () {
    setInterval(function () {
      var luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(
          luckyItem.price * (1 - LUCKY_ITEM_DISCOUNT_RATE),
        );
        alert(
          `번개세일! ${luckyItem.name} 이(가) ${LUCKY_ITEM_DISCOUNT_RATE * 100}% 할인 중입니다!`,
        );
        updateSelectOptions();
      }
    }, LUCKY_ITEM_DISCOUNT_TIME);
  }, Math.random() * 10000);
};

export default updateRandomDiscount;
