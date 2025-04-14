import { PRODUCT_LIST } from '../consts';
import { updateProductSelectOptions } from '../render';

export const 번개세일 = () => {
  const luckyItem =
    PRODUCT_LIST[Math.floor(Math.random() * PRODUCT_LIST.length)];

  if (Math.random() < 0.3 && luckyItem.quantity > 0) {
    luckyItem.value = Math.round(luckyItem.value * 0.8);
    alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
    updateProductSelectOptions();
  }
};
