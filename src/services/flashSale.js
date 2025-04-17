//번개세일
export function flashSale(ctx) {
  const { productList, updateSelOpts } = ctx;

  setTimeout(function () {
    setInterval(function () {
      const luckyItem =
        productList[Math.floor(Math.random() * productList.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        updateSelOpts(ctx);
      }
    }, 30000);
  }, Math.random() * 10000);
}
