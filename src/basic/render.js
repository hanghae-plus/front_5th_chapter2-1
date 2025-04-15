import $title from './components/Title';
import $cart from './components/Cart';
import $cartTotal from './components/CartTotal';
import $itemSelect from './components/ItemSelect';
import $addCartButton from './components/AddCartButton';
import $stock from './components/Stock';

const render = () => {
  const $elements = document.createElement('div');
  $elements.className = `max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8`;
  $elements.appendChild($title);
  $elements.appendChild($cart);
  $elements.appendChild($cartTotal);
  $elements.appendChild($itemSelect);
  $elements.appendChild($addCartButton);
  $elements.appendChild($stock);

  const $root = document.createElement('div');
  $root.className = `bg-gray-100 p-8`;
  $root.appendChild($elements);

  const $app = document.getElementById('app');
  $app.appendChild($root);
};

export default render;
