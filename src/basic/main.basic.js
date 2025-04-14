import createDiscountEvent from './createDiscountEvent';

let products, productSelectBox, addProductToCartButton, cartList, cartTotalPrice, stockStatus;
let lastSel = null;
let bonusPts = 0;
let totalPrice = 0;
let totalProductCount = 0;

const DISCOUNT_EVENT_TYPE = {
  FLASH: 'flash',
  SUGGEST: 'suggest',
};

const main = () => {
  products = [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ];

  const background = document.createElement('div');
  const main = document.getElementById('app');
  const content = document.createElement('div');
  const title = document.createElement('h1');

  cartList = document.createElement('div');
  cartTotalPrice = document.createElement('div');
  productSelectBox = document.createElement('select');
  addProductToCartButton = document.createElement('button');
  stockStatus = document.createElement('div');

  cartList.id = 'cart-items';
  cartTotalPrice.id = 'cart-total';
  productSelectBox.id = 'product-select';
  addProductToCartButton.id = 'add-to-cart';
  stockStatus.id = 'stock-status';

  background.className = 'bg-gray-100 p-8';
  content.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  title.className = 'text-2xl font-bold mb-4';
  cartTotalPrice.className = 'text-xl font-bold my-4';
  productSelectBox.className = 'border rounded p-2 mr-2';
  addProductToCartButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stockStatus.className = 'text-sm text-gray-500 mt-2';

  title.textContent = '장바구니';
  addProductToCartButton.textContent = '추가';

  updateSelectBoxOptions();

  content.appendChild(title);
  content.appendChild(cartList);
  content.appendChild(cartTotalPrice);
  content.appendChild(productSelectBox);
  content.appendChild(addProductToCartButton);
  content.appendChild(stockStatus);
  background.appendChild(content);
  main.appendChild(background);

  calcCart();

  createDiscountEvent(DISCOUNT_EVENT_TYPE.FLASH);
  createDiscountEvent(DISCOUNT_EVENT_TYPE.SUGGEST);
};

const updateSelectBoxOptions = () => {
  productSelectBox.innerHTML = '';
  products.forEach(({ id, name, price, quantity }) => {
    const option = document.createElement('option');

    option.value = id;
    option.textContent = `${name} - ${price}원`;

    if (quantity === 0) {
      option.disabled = true;
    }

    productSelectBox.appendChild(option);
  });
};

const calcCart = () => {
  totalPrice = 0;
  totalProductCount = 0;

  const cartItems = cartList.children;
  let totalPriceBeforeDiscount = 0;

  for (let i = 0; i < cartItems.length; i++) {
    let currentProduct;

    for (let j = 0; j < products.length; j++) {
      if (products[j].id === cartItems[i].id) {
        currentProduct = products[j];
        break;
      }
    }

    const { id, price } = currentProduct;
    const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
    const productTotalPrice = price * quantity;

    let disc = 0;

    totalProductCount += quantity;
    totalPriceBeforeDiscount += productTotalPrice;

    if (quantity >= 10) {
      if (id === 'p1') disc = 0.1;
      else if (id === 'p2') disc = 0.15;
      else if (id === 'p3') disc = 0.2;
      else if (id === 'p4') disc = 0.05;
      else if (id === 'p5') disc = 0.25;
    }

    totalPrice += productTotalPrice * (1 - disc);
  }

  let discRate = 0;

  if (totalProductCount >= 30) {
    const bulkDisc = totalPrice * 0.25;
    const itemDisc = totalPriceBeforeDiscount - totalPrice;

    if (bulkDisc > itemDisc) {
      totalPrice = totalPriceBeforeDiscount * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (totalPriceBeforeDiscount - totalPrice) / totalPriceBeforeDiscount;
    }
  } else {
    discRate = (totalPriceBeforeDiscount - totalPrice) / totalPriceBeforeDiscount;
  }

  if (new Date().getDay() === 2) {
    totalPrice *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }

  cartTotalPrice.textContent = `총액: ${Math.round(totalPrice)}원`;

  if (discRate > 0) {
    const span = document.createElement('span');

    span.className = 'text-green-500 ml-2';
    span.textContent = `(${(discRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalPrice.appendChild(span);
  }

  updateStockInfo();
  renderBonusPts();
};

const renderBonusPts = () => {
  bonusPts = Math.floor(totalPrice / 1000);

  let ptsTag = document.getElementById('loyalty-points');

  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    cartTotalPrice.appendChild(ptsTag);
  }

  ptsTag.textContent = `(포인트: ${bonusPts})`;
};

const updateStockInfo = () => {
  let infoMsg = '';

  products.forEach(({ name, quantity }) => {
    if (quantity < 5) {
      infoMsg += `${name}: ${quantity > 0 ? `재고 부족 (${quantity}개 남음)` : '품절'}\n`;
    }
  });

  stockStatus.textContent = infoMsg;
};

main();

addProductToCartButton.addEventListener('click', () => {
  const selItem = productSelectBox.value;
  const itemToAdd = products.find(({ id }) => id === selItem);

  if (itemToAdd && itemToAdd.quantity > 0) {
    const { id, name, price, quantity } = itemToAdd;
    const item = document.getElementById(id);

    if (item) {
      const newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;

      if (newQty <= quantity) {
        item.querySelector('span').textContent = `${name} - ${price}원 x ${newQty}`;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = document.createElement('div');

      newItem.id = id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML = `
        <span>${name} - ${price}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${id}">삭제</button>
        </div>`;
      cartList.appendChild(newItem);
      itemToAdd.quantity--;
    }

    calcCart();
    lastSel = selItem;
  }
});

cartList.addEventListener('click', (event) => {
  const tgt = event.target;

  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);
    const prod = products.find((p) => p.id === prodId);

    if (tgt.classList.contains('quantity-change')) {
      const qtyChange = parseInt(tgt.dataset.change);
      const newQty =
        parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;

      if (
        newQty > 0 &&
        newQty <=
          prod.quantity + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          `${itemElem.querySelector('span').textContent.split('x ')[0]}x ${newQty}`;
        prod.quantity -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.quantity -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      const remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);

      prod.quantity += remQty;
      itemElem.remove();
    }

    calcCart();
  }
});
