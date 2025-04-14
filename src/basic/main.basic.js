const productList = [
  { id: 'p1', name: '상품1', value: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', value: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', value: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', value: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', value: 25000, quantity: 10 },
];

const handleCartItemsContainerClick = (event) => {
  const cartItemsContainer = event.target;

  if (
    cartItemsContainer.classList.contains('quantity-change')
    || cartItemsContainer.classList.contains('remove-item')
  ) {
    console.log(cartItemsContainer.dataset);
    const cartItemId = cartItemsContainer.dataset.productId;
    const cartItemElement = document.getElementById(cartItemId);
    console.log(cartItemElement);
    const product = productList.find((p) => p.id === cartItemId);

    if (cartItemsContainer.classList.contains('quantity-change')) {
      const quantityChange = parseInt(cartItemsContainer.dataset.change);
      const newQuantity =
        parseInt(
          cartItemElement.querySelector('span').textContent.split('x ')[1],
        ) + quantityChange;

      if (
        newQuantity > 0
        && newQuantity
          <= product.quantity
            + parseInt(
              cartItemElement.querySelector('span').textContent.split('x ')[1],
            )
      ) {
        cartItemElement.querySelector('span').textContent =
          cartItemElement.querySelector('span').textContent.split('x ')[0]
          + 'x '
          + newQuantity;
        product.quantity -= quantityChange;
      } else if (newQuantity <= 0) {
        cartItemElement.remove();
        product.quantity -= quantityChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (cartItemsContainer.classList.contains('remove-item')) {
      const remQuantity = parseInt(
        cartItemElement.querySelector('span').textContent.split('x ')[1],
      );

      product.quantity += remQuantity;
      cartItemElement.remove();
    }

    calcCart();
  }
};

const handleAddButtonClick = () => {
  const selectedProductId = productSelect.value;
  const itemToAdd = productList.find(
    (product) => product.id === selectedProductId,
  );

  if (itemToAdd && itemToAdd.quantity > 0) {
    const item = document.getElementById(itemToAdd.id);

    if (item) {
      const newQuantity =
        parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;

      if (newQuantity <= itemToAdd.quantity) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.value + '원 x ' + newQuantity;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = document.createElement('div');

      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML = `
        <span>${itemToAdd.name} - ${itemToAdd.value}원 x 1</span>
        <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>
        </div>
      `;
      cartItemsContainer.appendChild(newItem);
      itemToAdd.quantity--;
    }
    calcCart();
    lastSelectedProductId = selectedProductId;
  }
};

const productSelect = document.createElement('select');
const addButton = document.createElement('button');
const cartItemsContainer = document.createElement('div');
const totalAmountContainer = document.createElement('div');
const stockStatusContainer = document.createElement('div');

let lastSelectedProductId;
let bonusPoints = 0;
let totalAmount = 0;
let itemCount = 0;

const main = () => {
  const mainRoot = document.getElementById('app');
  const mainContainer = document.createElement('div');
  const mainWrapper = document.createElement('div');
  const mainHeader = document.createElement('h1');

  productSelect.id = 'product-select';
  productSelect.className = 'border rounded p-2 mr-2';

  addButton.id = 'add-to-cart';
  addButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addButton.textContent = '추가';
  addButton.addEventListener('click', handleAddButtonClick);

  cartItemsContainer.id = 'cart-items';
  cartItemsContainer.addEventListener('click', handleCartItemsContainerClick);

  totalAmountContainer.id = 'cart-total';
  totalAmountContainer.className = 'text-xl font-bold my-4';

  stockStatusContainer.id = 'stock-status';
  stockStatusContainer.className = 'text-sm text-gray-500 mt-2';

  mainContainer.className = 'bg-gray-100 p-8';

  mainWrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  mainHeader.className = 'text-2xl font-bold mb-4';
  mainHeader.textContent = '장바구니';

  updateProductSelectOptions();

  mainWrapper.appendChild(mainHeader);
  mainWrapper.appendChild(cartItemsContainer);
  mainWrapper.appendChild(totalAmountContainer);
  mainWrapper.appendChild(productSelect);
  mainWrapper.appendChild(addButton);
  mainWrapper.appendChild(stockStatusContainer);
  mainContainer.appendChild(mainWrapper);
  mainRoot.appendChild(mainContainer);

  calcCart();

  setTimeout(() => {
    setInterval(() => {
      const luckyItem =
        productList[Math.floor(Math.random() * productList.length)];

      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.value = Math.round(luckyItem.value * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateProductSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(() => {
    setInterval(() => {
      if (lastSelectedProductId) {
        const suggest = productList.find(
          (item) => item.id !== lastSelectedProductId && item.quantity > 0,
        );

        if (suggest) {
          alert(
            suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!',
          );
          suggest.value = Math.round(suggest.value * 0.95);
          updateProductSelectOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

const updateProductSelectOptions = () => {
  const newSelectOptions = productList.reduce((newOptions, item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = `${item.name} - ${item.value}원`;
    if (item.quantity === 0) option.disabled = true;
    newOptions.appendChild(option);
    return newOptions;
  }, document.createDocumentFragment());

  productSelect.replaceChildren(newSelectOptions);
};

const calcCart = () => {
  totalAmount = 0;
  itemCount = 0;

  const cartItems = cartItemsContainer.children;
  let subTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    let currentItem;

    for (let j = 0; j < productList.length; j++) {
      if (productList[j].id === cartItems[i].id) {
        currentItem = productList[j];
        break;
      }
    }

    const quantity = parseInt(
      cartItems[i].querySelector('span').textContent.split('x ')[1],
    );
    const itemTotal = currentItem.value * quantity;
    let discount = 0;

    itemCount += quantity;
    subTotal += itemTotal;

    if (quantity >= 10) {
      if (currentItem.id === 'p1') discount = 0.1;
      else if (currentItem.id === 'p2') discount = 0.15;
      else if (currentItem.id === 'p3') discount = 0.2;
      else if (currentItem.id === 'p4') discount = 0.05;
      else if (currentItem.id === 'p5') discount = 0.25;
    }

    totalAmount += itemTotal * (1 - discount);
  }

  let discountRate = 0;

  if (itemCount >= 30) {
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = subTotal - totalAmount;

    if (bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }
  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  totalAmountContainer.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    totalAmountContainer.appendChild(span);
  }

  updateStockStatus();
  renderBonusPoints();
};

const renderBonusPoints = () => {
  const bonusPoints = Math.floor(totalAmount / 1000);

  const bonusPointsTag =
    document.getElementById('loyalty-points')
    ?? (() => {
      const el = document.createElement('span');
      el.id = 'loyalty-points';
      el.className = 'text-blue-500 ml-2';
      totalAmountContainer.appendChild(el);
      return el;
    })();

  bonusPointsTag.textContent = `(포인트: ${bonusPoints})`;
};

const updateStockStatus = () => {
  const infoMessage = productList.reduce((acc, item) => {
    if (item.quantity < 5) {
      const status =
        item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)` : '품절';
      return `${acc}${item.name}: ${status}\n`;
    }
    return acc;
  }, '');

  stockStatusContainer.textContent = infoMessage;
};

main();
