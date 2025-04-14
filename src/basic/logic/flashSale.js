import { PRODUCT_LIST } from '../consts';
import { updateProductSelectOptions } from '../render';

const getRandomProduct = () =>
  PRODUCT_LIST[Math.floor(Math.random() * PRODUCT_LIST.length)];

const isEligibleForFlashSale = (item) =>
  Math.random() < 0.3 && item.quantity > 0;

const applyFlashSaleDiscount = (item, rate = 0.2) => {
  item.value = Math.round(item.value * (1 - rate));
};

const notifyFlashSale = (item, rate = 0.2) => {
  const discountPercent = rate * 100;
  alert(`번개세일! ${item.name}이(가) ${discountPercent}% 할인 중입니다!`);
};

export const FlashSale = () => {
  const luckyItem = getRandomProduct();
  if (!isEligibleForFlashSale(luckyItem)) return;

  applyFlashSaleDiscount(luckyItem);
  notifyFlashSale(luckyItem);
  updateProductSelectOptions();
};
