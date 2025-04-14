import { PRODUCT_LIST } from '../consts';
import { SelectedProductStore } from '../store';
import { updateProductSelectOptions } from '../render';

export const 추가할인 = () => {
  const lastSelectedProductId = SelectedProductStore.get('selectedProduct');

  if (lastSelectedProductId) {
    const suggest = PRODUCT_LIST.find(
      (item) => item.id !== lastSelectedProductId && item.quantity > 0,
    );

    if (suggest) {
      alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
      suggest.value = Math.round(suggest.value * 0.95);
      updateProductSelectOptions();
    }
  }
};
