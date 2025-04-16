import { FLASH_SALE, PRODUCT_LIST } from '../../consts';
import { renderProductSelect } from '../../render';
import { calculateDiscountedPrice, alertFlashSale } from '../../utils';

const getRandomProduct = (productList) =>
  productList[Math.floor(Math.random() * productList.length)];

const isEligibleForFlashSale = (item) =>
  Math.random() < 0.3 && item.quantity > 0;

const applyFlashSaleDiscount = (item, rate = FLASH_SALE.DISCOUNT_RATE) => {
  item.value = calculateDiscountedPrice(item.value, rate);
};

export const flashSale = () => {
  const luckyItem = getRandomProduct(PRODUCT_LIST);
  if (!isEligibleForFlashSale(luckyItem)) return;

  applyFlashSaleDiscount(luckyItem);
  alertFlashSale(luckyItem);
  renderProductSelect();
};
