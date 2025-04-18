import { Product, PRODUCTS } from "../constants";

// setTimeout 추가
function makeSetTimeout(func, delay) {
  return setTimeout(() => func, delay);
}

// setInterval 추가
function flashSale(productList: Product[]) {
  makeSetTimeout(
    setInterval(function () {
      const luckyItem =
        productList[Math.floor(Math.random() * productList.length)];
      if (Math.random() < 1 && luckyItem.quantity > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        // initSelectOpts();
      }
    }, 30000),
    Math.random() * 10000
  );
}

function additionalSale(lastSelectedProductId, productList: Product[]) {
  makeSetTimeout(
    setInterval(function () {
      if (lastSelectedProductId) {
        const suggest = productList.find(function (item) {
          return item.id !== lastSelectedProductId && item.q > 0;
        });
        if (suggest) {
          alert(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!"
          );
          suggest.val = Math.round(suggest.val * 0.95);
          // initSelectOpts();
        }
      }
    }, 60000),
    Math.random() * 20000
  );
}

function setAllSale(lastSelectedProductId) {
  flashSale(PRODUCTS);
  additionalSale(lastSelectedProductId, PRODUCTS);
}

export { setAllSale };
