import { $addToCartButton, $cart, $itemSelect, $sum, $stockState, $title } from './createElements';

const render = () => {
  const $elements = document.createElement('div');
  $elements.className = `max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8`;
  $elements.appendChild($title);
  $elements.appendChild($cart);
  $elements.appendChild($sum);
  $elements.appendChild($itemSelect);
  $elements.appendChild($addToCartButton);
  $elements.appendChild($stockState);

  const $root = document.createElement('div');
  $root.className = `bg-gray-100 p-8`;
  $root.appendChild($elements);

  const $app = document.getElementById('app');
  $app.appendChild($root);
};

export default render;
