const DISCOUNT_RATE = 0.2;
const DISCOUNT_CHANCE = 0.3;
const INTERVAL_MS = 30000;

export const luckySaleAlert = (productList, callback) => {
  setTimeout(() => {
    setInterval(() => {
      let luckyItem =
        productList[Math.floor(Math.random() * productList.length)];
      if (Math.random() < DISCOUNT_CHANCE && luckyItem.stock > 0) {
        luckyItem.val = Math.round(luckyItem.val * (1 - DISCOUNT_RATE));
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        callback();
      }
    }, INTERVAL_MS);
  }, Math.random() * 10000);
};

export const recommendOtherProduct = (
  productList,
  getLastSelectedId,
  updateSelOpts
) => {
  setTimeout(() => {
    setInterval(() => {
      const lastSel = getLastSelectedId();
      if (!lastSel) return;

      const suggest = productList.find(
        (item) => item.id !== lastSel && item.stock > 0
      );

      if (suggest) {
        alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
        suggest.val = Math.round(suggest.val * 0.95);
        updateSelOpts();
      }
    }, 60000);
  }, Math.random() * 20000);
};
