import { state, renderSelOpts } from "./main.basic";
import { DISCOUNT_RATIO } from "./fixture";

function handleThunderDiscount() {
  const luckyItem =
    state.stock[
      "p" +
        (
          Math.floor(Math.random() * Object.keys(state.stock).length) + 1
        ).toString()
    ];
  if (Math.random() < 0.3 && luckyItem.quantity > 0) {
    luckyItem.price = Math.round(
      luckyItem.price * (1 - DISCOUNT_RATIO.THUNDER)
    );
    alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
    renderSelOpts();
  }
}

export function beginThunderDiscount() {
  setTimeout(function () {
    setInterval(handleThunderDiscount, 30000);
  }, Math.random() * 10000);
}

function handleAdditionalDiscount() {
  if (state.lastSelectedProduct) {
    const suggest = Object.entries(state.stock)
      .map(([prodId, prodInfo]) => {
        return { id: prodId, ...prodInfo };
      })
      .find(function (item) {
        return item.id !== state.lastSelectedProduct && item.quantity > 0;
      });
    if (suggest) {
      alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
      suggest.price = Math.round(
        suggest.price * (1 - DISCOUNT_RATIO.ADDITIONAL)
      );
      renderSelOpts();
    }
  }
}

export function beginAdditionalDiscount() {
  setTimeout(function () {
    setInterval(handleAdditionalDiscount, 60000);
  }, Math.random() * 20000);
}
