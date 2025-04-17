const products = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

let select, addButton, cartList, cartTotal, stockStatus;
let lastSelectedProduct,
  LoyaltyPoints = 0,
  totalAmount = 0,
  itemCount = 0;

main();
setupEventListeners();

function main() {
  const root = document.getElementById('app');

  const container = document.createElement('div');
  container.className = 'bg-gray-100 p-8';

  const wrapper = document.createElement('div');
  wrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  const cartTitle = document.createElement('h1');
  cartTitle.className = 'text-2xl font-bold mb-4';
  cartTitle.textContent = '장바구니';

  cartList = document.createElement('div');
  cartList.id = 'cart-items';

  cartTotal = document.createElement('div');
  cartTotal.id = 'cart-total';
  cartTotal.className = 'text-xl font-bold my-4';

  select = document.createElement('select');
  select.className = 'border rounded p-2 mr-2';
  select.id = 'product-select';

  addButton = document.createElement('button');
  addButton.id = 'add-to-cart';
  addButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addButton.textContent = '추가';

  stockStatus = document.createElement('div');
  stockStatus.id = 'stock-status';
  stockStatus.className = 'text-sm text-gray-500 mt-2';

  addSelectOptions();

  wrapper.appendChild(cartTitle);
  wrapper.appendChild(cartList);
  wrapper.appendChild(cartTotal);
  wrapper.appendChild(select);
  wrapper.appendChild(addButton);
  wrapper.appendChild(stockStatus);
  container.appendChild(wrapper);
  root.appendChild(container);

  calculateCart();

  setTimeout(function () {
    setInterval(function () {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        addSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedProduct) {
        const suggest = products.find(function (item) {
          return item.id !== lastSelectedProduct && item.quantity > 0;
        });
        if (suggest) {
          alert(
            suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!'
          );
          suggest.price = Math.round(suggest.price * 0.95);
          addSelectOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function addSelectOptions() {
  select.innerHTML = '';
  products.forEach(function (item) {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name + ' - ' + item.price + '원';
    if (item.quantity === 0) option.disabled = true;
    select.appendChild(option);
  });
}

function calculateCart() {
  itemCount = 0;
  let cartTotalPrice = 0;
  totalAmount = 0;

  const cartItems = cartList.children;
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          curItem = products[j];
          break;
        }
      }
      const quantity = parseInt(
        cartItems[i].querySelector('span').textContent.split('x ')[1]
      );
      const itemTotalPrice = curItem.price * quantity;
      let discountRate = 0;
      itemCount += quantity;
      cartTotalPrice += itemTotalPrice;
      if (quantity >= 10) {
        if (curItem.id === 'p1') discountRate = 0.1;
        else if (curItem.id === 'p2') discountRate = 0.15;
        else if (curItem.id === 'p3') discountRate = 0.2;
        else if (curItem.id === 'p4') discountRate = 0.05;
        else if (curItem.id === 'p5') discountRate = 0.25;
      }
      totalAmount += itemTotalPrice * (1 - discountRate);
    })();
  }
  let discountRate = 0;
  if (itemCount >= 30) {
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = cartTotalPrice - totalAmount;
    if (bulkDiscount > itemDiscount) {
      totalAmount = cartTotalPrice * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (cartTotalPrice - totalAmount) / cartTotalPrice;
    }
  } else {
    discountRate = (cartTotalPrice - totalAmount) / cartTotalPrice;
  }
  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }
  cartTotal.textContent = '총액: ' + Math.round(totalAmount) + '원';
  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    cartTotal.appendChild(span);
  }
  updateStockStatus();
  renderLoyaltyPoints();
}

function renderLoyaltyPoints() {
  LoyaltyPoints = Math.floor(totalAmount / 1000);
  let loyaltyPriceTag = document.getElementById('loyalty-points');
  if (!loyaltyPriceTag) {
    loyaltyPriceTag = document.createElement('span');
    loyaltyPriceTag.id = 'loyalty-points';
    loyaltyPriceTag.className = 'text-blue-500 ml-2';
    cartTotal.appendChild(loyaltyPriceTag);
  }
  loyaltyPriceTag.textContent = '(포인트: ' + LoyaltyPoints + ')';
}

function updateStockStatus() {
  let statusMessage = '';
  products.forEach(function (item) {
    if (item.quantity < 5) {
      statusMessage +=
        item.quantity > 0
          ? `${item.name}: 재고 부족 (${item.quantity}개 남음)\n`
          : `${item.name}: 품절\n`;
    }
  });
  stockStatus.textContent = statusMessage;
}

function setupEventListeners() {
  addButton.addEventListener('click', function () {
    const selectedItem = select.value;
    const itemToAdd = products.find(function (product) {
      return product.id === selectedItem;
    });
    if (itemToAdd && itemToAdd.quantity > 0) {
      const item = document.getElementById(itemToAdd.id);
      if (item) {
        const inCartQuantity =
          parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
        if (inCartQuantity <= itemToAdd.quantity) {
          item.querySelector('span').textContent =
            itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + inCartQuantity;
          itemToAdd.quantity--;
        } else {
          alert('재고가 부족합니다.');
        }
      } else {
        const newCartItem = document.createElement('div');
        newCartItem.id = itemToAdd.id;
        newCartItem.className = 'flex justify-between items-center mb-2';
        newCartItem.innerHTML = `<span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>
        </div>`;
        cartList.appendChild(newCartItem);
        itemToAdd.quantity--;
      }
      calculateCart();
      lastSelectedProduct = selectedItem;
    }
  });

  cartList.addEventListener('click', function (event) {
    const target = event.target;
    if (
      target.classList.contains('quantity-change') ||
      target.classList.contains('remove-item')
    ) {
      const { productId } = target.dataset;
      const itemElement = document.getElementById(productId);
      const product = products.find(function (p) {
        return p.id === productId;
      });
      if (target.classList.contains('quantity-change')) {
        const quantityChange = parseInt(target.dataset.change);
        const newQty =
          parseInt(
            itemElement.querySelector('span').textContent.split('x ')[1]
          ) + quantityChange;
        if (
          newQty > 0 &&
          newQty <=
            product.quantity +
              parseInt(
                itemElement.querySelector('span').textContent.split('x ')[1]
              )
        ) {
          itemElement.querySelector('span').textContent =
            itemElement.querySelector('span').textContent.split('x ')[0] +
            'x ' +
            newQty;
          product.quantity -= quantityChange;
        } else if (newQty <= 0) {
          itemElement.remove();
          product.quantity -= quantityChange;
        } else {
          alert('재고가 부족합니다.');
        }
      } else if (target.classList.contains('remove-item')) {
        const remQty = parseInt(
          itemElement.querySelector('span').textContent.split('x ')[1]
        );
        product.quantity += remQty;
        itemElement.remove();
      }
      calculateCart();
    }
  });
}
