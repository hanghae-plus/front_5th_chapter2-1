import { handleClickAdd } from '../services/cart-service.js';

const CartAddButton = () => {
  const $addToCartBtn = Object.assign(document.createElement('button'), {
    id: 'add-to-cart',
    className: 'bg-blue-500 text-white px-4 py-2 rounded',
    textContent: '추가',
  });

  const render = () => {
    $addToCartBtn.textContent = '추가';
    $addToCartBtn.addEventListener('click', handleClickAdd);
  };

  render();

  return $addToCartBtn;
};

export { CartAddButton };
