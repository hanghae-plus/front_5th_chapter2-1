import updateItemOption from './main.basic';

const render = () => {
  //createElement
  const $app = document.getElementById('app');
  const $root = document.createElement('div');
  const $elements = document.createElement('div'); //요소들을 둘러싸는 컨테이너, wrap

  const $header = document.createElement('h1');
  let $addToCartButton = document.createElement('button');
  let $cart = document.createElement('div'); //장바구니 , disp: display를 뜻합니다.
  let $sum = document.createElement('div'); //장바구니의 총액
  let $itemSelect = document.createElement('select'); //select를 의미, 상품들이 들어감
  let $stockState = document.createElement('div');

  //className
  $root.className = `bg-gray-100 p-8`;
  $elements.className = `max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8`;
  $header.className = `text-2xl font-bold mb-4`;
  $addToCartButton.className = `bg-blue-500 text-white px-4 py-2 rounded`;
  $sum.className = `text-xl font-bold my-4`;
  $itemSelect.className = `border rounded p-2 mr-2`;
  $stockState.className = `text-sm text-gray-500 mt-2`;

  //id
  $addToCartButton.id = 'add-to-cart';
  $cart.id = 'cart-items';
  $sum.id = 'cart-total';
  $itemSelect.id = 'product-select';
  $stockState.id = 'stock-status';

  //textContent
  $header.textContent = '장바구니';
  $addToCartButton.textContent = '추가';

  //updateItem
  updateItemOption();

  //append
  $elements.appendChild($header);
  $elements.appendChild($cart);
  $elements.appendChild($sum);
  $elements.appendChild($itemSelect);
  $elements.appendChild($addToCartButton);
  $elements.appendChild($stockState);
  $root.appendChild($elements);
  $app.appendChild($root);
};

export default render;
