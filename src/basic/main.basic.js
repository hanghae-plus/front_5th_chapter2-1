// 1. 공백으로 분리해보자. 공백을 나눈 과정은 어떻게 그렇게 나누게 되었는가?
// 2. 이게 돔으로 처리 되다보니, 여러군데서 사용되서 이렇게 밖으로 빼낸거 같네 다른 좋은 방안이 없을까?

let products, productSelectedElement, addProductButton, cartItemsElement, totalPayment, stockInfo;
let lastSelectedProduct, earnedPoints = 0, totalAmount = 0, itemQuantity = 0;
const SALE_PROBABILITY = 0.3;
const DISCOUNT_RATE = 0.2;
const ADDITIONAL_DISCOUNT_RATE = 0.05;
const LOW_STOCK_THRESHOLD = 5;
const PRODUCT_DISCOUNT_RATE = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};
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
  CartWrapper.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
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

  //이 function을 나누는게 효과적일까?
  //helper로 빼자.
  setTimeout(function() {
    setInterval(function() {
      let luckyItem = products[Math.floor(Math.random() * products.length)];
      if (shouldApplyDiscount(luckyItem)) {
        luckyItem.price = Math.round(luckyItem.price * (1-DISCOUNT_RATE));
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function() {
    setInterval(function() {
      // lastSelectedProduct가 없으면 바로 return
      if (!lastSelectedProduct) return;
      let alternativeProduct = findAlternativeProduct();
      if (!alternativeProduct) return;
      alert(alternativeProduct.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
      alternativeProduct.price = Math.round(suggest.price * (1-ADDITIONAL_DISCOUNT_RATE));
      updateSelectOptions();

    }, 60000);
  }, Math.random() * 20000);
};

function findAlternativeProduct() {
  return products.find((item) => item.id !== lastSelectedProduct && item.quantity > 0);
}

function updateSelectOptions() {
  productSelectedElement.innerHTML = '';
  products.forEach(function(item) {
    let opt = createProductOption(item);
    productSelectedElement.appendChild(opt);
  });
}

function createProductOption(item) {
  const option = document.createElement('option');
  option.value = item.id;
  option.textContent = item.name + ' - ' + item.price + '원';
  if (item.quantity === 0) option.disabled = true;
  productSelectedElement.appendChild(option);
  return option;
}

function calculateCartItemTotals(cartItem) {
    // cartItem은 DOM 요소이므로, id를 가져와서 products 배열에서 해당 제품을 찾아야 함
    const productId = cartItem.id;
    const product = products.find((p) => p.id === productId);
    if (!product) return {quantity: 0, itemTotal:0, discountedTotal: 0};

    const quantityText = cartItem.querySelector('span')?.textContent;
    const quantity = quantityText ? parseInt(quantityText.split('x ')[1]): 0;
    const itemTotal = product.price * quantity;

    const discountRate = quantity >= 10 ? PRODUCT_DISCOUNT_RATE[productId] ?? 0 : 0;
    const discountedTotal = itemTotal * (1-discountRate);

    return { quantity, itemTotal, discountedTotal};
}

function calculateBulkDiscountRate(subTotal, totalAmount, itemQuantity) {
  if (itemQuantity >= 30) {
    const bulkDiscount = totalAmount * 0.25; // 💡 할인율은 퍼센트로 표현
    const itemDiscount = subTotal - totalAmount;

    if (bulkDiscount > itemDiscount) {
      return 0.25; // 25% 고정 할인
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
    const { quantity, itemTotal, discountedTotal } = calculateCartItemTotals(cartItem);

    itemQuantity += quantity;
    subTotal += itemTotal;
    totalAmount += discountedTotal;
  });

  // 대량 구매 할인율 계산
  let discRate = calculateBulkDiscountRate(subTotal, totalAmount, itemQuantity);

  if (new Date().getDay() === 2) {
    totalAmount *= (1 - 0.1);
    discRate = Math.max(discRate, 0.1);
  }

  totalPayment.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discRate > 0) {
    let span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    totalPayment.appendChild(span);
  }

  updateStockInfo();
  renderBonusPts();

}

function shouldApplyDiscount(item) {
  return Math.random() < SALE_PROBABILITY && item.quantity > 0
}

function renderBonusPoints () {

  const earnedPoints = Math.floor(totalAmount / 1000);
  let loyaltyPointsTag = document.getElementById('loyalty-points');

  if (!loyaltyPointsTag) {
    loyaltyPointsTag = document.createElement('span');
    loyaltyPointsTag.id = 'loyalty-points';
    loyaltyPointsTag.className = 'text-blue-500 ml-2';
    totalPayment.appendChild(loyaltyPointsTag);
  }
  loyaltyPointsTag.textContent = '(포인트: ' + earnedPoints + ')';
};

function updateStockInfo() {
  let stockStatusMessage = '';

  products.forEach(function(item) {
    if (item.quantity < LOW_STOCK_THRESHOLD) {
      stockStatusMessage += item.name + ': ' + (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') + '\n';
    }
  });

  stockInfo.textContent = stockStatusMessage;
}

main();

addProductButton.addEventListener('click', function() {
  let selItem = productSelectedElement.value;
  let itemToAdd = products.find(function(product) {
    return product.id === selItem;
  });

  if (itemToAdd && itemToAdd.quantity > 0) {
    let item = document.getElementById(itemToAdd.id);
    if (item) {
      let newQuantity = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQuantity <= itemToAdd.quantity) {
        item.querySelector('span').textContent = itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQuantity;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      let newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML = '<span>' + itemToAdd.name + ' - ' + itemToAdd.price + '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' + itemToAdd.id + '">삭제</button></div>';
      cartItemsElement.appendChild(newItem);
      itemToAdd.quantity--;
    }
    calculateCart();
    lastSelectedProduct = selItem;
  }
});

cartItemsElement.addEventListener('click', function(event) {
  let tgt = event.target;

  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    let prodId = tgt.dataset.productId;
    let itemElem = document.getElementById(prodId);
    let prod = products.find(function(p) {
      return p.id === prodId;
    });

    if (tgt.classList.contains('quantity-change')) {
      let qtyChange = parseInt(tgt.dataset.change);
      let newQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
      if (newQty > 0 && newQty <= prod.quantity + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])) {
        itemElem.querySelector('span').textContent = itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
        prod.quantity -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.quantity -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      let remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.quantity += remQty;
      itemElem.remove();
    }
    calculateCart();
  }
});