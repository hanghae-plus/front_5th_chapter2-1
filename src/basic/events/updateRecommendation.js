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
            suggestProd.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          );
          suggestProd.price = Math.round(suggestProd.price * 0.95);
          updateSelectOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);

  return lastSelectedProduct;
};

export default updateRecommendation;
