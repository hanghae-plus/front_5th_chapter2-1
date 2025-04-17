const FLASH_SALE_TIME = 30000;
const RECOMMENDATION_SALE_TIME = 60000;

export function scheduleFlashSale({ onSale }) {
  const delay = Math.random() * 10000;
  const callback = () => flashSaleToRandomProduct(onSale);

  setTimeout(() => setInterval(callback, FLASH_SALE_TIME), delay);
}

export function scheduleRecommendationSale({ productId, onSale }) {
  const delay = Math.random() * 20000;
  const callback = () => suggestProductDiscount(productId, onSale);

  setTimeout(() => setInterval(callback, RECOMMENDATION_SALE_TIME), delay);
}

function flashSaleToRandomProduct(onSale) {
  const luckyItem = getRandomProduct();

  if (Math.random() < 0.3 && luckyItem.units > 0) {
    luckyItem.price = Math.round(luckyItem.price * 0.8);

    alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
    onSale();
  }
}

function suggestProductDiscount(productId, onSale) {
  if (!productId) return;

  const suggestedItem = products.find(
    (item) => item.id !== productId && item.units > 0,
  );
  if (suggestedItem) {
    alert(
      `${suggestedItem.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`,
    );
    onSale();
  }
}

function getRandomProduct() {
  return products[Math.floor(Math.random() * products.length)];
}
