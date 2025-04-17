import { ADDITIONAL_DISCOUNT, PRODUCT_LIST } from '../../consts';
import { SelectedProductStore } from '../../store';
import { renderProductSelect } from '../../render';
import { alertSuggestedProduct } from '../../utils';

const getSuggestedProduct = (lastId) =>
  PRODUCT_LIST.find((item) => item.id !== lastId && item.quantity > 0);

const applyAdditionalDiscount = (item, rate = ADDITIONAL_DISCOUNT.RATE) => {
  item.value = Math.round(item.value * (1 - rate));
};

export const additionalDiscount = () => {
  const lastId = SelectedProductStore.get('selectedProduct');
  if (!lastId) return;

  const suggest = getSuggestedProduct(lastId);
  if (!suggest) return;

  alertSuggestedProduct(suggest);
  applyAdditionalDiscount(suggest);
  renderProductSelect();
};
