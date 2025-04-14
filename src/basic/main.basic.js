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
let totalAmt = 0;
let itemCnt = 0;

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
  productSelect.innerHTML = '';
  productList.forEach((item) => {
    const selectOption = document.createElement('option');

    selectOption.value = item.id;
    selectOption.textContent = item.name + ' - ' + item.value + '원';
    if (item.quantity === 0) selectOption.disabled = true;

    productSelect.appendChild(selectOption);
  });
};

const calcCart = () => {
  totalAmt = 0;
  itemCnt = 0;

  const cartItems = cartItemsContainer.children;
  let subTot = 0;

  for (let i = 0; i < cartItems.length; i++) {
    let curItem;

    for (let j = 0; j < productList.length; j++) {
      if (productList[j].id === cartItems[i].id) {
        curItem = productList[j];
        break;
      }
    }

    const quantity = parseInt(
      cartItems[i].querySelector('span').textContent.split('x ')[1],
    );
    const itemTot = curItem.value * quantity;
    let discount = 0;

    itemCnt += quantity;
    subTot += itemTot;

    if (quantity >= 10) {
      if (curItem.id === 'p1') discount = 0.1;
      else if (curItem.id === 'p2') discount = 0.15;
      else if (curItem.id === 'p3') discount = 0.2;
      else if (curItem.id === 'p4') discount = 0.05;
      else if (curItem.id === 'p5') discount = 0.25;
    }

    totalAmt += itemTot * (1 - discount);
  }

  let discountRate = 0;

  if (itemCnt >= 30) {
    const bulkDiscount = totalAmt * 0.25;
    const itemDiscount = subTot - totalAmt;

    if (bulkDiscount > itemDiscount) {
      totalAmt = subTot * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subTot - totalAmt) / subTot;
    }
  } else {
    discountRate = (subTot - totalAmt) / subTot;
  }
  if (new Date().getDay() === 2) {
    totalAmt *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  totalAmountContainer.textContent = '총액: ' + Math.round(totalAmt) + '원';

  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    totalAmountContainer.appendChild(span);
  }

  updateStockInfo();
  renderBonusPoints();
};

const renderBonusPoints = () => {
  let bonusPointsTag = document.getElementById('loyalty-points');

  if (!bonusPointsTag) {
    bonusPointsTag = document.createElement('span');
    bonusPointsTag.id = 'loyalty-points';
    bonusPointsTag.className = 'text-blue-500 ml-2';
    totalAmountContainer.appendChild(bonusPointsTag);
  }

  bonusPoints = Math.floor(totalAmt / 1000);
  bonusPointsTag.textContent = '(포인트: ' + bonusPoints + ')';
};

const updateStockInfo = () => {
  let infoMsg = '';

  productList.forEach((item) => {
    if (item.quantity < 5) {
      infoMsg +=
        item.name
        + ': '
        + (item.quantity > 0 ?
          '재고 부족 (' + item.quantity + '개 남음)'
        : '품절')
        + '\n';
    }
  });

  stockStatusContainer.textContent = infoMsg;
};

main();
