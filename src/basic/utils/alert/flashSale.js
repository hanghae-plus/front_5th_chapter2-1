import { FLASH_SALE } from '../../consts';

export const alertFlashSale = (item, rate = FLASH_SALE.DISCOUNT_RATE) => {
  const discountPercent = rate * 100;
  alert(`번개세일! ${item.name}이(가) ${discountPercent}% 할인 중입니다!`);
};
