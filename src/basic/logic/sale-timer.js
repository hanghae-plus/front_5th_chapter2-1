import { SALE_CONFIG } from "../config/sale-config";
import { products } from "../data/products";
import { renderProductOptions } from "../ui/render-product-options";

/** 상품 선택 옵션을 새로 렌더링하는 함수 */
function updateSelectOptions() {
  const select = document.getElementById("product-select");
  select.innerHTML = renderProductOptions();
}

/**
 * 일정 시간 후 일정 간격으로 번개 세일 20% 할인을 시작하는 타이머 함수
 */

const startLuckySaleTimer = () => {
  setTimeout(function () {
    setInterval(function () {
      const luckyItem = products[Math.floor(Math.random() * products.length)];

      if (Math.random() < SALE_CONFIG.LUCKY_SALE_PROBABILITY && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * SALE_CONFIG.LUCKY_SALE_DISCOUNT);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");

        updateSelectOptions();
      }
    }, SALE_CONFIG.LUCKY_SALE_INTERVAL);
  }, SALE_CONFIG.LUCKY_SALE_DELAY);
};

/**
 * 최근 선택된 상품을 기반으로 추천 상품에 5% 할인을 적용하는 타이머 함수
 */
const startLastSaleTimer = (getLastSale) => {
  setTimeout(function () {
    setInterval(function () {
      const lastSale = getLastSale();
      if (lastSale) {
        const suggest = products.find((item) => item.id !== lastSel && item.q > 0);

        if (suggest) {
          alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
          suggest.val = Math.round(suggest.val * SALE_CONFIG.LAST_SALE_DISCOUNT);

          updateSelectOptions();
        }
      }
    }, SALE_CONFIG.LAST_SALE_INTERVAL);
  }, SALE_CONFIG.LAST_SALE_DELAY);
};

export { startLastSaleTimer, startLuckySaleTimer };
