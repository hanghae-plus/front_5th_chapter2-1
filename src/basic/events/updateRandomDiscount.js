import { products } from "../consts/products";

// 랜덤 할인 이벤트 설정
export const updateRandomDiscount = () => {
  setTimeout(function () {
    setInterval(function () {
      var luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);
};
