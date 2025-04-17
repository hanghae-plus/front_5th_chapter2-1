import { TIMER_NUMBER, SALE_NUMBER } from '../constant/randomNumber';
import { globalStore } from '../store/globalStore';

let timer = null;

const suggestInterval = () => {
  const { prodList, lastSelectedItemId } = globalStore.getState();

  const selectedProdId = lastSelectedItemId;

  if (selectedProdId) {
    const suggestItem = prodList.find((item) => item.id !== selectedProdId && item.quantity > 0);
    if (suggestItem) {
      alert(`${suggestItem.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
      suggestItem.price = Math.round(suggestItem.price * SALE_NUMBER.SUGGEST);
    }
  }
};

export const suggestItemAlert = () => {
  if (!timer) {
    setTimeout(() => {
      timer = setInterval(suggestInterval, TIMER_NUMBER.SUGGEST_INTERVAL);
    }, TIMER_NUMBER.SUGGEST_TIME);
  } else {
    clearInterval(timer);
  }
};
