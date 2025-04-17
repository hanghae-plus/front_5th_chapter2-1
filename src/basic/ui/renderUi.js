import { createElement } from '../utils/createElement';
import { setSelectOptions } from '../ui/setSelectOptions';
import { calculateCart } from '../service/calculateCart';
export const renderUi = () => {
  // 컴포넌트 혹은 따로 선언 분리
  const root = document.getElementById('app');
  const container = createElement('div', { className: 'bg-gray-100 p-8' });
  const wrapper = createElement('div', {
    className: 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
  });

  const prodSelect = createElement('select', { id: 'product-select', className: 'border rounded p-2 mr-2' });

  const addProdBtn = createElement('button', {
    id: 'add-to-cart',
    className: 'bg-blue-500 text-white px-4 py-2 rounded',
    textContent: '추가',
  });
  const orderedList = createElement('div', { id: 'cart-items' });
  const paymentInfo = createElement('div', { id: 'cart-total', className: 'text-xl font-bold my-4' });
  const soldOutInfo = createElement('div', { id: 'stock-status', className: 'text-sm text-gray-500 mt-2' });

  const cartTitle = createElement('h1', { className: 'text-2xl font-bold mb-4', textContent: '장바구니' });

  wrapper.appendChild(cartTitle);
  wrapper.appendChild(orderedList);
  wrapper.appendChild(paymentInfo);
  wrapper.appendChild(prodSelect);
  wrapper.appendChild(addProdBtn);
  wrapper.appendChild(soldOutInfo);

  container.appendChild(wrapper);

  root.appendChild(container);

  setSelectOptions();

  calculateCart();
};
