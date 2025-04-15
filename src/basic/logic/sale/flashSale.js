import { FLASH_SALE, PRODUCT_LIST } from '../../consts';
import { renderProductSelect } from '../../render';

const getRandomProduct = () =>
  PRODUCT_LIST[Math.floor(Math.random() * PRODUCT_LIST.length)];

const isEligibleForFlashSale = (item) =>
  Math.random() < 0.3 && item.quantity > 0;

const applyFlashSaleDiscount = (item, rate = FLASH_SALE.DISCOUNT_RATE) => {
  item.value = Math.round(item.value * (1 - rate));
};

const notifyFlashSale = (item, rate = FLASH_SALE.DISCOUNT_RATE) => {
  const discountPercent = rate * 100;
  alert(`번개세일! ${item.name}이(가) ${discountPercent}% 할인 중입니다!`);
};

export const flashSale = () => {
  const luckyItem = getRandomProduct();
  if (!isEligibleForFlashSale(luckyItem)) return;

  applyFlashSaleDiscount(luckyItem);
  notifyFlashSale(luckyItem);
  renderProductSelect();
};
