import { TIMER_NUMBER, SALE_NUMBER, RANDOM_NUMBER } from '../constant/randomNumber';
import { globalStore } from '../store/globalStore';

let timer = null;
const { prodList } = globalStore.getState();

const flashSaleInterval = () => {
  const randomIndex = Math.floor(Math.random() * prodList.length);
  const flashSaleItem = prodList[randomIndex];

  if (RANDOM_NUMBER && flashSaleItem.quantity > 0) {
    flashSaleItem.price = Math.round(flashSaleItem.price * SALE_NUMBER.FLASH);
    alert(`번개세일! ${flashSaleItem.name} 이(가) 20% 할인 중입니다!`);
  }
};

export const flashSaleItemAlert = () => {
  if (!timer) {
    setTimeout(() => {
      timer = setInterval(flashSaleInterval, TIMER_NUMBER.FLASH_INTERVAL);
    }, TIMER_NUMBER.FLASH_TIME);
  } else {
    clearInterval(timer);
  }
};
