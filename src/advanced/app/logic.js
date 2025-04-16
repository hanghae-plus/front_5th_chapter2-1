import { prodList } from "../store/prodList.js";
import { getLastSelValue } from "../store/lastSel.js";

function getRandomProduct() {
  return prodList[Math.floor(Math.random() * prodList.length)];
}

export function setSaleAlert() {
  const INTERVAL_TIME = 30000;

  setTimeout(() => {
    setInterval(() => {
      const luckyItem = getRandomProduct();
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        // updateSelectOptionsDom(); //selectOptions 을 수정하는 액션이 없으므로 없어도 될것으로 예상
      }
    }, INTERVAL_TIME);
  }, Math.random() * 10000);
}

export function setSuggestionAlert() {
  const INTERVAL_TIME = 60000;

  setTimeout(() => {
    setInterval(() => {
      const lastSel = getLastSelValue();

      if (!lastSel) {
        return;
      }

      const suggest = prodList.find(function (item) {
        return item.id !== lastSel && item.q > 0;
      });

      if (suggest) {
        alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
        suggest.val = Math.round(suggest.val * 0.95);
        // updateSelectOptionsDom(); //selectOptions 을 수정하는 액션이 없으므로 없어도 될것으로 예상
      }
    }, INTERVAL_TIME);
  }, Math.random() * 20000);
}
