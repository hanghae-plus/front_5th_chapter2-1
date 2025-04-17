// 1. 공백으로 분리해보자. 공백을 나눈 과정은 어떻게 그렇게 나누게 되었는가?
// 2. 이게 돔으로 처리 되다보니, 여러군데서 사용되서 이렇게 밖으로 빼낸거 같네 다른 좋은 방안이 없을까?

let products,
  productSelectedElement,
  addProductButton,
  cartItemsElement,
  totalPayment,
  stockInfo;
let lastSelectedProduct,
  earnedPoints = 0,
  totalAmount = 0,
  itemQuantity = 0;
export const DISCOUNT = Object.freeze({
  SALE_PROBABILITY: 0.3, // 세일 확률
  BASIC_RATE: 0.2, // 기본 할인율 20%
  ADDITIONAL_RATE: 0.05, // 추가 할인율 5%
  TUESDAY_RATE: 0.1,
  BULK_RATE:0.25,
});
export const STOCK = Object.freeze({
  LOW_STOCK_THRESHOLD: 5,        // 재고 부족 기준
});
const PRODUCT_DISCOUNT_RATE = Object.freeze({
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
});
//객체를 변경하지 못하게 위해 어떻게 해야할까?
//내장함수 무엇이냐

function main() {
  products = [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ];

  let root = document.getElementById('app');
  let CartContainer = document.createElement('div');
  let CartWrapper = document.createElement('div');
  let pageHeading = document.createElement('h1');

  cartItemsElement = document.createElement('div');
  totalPayment = document.createElement('div');
  productSelectedElement = document.createElement('select');
  addProductButton = document.createElement('button');
  stockInfo = document.createElement('div');

  CartContainer.className = 'bg-gray-100 p-8';
  CartWrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  pageHeading.className = 'text-2xl font-bold mb-4';

  cartItemsElement.id = 'cart-items';
  totalPayment.id = 'cart-total';
  productSelectedElement.id = 'product-select';
  addProductButton.id = 'add-to-cart';
  stockInfo.id = 'stock-status';

  totalPayment.className = 'text-xl font-bold my-4';
  productSelectedElement.className = 'border rounded p-2 mr-2';
  addProductButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stockInfo.className = 'text-sm text-gray-500 mt-2';

  pageHeading.textContent = '장바구니';
  addProductButton.textContent = '추가';

  CartWrapper.appendChild(pageHeading);
  CartWrapper.appendChild(cartItemsElement);
  CartWrapper.appendChild(totalPayment);
  CartWrapper.appendChild(productSelectedElement);
  CartWrapper.appendChild(addProductButton);
  CartWrapper.appendChild(stockInfo);
  CartContainer.appendChild(CartWrapper);
  root.appendChild(CartContainer);

  updateSelectOptions();
  calculateCart();

  setTimeout(function () {
    setInterval(function () {
      let luckyItem = products[Math.floor(Math.random() * products.length)];
      if (shouldApplyDiscount(luckyItem)) {
        luckyItem.price = Math.round(luckyItem.price * (1 - DISCOUNT_RATE));
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      // lastSelectedProduct가 없으면 바로 return
      if (!lastSelectedProduct) return;
      let alternativeProduct = findAlternativeProduct();
      if (!alternativeProduct) return;
      alert(
        alternativeProduct.name +
          '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!'
      );
      alternativeProduct.price = Math.round(
        suggest.price * (1 - ADDITIONAL_DISCOUNT_RATE)
      );
      updateSelectOptions();
    }, 60000);
  }, Math.random() * 20000);
}

function findAlternativeProduct() {
  return products.find(
    (item) => item.id !== lastSelectedProduct && item.quantity > 0
  );
}

function updateSelectOptions() {
  productSelectedElement.innerHTML = '';
  products.forEach(function (item) {
    let option = createProductOption(item);
    productSelectedElement.appendChild(option);
  });
}

function createProductOption(item) {
  const option = document.createElement('option');
  option.value = item.id;
  option.textContent = item.name + ' - ' + item.price + '원';
  if (item.quantity === 0) option.disabled = true;
  return option;
}

function calculateCartItemTotals(cartItem) {
  // cartItem은 DOM 요소이므로, id를 가져와서 products 배열에서 해당 제품을 찾아야 함
  const productId = cartItem.id;
  const product = products.find((p) => p.id === productId);
  if (!product) return { quantity: 0, itemTotal: 0, discountedTotal: 0 };

  const quantityText = cartItem.querySelector('span')?.textContent;
  const quantity = quantityText ? parseInt(quantityText.split('x ')[1]) : 0;
  const itemTotal = product.price * quantity;

  const discountRate =
    quantity >= 10 ? (PRODUCT_DISCOUNT_RATE[productId] ?? 0) : 0;
  const discountedTotal = itemTotal * (1 - discountRate);

  return { quantity, itemTotal, discountedTotal };
}

function calculateBulkDiscountRate(subTotal, totalAmount, itemQuantity) {
  if (itemQuantity >= 30) {
    const bulkDiscount = totalAmount * DISCOUNT.BULK_RATE; // 💡 할인율은 퍼센트로 표현
    const itemDiscount = subTotal - totalAmount;

    if (bulkDiscount > itemDiscount) {
      return DISCOUNT.BULK_RATE; // 25% 고정 할인
    }
  }
  return (subTotal - totalAmount) / subTotal || 0;
}

function calculateCart() {
  totalAmount = 0;
  //고민해보자.
  itemQuantity = 0;
  let cartItems = cartItemsElement.children;
  let subTotal = 0;

  // 각 cartItem에 대해 개별 합계 계산
  Array.from(cartItems).forEach((cartItem) => {
    const { quantity, itemTotal, discountedTotal } =
      calculateCartItemTotals(cartItem);

    itemQuantity += quantity;
    subTotal += itemTotal;
    totalAmount += discountedTotal;
  });

  // 대량 구매 할인율 계산
  let discRate = calculateBulkDiscountRate(subTotal, totalAmount, itemQuantity);

  if (new Date().getDay() === 2) {
    totalAmount *= 1 - DISCOUNT.TUESDAY_RATE;
    discRate = Math.max(discRate, DISCOUNT.TUESDAY_RATE);
  }

  totalPayment.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discRate > 0) {
    let span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    totalPayment.appendChild(span);
  }

  updateStockInfo();
  renderBonusPoints();
}

