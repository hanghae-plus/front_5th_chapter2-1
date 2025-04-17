import {
  container,
  wrapper,
  cartList,
  cartTitle,
  cartTotal,
  select,
  addButton,
  stockStatus,
} from './src/components';

const products = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

let lastSelectedProduct,
  LoyaltyPoints = 0,
  finalPrice = 0,
  totalItemsInCart = 0;

main();
setupEventListeners();

function main() {
  const root = document.getElementById('app');

  wrapper.appendChild(cartTitle);
  wrapper.appendChild(cartList);
  wrapper.appendChild(cartTotal);
  wrapper.appendChild(select);
  wrapper.appendChild(addButton);
  wrapper.appendChild(stockStatus);
  container.appendChild(wrapper);
  root.appendChild(container);

  addSelectOptions();
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
    option.textContent = `${item.name} - ${item.price}원`;
    if (item.quantity === 0) option.disabled = true;
    select.appendChild(option);
  });
}

function calculateCart() {
  let totalPriceInCart = 0;
  totalItemsInCart = 0;
  finalPrice = 0;

  const cartItems = getCartItems();

  cartItems.map(({ id, quantity }) => {
    const product = products.find((p) => p.id === id);
    const itemTotalPrice = product.price * quantity;
    const discountRate = getItemDiscountRate(id, quantity);
    totalItemsInCart += quantity;
    totalPriceInCart += itemTotalPrice;
    finalPrice += itemTotalPrice * (1 - discountRate);
  });

  const discountRate = getFinalPriceDiscountRate(
    finalPrice,
    totalPriceInCart,
    totalItemsInCart
  );

  updateCartTotal(finalPrice, discountRate);
  updateStockStatus();
  renderLoyaltyPoints();
}

function updateCartTotal(finalPrice, discountRate) {
  cartTotal.textContent = `총액: ${Math.round(finalPrice)}원`;

  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotal.appendChild(span);
  }
}

function renderLoyaltyPoints() {
  LoyaltyPoints = Math.floor(finalPrice / 1000);
  let loyaltyPriceTag = document.getElementById('loyalty-points');
  if (!loyaltyPriceTag) {
    loyaltyPriceTag = document.createElement('span');
    loyaltyPriceTag.id = 'loyalty-points';
    loyaltyPriceTag.className = 'text-blue-500 ml-2';
    cartTotal.appendChild(loyaltyPriceTag);
  }
  loyaltyPriceTag.textContent = `(포인트: ${LoyaltyPoints})`;
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

function getItemDiscountRate(id, quantity) {
  const discountRate = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  };
  return quantity >= 10 ? discountRate[id] : 0;
}

function getFinalPriceDiscountRate(
  finalPrice,
  totalPriceInCart,
  totalItemsInCart
) {
  let discountRate = (totalPriceInCart - finalPrice) / totalPriceInCart;

  if (totalItemsInCart >= 30) {
    const bulkDiscount = finalPrice * 0.25;
    const itemDiscount = totalPriceInCart - finalPrice;
    if (bulkDiscount > itemDiscount) {
      return 0.25;
    }
  }

  if (isTuesday()) {
    finalPrice *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  return discountRate;
}

function getCartItems() {
  const cartItems = [...cartList.children];

  return cartItems.map((cart) => {
    const id = cart.id;
    const quantity = parseInt(
      cart.querySelector('span').textContent.split('x ')[1]
    );

    return {
      id,
      quantity,
    };
  });
}

function isTuesday() {
  return new Date().getDay() === 2;
}

function getSelectedProduct() {
  const selected = select.value;

  return products.find((p) => p.id === selected);
}

function setupEventListeners() {
  addButton.addEventListener('click', function () {
    const selectedItem = getSelectedProduct();

    if (selectedItem && selectedItem.quantity > 0) {
      const item = document.getElementById(selectedItem.id);
      if (item) {
        const inCartQuantity =
          parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
        if (inCartQuantity <= selectedItem.quantity) {
          item.querySelector('span').textContent =
            `${selectedItem.name} - ${selectedItem.price}원 x ${inCartQuantity}`;
          selectedItem.quantity--;
        } else {
          alert('재고가 부족합니다.');
        }
      } else {
        const newCartItem = document.createElement('div');
        newCartItem.id = selectedItem.id;
        newCartItem.className = 'flex justify-between items-center mb-2';
        newCartItem.innerHTML = `<span>${selectedItem.name} - ${selectedItem.price}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedItem.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedItem.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${selectedItem.id}">삭제</button>
        </div>`;
        cartList.appendChild(newCartItem);
        selectedItem.quantity--;
      }
      calculateCart();
      lastSelectedProduct = selectedItem;
    }
  });

  cartList.addEventListener('click', function (event) {
    const target = event.target;

    const isQuantityChange = target.classList.contains('quantity-change');
    const isRemoveItem = target.classList.contains('remove-item');

    if (!isQuantityChange && !isRemoveItem) return;

    const { productId } = target.dataset;
    const productElement = document.getElementById(productId);
    const product = products.find(function (product) {
      return product.id === productId;
    });
    const currentQuantity = parseInt(
      productElement.querySelector('span').textContent.split('x ')[1]
    );

    if (isQuantityChange) {
      const quantityChange = parseInt(target.dataset.change);

      const newQty = currentQuantity + quantityChange;
      if (newQty > 0 && newQty <= product.quantity + currentQuantity) {
        productElement.querySelector('span').textContent =
          `${productElement.querySelector('span').textContent.split('x ')[0]}x ${newQty}`;
        product.quantity -= quantityChange;
      } else if (newQty <= 0) {
        productElement.remove();
        product.quantity -= quantityChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (isRemoveItem) {
      product.quantity += currentQuantity;
      productElement.remove();
    }

    calculateCart();
  });
}
