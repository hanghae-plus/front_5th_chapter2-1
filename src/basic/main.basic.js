import {
  DISCOUNT_RATES,
  FLASH_SALE_INTERVAL,
  RECOMMENDATION_INTERVAL,
  FLASH_SALE_DISCOUNT,
  RECOMMENDATION_DISCOUNT,
} from './constants';
import { INITIAL_PRODUCTS } from './data/products';
import { cartState } from './state';

function renderProductDropdown() {
  const { productDropdown, products } = cartState;
  productDropdown.innerHTML = '';
  products.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} - ${product.price}원`;
    if (product.quantity === 0) {
      option.disabled = true;
    }
    productDropdown.appendChild(option);
  });
}

function renderBonusPoints() {
  const { cartTotalPrice } = cartState;
  cartState.bonusPoints = Math.floor(cartState.totalAmount / 1000);
  let pointsTag = document.getElementById('loyalty-points');

  if (!pointsTag) {
    pointsTag = document.createElement('span');
    pointsTag.id = 'loyalty-points';
    pointsTag.className = 'text-blue-500 ml-2';
    cartTotalPrice.appendChild(pointsTag);
  }

  pointsTag.textContent = `(포인트: ${cartState.bonusPoints})`;
}

function updateStockStatusMessage() {
  const { stockStatusMessage, products } = cartState;
  const infoMessage = products
    .filter((product) => product.quantity < 5)
    .map(
      (product) =>
        `${product.name}: ${product.quantity > 0 ? `재고 부족 (${product.quantity}개 남음)` : '품절'}`,
    )
    .join('\n');
  stockStatusMessage.textContent = infoMessage;
}

function getFinalDiscountRate(subTotal, totalAmount, itemCount) {
  let discountRate = 0;

  if (itemCount >= 30) {
    const bulkDiscount = subTotal * 0.25;
    const itemDiscount = subTotal - totalAmount;
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = itemDiscount / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }

  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  cartState.totalAmount = totalAmount;
  return discountRate;
}

function renderCartTotal(total, discountRate) {
  const { cartTotalPrice } = cartState;
  cartTotalPrice.textContent = `총액: ${Math.round(total)}원`;
  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalPrice.appendChild(span);
  }
}

function calculateCartTotals(cartItems) {
  let itemCount = 0;
  let totalAmount = 0;
  let subTotal = 0;

  [...cartItems].forEach((cartItem) => {
    const quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
    const product = cartState.products.find((p) => p.id === cartItem.id);
    if (!product) {
      return;
    }

    const itemTotal = product.price * quantity;
    const discount = quantity >= 10 ? DISCOUNT_RATES[product.id] || 0 : 0;

    itemCount += quantity;
    subTotal += itemTotal;
    totalAmount += itemTotal * (1 - discount);
  });

  return { subTotal, itemCount, totalAmount };
}

function calculateCart() {
  const cartItems = cartState.cartList.children;
  const { subTotal, itemCount, totalAmount } = calculateCartTotals(cartItems);

  cartState.itemCount = itemCount;
  cartState.totalAmount = totalAmount;

  const discountRate = getFinalDiscountRate(subTotal, totalAmount, itemCount);

  renderCartTotal(cartState.totalAmount, discountRate);
  updateStockStatusMessage();
  renderBonusPoints();
}

function handleCartAdd() {
  const { productDropdown, products } = cartState;
  const selectedProductId = productDropdown.value;
  const selectedProduct = products.find((p) => p.id === selectedProductId);

  if (selectedProduct && selectedProduct.quantity > 0) {
    const cartItem = document.getElementById(selectedProduct.id);
    if (cartItem) {
      const newQuantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQuantity <= selectedProduct.quantity) {
        cartItem.querySelector('span').textContent =
          `${selectedProduct.name} - ${selectedProduct.price}원 x ${newQuantity}`;
        selectedProduct.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newCartItem = document.createElement('div');
      newCartItem.id = selectedProduct.id;
      newCartItem.className = 'flex justify-between items-center mb-2';
      newCartItem.innerHTML = `<span>${selectedProduct.name} - ${selectedProduct.price}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedProduct.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedProduct.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${selectedProduct.id}">삭제</button>
        </div>`;
      cartState.cartList.appendChild(newCartItem);
      selectedProduct.quantity--;
    }
    calculateCart();
    cartState.lastSelectedProductId = selectedProductId;
  }
}

function handleQuantityChange(target, cartItem, product) {
  const quantityDiff = parseInt(target.dataset.change);
  const currentQuantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
  const newQuantity = currentQuantity + quantityDiff;

  if (newQuantity > 0 && newQuantity <= product.quantity + currentQuantity) {
    cartItem.querySelector('span').textContent =
      cartItem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
    product.quantity -= quantityDiff;
  } else if (newQuantity <= 0) {
    cartItem.remove();
    product.quantity -= quantityDiff;
  } else {
    alert('재고가 부족합니다.');
  }
}

function handleItemRemove(cartItem, product) {
  const removedQuantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
  product.quantity += removedQuantity;
  cartItem.remove();
}

function handleCartClick(event) {
  const target = event.target;
  if (!target.classList.contains('quantity-change') && !target.classList.contains('remove-item')) {
    return;
  }

  const productId = target.dataset.productId;
  const cartItem = document.getElementById(productId);
  const product = cartState.products.find((p) => p.id === productId);
  if (!product || !cartItem) {
    return;
  }

  if (target.classList.contains('quantity-change')) {
    handleQuantityChange(target, cartItem, product);
  } else if (target.classList.contains('remove-item')) {
    handleItemRemove(cartItem, product);
  }

  calculateCart();
}

function createUIElements() {
  const elements = {
    container: document.createElement('div'),
    productWrapper: document.createElement('div'),
    heading: document.createElement('h1'),
    cartList: document.createElement('div'),
    cartTotalPrice: document.createElement('div'),
    productDropdown: document.createElement('select'),
    addToCartButton: document.createElement('button'),
    stockStatusMessage: document.createElement('div'),
  };

  elements.cartList.id = 'cart-items';
  elements.cartTotalPrice.id = 'cart-total';
  elements.productDropdown.id = 'product-select';
  elements.addToCartButton.id = 'add-to-cart';
  elements.stockStatusMessage.id = 'stock-status';

  elements.container.className = 'bg-gray-100 p-8';
  elements.productWrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  elements.heading.className = 'text-2xl font-bold mb-4';
  elements.cartTotalPrice.className = 'text-xl font-bold my-4';
  elements.productDropdown.className = 'border rounded p-2 mr-2';
  elements.addToCartButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  elements.stockStatusMessage.className = 'text-sm text-gray-500 mt-2';

  elements.heading.textContent = '장바구니';
  elements.addToCartButton.textContent = '추가';

  return elements;
}

function setupFlashSale(products) {
  setTimeout(() => {
    setInterval(() => {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * (1 - FLASH_SALE_DISCOUNT));
        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        renderProductDropdown();
      }
    }, FLASH_SALE_INTERVAL);
  }, Math.random() * 10000);
}

function setupRecommendation(products) {
  setTimeout(() => {
    setInterval(() => {
      if (cartState.lastSelectedProductId) {
        const suggest = products.find(
          (p) => p.id !== cartState.lastSelectedProductId && p.quantity > 0,
        );
        if (suggest) {
          alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
          suggest.price = Math.round(suggest.price * (1 - RECOMMENDATION_DISCOUNT));
          renderProductDropdown();
        }
      }
    }, RECOMMENDATION_INTERVAL);
  }, Math.random() * 20000);
}

function setupEventListeners({ addToCartButton, cartList }) {
  addToCartButton.addEventListener('click', handleCartAdd);
  cartList.addEventListener('click', handleCartClick);
}

function main() {
  cartState.products = INITIAL_PRODUCTS;
  const root = document.getElementById('app');
  const elements = createUIElements();

  cartState.cartList = elements.cartList;
  cartState.cartTotalPrice = elements.cartTotalPrice;
  cartState.productDropdown = elements.productDropdown;
  cartState.addToCartButton = elements.addToCartButton;
  cartState.stockStatusMessage = elements.stockStatusMessage;

  renderProductDropdown();

  elements.productWrapper.append(
    elements.heading,
    cartState.cartList,
    cartState.cartTotalPrice,
    cartState.productDropdown,
    cartState.addToCartButton,
    cartState.stockStatusMessage,
  );
  elements.container.appendChild(elements.productWrapper);
  root.appendChild(elements.container);

  calculateCart();
  setupEventListeners(elements);
  setupFlashSale(cartState.products);
  setupRecommendation(cartState.products);
}

main();