function shouldApplyDiscount(item) {
  return Math.random() < DISCOUNT.SALE_PROBABILITY && item.quantity > 0;
}

function renderBonusPoints() {
  const earnedPoints = Math.floor(totalAmount / 1000);
  let loyaltyPointsTag = document.getElementById('loyalty-points');

  if (!loyaltyPointsTag) {
    loyaltyPointsTag = document.createElement('span');
    loyaltyPointsTag.id = 'loyalty-points';
    loyaltyPointsTag.className = 'text-blue-500 ml-2';
    totalPayment.appendChild(loyaltyPointsTag);
  }
  loyaltyPointsTag.textContent = '(포인트: ' + earnedPoints + ')';
}

function updateStockInfo() {
  let stockStatusMessage = '';

  products.forEach(function (item) {
    if (item.quantity < STOCK.LOW_STOCK_THRESHOLD) {
      stockStatusMessage +=
        item.name +
        ': ' +
        (item.quantity > 0
          ? '재고 부족 (' + item.quantity + '개 남음)'
          : '품절') +
        '\n';
    }
  });

  stockInfo.textContent = stockStatusMessage;
}

main();

function handleAddToCart() {
  const selectedProductId = productSelectedElement.value;
  const productToAdd = products.find(function (product) {
    return product.id === selectedProductId;
  });

  if (!productToAdd || productToAdd.quantity <= 0) return;

  const existingCartItem = document.getElementById(productToAdd.id);

  if (existingCartItem) {
    // 기존 항목 수량 증가
    handleIncreaseQuantity(existingCartItem, productToAdd);
  } else {
    const newItem = createCartItem(productToAdd);
    cartItemsElement.appendChild(newItem);
    productToAdd.quantity--;
  }

  calculateCart();
  lastSelectedProduct = selectedProductId;
}

function handleIncreaseQuantity(cartItemElement, product) {
  const quantitySpan = cartItemElement.querySelector('span');
  const currentQuantity = parseInt(quantitySpan.textContent.split('x ')[1], 10);

  // 재고가 1개 이상 남아있다면
  if (product.quantity > 0) {
    const newQuantity = currentQuantity + 1;
    quantitySpan.textContent = `${product.name} - ${product.price}원 x ${newQuantity}`;
    product.quantity--;  // 재고 1 감소
  } else {
    alert('재고가 부족합니다.');
  }
}

