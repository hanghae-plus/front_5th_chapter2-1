import { createElement } from '../utils/createElement';
import { globalStore } from '../store/globalStore';

export const setSelectOptions = () => {
  const { prodList } = globalStore.getState();
  const select = document.getElementById('product-select');

  if (!select) return;
  select.innerHTML = '';

  prodList.forEach((item) => {
    const option = createElement('option', {
      value: item.id,
      textContent: `${item.name} - ${item.price}원`,
      disabled: item.quantity === 0,
    });

    select.appendChild(option);
  });
};
