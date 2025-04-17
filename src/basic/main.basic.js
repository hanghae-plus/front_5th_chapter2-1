import createDiscountEvent from './createDiscountEvent';
import updateCartTotal from './updateCartTotal';
import updateSelectBoxOptions from './updateSelectBoxOption';

let products, $productSelectBox, $addProductToCartButton, $cartList, $cartTotalPrice, $stockStatus;

const main = () => {
  products = [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ];

  const $background = document.createElement('div');
  const $main = document.getElementById('app');
  const $content = document.createElement('div');
  const $title = document.createElement('h1');

  $cartList = document.createElement('div');
  $cartTotalPrice = document.createElement('div');
  $productSelectBox = document.createElement('select');
  $addProductToCartButton = document.createElement('button');
  $stockStatus = document.createElement('div');

  $cartList.id = 'cart-items';
  $cartTotalPrice.id = 'cart-total';
  $productSelectBox.id = 'product-select';
  $addProductToCartButton.id = 'add-to-cart';
  $stockStatus.id = 'stock-status';

  $background.className = 'bg-gray-100 p-8';
  $content.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  $title.className = 'text-2xl font-bold mb-4';
  $cartTotalPrice.className = 'text-xl font-bold my-4';
  $productSelectBox.className = 'border rounded p-2 mr-2';
  $addProductToCartButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  $stockStatus.className = 'text-sm text-gray-500 mt-2';

  $title.textContent = '장바구니';
  $addProductToCartButton.textContent = '추가';

  updateSelectBoxOptions($productSelectBox, products);

  $content.appendChild($title);
  $content.appendChild($cartList);
  $content.appendChild($cartTotalPrice);
  $content.appendChild($productSelectBox);
  $content.appendChild($addProductToCartButton);
  $content.appendChild($stockStatus);
  $background.appendChild($content);
  $main.appendChild($background);

  updateCartTotal($cartList, products, $cartTotalPrice, $stockStatus);

  createDiscountEvent(products);
};

const addProductToCart = (selectedProduct) => {
  const { id } = selectedProduct;
  const $cartItem = document.getElementById(id);

  if (!$cartItem) {
    createNewCartItem(selectedProduct);
    updateCartTotal($cartList, products, $cartTotalPrice, $stockStatus);

    return;
  }

  updateExistingCartItem($cartItem, selectedProduct);
  updateCartTotal($cartList, products, $cartTotalPrice, $stockStatus);
};

const createNewCartItem = (product) => {
  const { id, name, price } = product;
  const $newItem = document.createElement('div');

  $newItem.id = id;
  $newItem.className = 'flex justify-between items-center mb-2';
  $newItem.innerHTML = `
    <span>${name} - ${price}원 x 1</span>
    <div>
      <button 
        class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
        data-product-id="${id}" 
        data-change="-1"
      >
        -
      </button>
      <button 
        class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
        data-product-id="${id}" 
        data-change="1"
      >
        +
      </button>
      <button 
        class="remove-item bg-red-500 text-white px-2 py-1 rounded" 
        data-product-id="${id}"
      >
        삭제
      </button>
    </div>`;

  $cartList.appendChild($newItem);
  decreaseProductStock(product);
};

const updateExistingCartItem = ($cartItem, product) => {
  const { name, price, quantity } = product;
  const currentQuantity = parseInt($cartItem.querySelector('span').textContent.split('x ')[1]);
  const updatedQuantity = currentQuantity + 1;

  if (updatedQuantity > quantity) {
    alert('재고가 부족합니다.');
    
    return;
  }

  $cartItem.querySelector('span').textContent = `${name} - ${price}원 x ${updatedQuantity}`;
  decreaseProductStock(product);
};

const decreaseProductStock = (product) => {
  product.quantity--;
};

main();

$addProductToCartButton.addEventListener('click', () => {
  const selectedProductId = $productSelectBox.value;
  const selectedProduct = products.find(({ id }) => id === selectedProductId);

  if (!selectedProduct || selectedProduct.quantity <= 0) {
    return;
  }

  addProductToCart(selectedProduct);
  updateCartTotal($cartList, products, $cartTotalPrice, $stockStatus);
});

$cartList.addEventListener('click', (event) => {
  const $clickedButton = event.target;

  const isQuantityChange = $clickedButton.classList.contains('quantity-change');
  const isRemoveItem = $clickedButton.classList.contains('remove-item');

  if (!isQuantityChange && !isRemoveItem) {
    return;
  }

  const selectedProductId = $clickedButton.dataset.productId;
  const $cartItem = document.getElementById(selectedProductId);
  const selectedProduct = products.find((p) => p.id === selectedProductId);

  if (isQuantityChange) {
    const qtyChange = parseInt($clickedButton.dataset.change);
    const currentQuantity = parseInt($cartItem.querySelector('span').textContent.split('x ')[1]);
    const updatedQuantity = currentQuantity + qtyChange;
    const availableStock = selectedProduct.quantity + currentQuantity;

    if (updatedQuantity <= 0) {
      $cartItem.remove();
      selectedProduct.quantity -= qtyChange;
      updateCartTotal($cartList, products, $cartTotalPrice, $stockStatus);

      return;
    }

    if (updatedQuantity > availableStock) {
      alert('재고가 부족합니다.');

      return;
    }

    $cartItem.querySelector('span').textContent =
      `${$cartItem.querySelector('span').textContent.split('x ')[0]}x ${updatedQuantity}`;
    selectedProduct.quantity -= qtyChange;
  }

  if (isRemoveItem) {
    const currentQuantity = parseInt($cartItem.querySelector('span').textContent.split('x ')[1]);

    selectedProduct.quantity += currentQuantity;
    $cartItem.remove();
  }

  updateCartTotal($cartList, products, $cartTotalPrice, $stockStatus);
});
