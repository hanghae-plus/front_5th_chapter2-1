import $title from './components/Title';
import $cart from './components/Cart';
import $cartTotal from './components/CartTotal';
import $itemSelect from './components/ItemSelect';
import $addCartButton from './components/AddCartButton';
import $stock from './components/Stock';

const render = () => {
  const $components = document.createElement('div');
  $components.className = `max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8`;
  $components.appendChild($title);
  $components.appendChild($cart);
  $components.appendChild($cartTotal);
  $components.appendChild($itemSelect);
  $components.appendChild($addCartButton);
  $components.appendChild($stock);

  const $root = document.createElement('div');
  $root.className = `bg-gray-100 p-8`;
  $root.appendChild($components);

  const $app = document.getElementById('app');
  $app.appendChild($root);
};

export default render;
