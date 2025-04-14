const productList = [
  { id: 'p1', name: '상품1', value: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', value: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', value: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', value: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', value: 25000, quantity: 10 },
];

const discountTable = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

const handleCartItemsContainerClick = (event, cartItemsContainer) => {
  const clickedCartItemsContainer = event.target;

  if (
    clickedCartItemsContainer.classList.contains('quantity-change')
    || clickedCartItemsContainer.classList.contains('remove-item')
  ) {
    const cartItemId = clickedCartItemsContainer.dataset.productId;
    const cartItemElement = document.getElementById(cartItemId);
    const product = productList.find((p) => p.id === cartItemId);

    if (clickedCartItemsContainer.classList.contains('quantity-change')) {
      const quantityChange = parseInt(clickedCartItemsContainer.dataset.change);
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
    } else if (clickedCartItemsContainer.classList.contains('remove-item')) {
      const remQuantity = parseInt(
        cartItemElement.querySelector('span').textContent.split('x ')[1],
      );

      product.quantity += remQuantity;
      cartItemElement.remove();
    }

    calculateCart(cartItemsContainer);
  }
};

const handleAddButtonClick = (productSelect, cartItemsContainer) => {
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
    calculateCart(cartItemsContainer);
    lastSelectedProductId = selectedProductId;
  }
};

const totalAmountContainer = document.createElement('div');
const stockStatusContainer = document.createElement('div');

let lastSelectedProductId;
let bonusPoints = 0;
let totalAmount = 0;
let itemCount = 0;

const main = () => {
  const productSelect = document.createElement('select');
  const addButton = document.createElement('button');
  const cartItemsContainer = document.createElement('div');

  const mainRoot = document.getElementById('app');
  const mainContainer = document.createElement('div');
  const mainWrapper = document.createElement('div');
  const mainHeader = document.createElement('h1');

  productSelect.id = 'product-select';
  productSelect.className = 'border rounded p-2 mr-2';

  addButton.id = 'add-to-cart';
  addButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  addButton.textContent = '추가';
  addButton.addEventListener('click', () =>
    handleAddButtonClick(productSelect, cartItemsContainer),
  );

  cartItemsContainer.id = 'cart-items';
  cartItemsContainer.addEventListener('click', (event) =>
    handleCartItemsContainerClick(event, cartItemsContainer),
  );

  totalAmountContainer.id = 'cart-total';
  totalAmountContainer.className = 'text-xl font-bold my-4';

  stockStatusContainer.id = 'stock-status';
  stockStatusContainer.className = 'text-sm text-gray-500 mt-2';

  mainContainer.className = 'bg-gray-100 p-8';

  mainWrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  mainHeader.className = 'text-2xl font-bold mb-4';
  mainHeader.textContent = '장바구니';

  updateProductSelectOptions(productSelect);

  mainWrapper.appendChild(mainHeader);
  mainWrapper.appendChild(cartItemsContainer);
  mainWrapper.appendChild(totalAmountContainer);
  mainWrapper.appendChild(productSelect);
  mainWrapper.appendChild(addButton);
  mainWrapper.appendChild(stockStatusContainer);
  mainContainer.appendChild(mainWrapper);
  mainRoot.appendChild(mainContainer);

  calculateCart(cartItemsContainer);

  setTimeout(() => {
    setInterval(() => {
      const luckyItem =
        productList[Math.floor(Math.random() * productList.length)];

      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.value = Math.round(luckyItem.value * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateProductSelectOptions(productSelect);
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
          updateProductSelectOptions(productSelect);
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

const updateProductSelectOptions = (productSelect) => {
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

const getDiscountRate = (subTotal) => {
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

  return discountRate;
};

const calculateCart = (cartItemsContainer) => {
  totalAmount = 0;
  itemCount = 0;
  let subTotal = 0;

  const cartItems = [...cartItemsContainer.children];

  cartItems.forEach((item) => {
    const currentItem = productList.find((product) => product.id === item.id);
    if (!currentItem) return;

    const quantity = parseInt(
      item.querySelector('span').textContent.split('x ')[1],
    );

    const itemTotal = currentItem.value * quantity;
    const discount = quantity >= 10 ? (discountTable[currentItem.id] ?? 0) : 0;

    itemCount += quantity;
    subTotal += itemTotal;
    totalAmount += itemTotal * (1 - discount);
  });

  totalAmountContainer.textContent = '총액: ' + Math.round(totalAmount) + '원';

  const discountRate = getDiscountRate(subTotal);

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
