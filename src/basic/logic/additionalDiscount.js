import { PRODUCT_LIST } from '../consts';
import { SelectedProductStore } from '../store';
import { updateProductSelectOptions } from '../render';

const getSuggestedProduct = (lastId) =>
  PRODUCT_LIST.find((item) => item.id !== lastId && item.quantity > 0);

const applyAdditionalDiscount = (item, rate = 0.05) => {
  item.value = Math.round(item.value * (1 - rate));
};

const notifySuggestedProduct = (item) => {
  alert(`${item.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
};

export const AdditionalDiscount = () => {
  const lastId = SelectedProductStore.get('selectedProduct');
  if (!lastId) return;

  const suggest = getSuggestedProduct(lastId);
  if (!suggest) return;

  notifySuggestedProduct(suggest);
  applyAdditionalDiscount(suggest);
  updateProductSelectOptions();
};
