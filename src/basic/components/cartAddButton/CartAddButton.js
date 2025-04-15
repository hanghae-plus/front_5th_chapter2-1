import { handleAddToCart } from './handleAddToCart';

export default function CartAddButton() {
  const $addButton = document.createElement('button');
  $addButton.id = 'add-to-cart';
  $addButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  $addButton.textContent = '추가';

  $addButton.addEventListener('click', handleAddToCart);

  return $addButton;
}
