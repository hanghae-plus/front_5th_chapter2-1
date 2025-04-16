import {
  RECOMMENDATION_DISCOUNT_RATE,
  RECOMMENDATION_DISCOUNT_TIME,
} from "../consts/discounts";
import products from "../consts/products";

// 추천 상품 이벤트 설정
const updateRecommendation = () => {
  var lastSelectedProduct;

  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedProduct) {
        var suggestProd = products.find(function (item) {
          return item.id !== lastSelectedProduct && item.stock > 0;
        });
        if (suggestProd) {
          alert(
            `${suggestProd.name} 은(는) 어떠세요? 지금 구매하시면 ${RECOMMENDATION_DISCOUNT_RATE * 100}% 추가 할인!`,
          );
          suggestProd.price = Math.round(
            suggestProd.price * (1 - RECOMMENDATION_DISCOUNT_RATE),
          );
          updateSelectOptions();
        }
      }
    }, RECOMMENDATION_DISCOUNT_TIME);
  }, Math.random() * 20000);

  return lastSelectedProduct;
};

export default updateRecommendation;