function createCartItem(product) {
  const cartItemHTML = `
  <div id="${product.id}" class="flex justify-between items-center mb-2">
      <span>${product.name} - ${product.price}원 x 1</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${product.id}">삭제</button>
      </div>
    </div>
  `;

  // 템플릿 문자열을 DOM 요소로 변환? => html5에서 html조각을 보관하기 위한용도,
  // innerHtml만 사용하면 부모 요소 없이 내용물만 얻게 됨
  // template을 사용하면 원하는 HTML 구조 전체를 그대로 유지할 수 있음
  const template = document.createElement('template');
  template.innerHTML = cartItemHTML.trim();

  // 템플릿의 첫 번째 자식 반환 (div 요소)
  return template.content.firstChild; // 우리가 정의한 최상위 요소에 대한 정확한 참조를 얻을 수 있음
}

function handleCartItemClick(event) {
  let target = event.target;

  if (isCartActionTarget(target)) {
    let productId = target.dataset.productId;
    let cartItemElement = document.getElementById(productId);
    let product = findProductById(productId);
    let spanTextContent = cartItemElement.querySelector('span').textContent;

    if (isContainsClassName(target, 'quantity-change')) {
      let changedQuantity = parseInt(target.dataset.change);
      handleCartQuantityChange(
        cartItemElement,
        product,
        changedQuantity,
        spanTextContent
      );
    } else if (isContainsClassName(target, 'remove-item')) {
      handleCartItemRemoval(cartItemElement, product, spanTextContent);
    }
    calculateCart();
  }
}

function handleCartQuantityChange(
  cartItemElement,
  product,
  changedQuantity,
  spanTextContent
) {
  const currentQuantity = extractQuantityFromText(spanTextContent);
  const newQuantity = currentQuantity + changedQuantity;

  if (isQuantityAvailable(product, currentQuantity, newQuantity)) {
    // 수량 업데이트
    cartItemElement.querySelector('span').textContent =
      spanTextContent.split('x ')[0] + 'x ' + newQuantity;
    product.quantity -= changedQuantity;
  } else if (newQuantity <= 0) {
    // 수량이 0 이하인 경우 항목 제거
    cartItemElement.remove();
    product.quantity -= changedQuantity;
  } else {
    // 재고 부족
    alert('재고가 부족합니다.');
  }
}

function handleCartItemRemoval(cartItemElement, product, spanTextContent) {
  const removedQuantity = extractQuantityFromText(spanTextContent);
  product.quantity += removedQuantity;
  cartItemElement.remove();
}

function isCartActionTarget(element) {
  return (
    element.classList.contains('quantity-change') ||
    element.classList.contains('remove-item')
  );
}

function findProductById(productId) {
  return products.find((product) => product.id === productId);
}

function isQuantityAvailable(product, currentQuantity, requestedQuantity) {
  // 요청 수량이 양수인지 확인
  if (requestedQuantity <= 0) return false;

  // 요청 수량이 현재 카트에 있는 수량 + 재고 수량보다 작거나 같은지 확인
  return requestedQuantity <= product.quantity + currentQuantity;
}

function isContainsClassName(target, className) {
  return target.classList.contains(className);
}

function extractQuantityFromText(text) {
  return parseInt(text.split('x ')[1]);
}

addProductButton.addEventListener('click', handleAddToCart);

cartItemsElement.addEventListener('click', function (event) {
  let target = event.target;

  if (isCartActionTarget(target)) {
    let productId = target.dataset.productId;
    let cartItemElement = document.getElementById(productId);
    let product = findProductById(productId);
    let spanTextContent = cartItemElement.querySelector('span').textContent;

    if (isContainsClassName(target, 'quantity-change')) {
      let changedQuantity = parseInt(target.dataset.change);
      let currentQuantity = extractQuantityFromText(spanTextContent);
      let newQuantity = currentQuantity + changedQuantity;
      if (isQuantityAvailable(product, currentQuantity, newQuantity)) {
        cartItemElement.querySelector('span').textContent =
          spanTextContent.split('x ')[0] + 'x ' + newQuantity;
        product.quantity -= changedQuantity;
      } else if (newQuantity <= 0) {
        cartItemElement.remove();
        product.quantity -= changedQuantity;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (isContainsClassName(target, 'remove-item')) {
      let removedQuantity = extractQuantityFromText(spanTextContent);
      product.quantity += removedQuantity;
      cartItemElement.remove();
    }
    calculateCart();
  }
});
