import productsInit from '../data/products.json';
import { scheduleRepeatingAlert } from '../utils/utils';

function main() {
  let lastSelectedItemId,
    totalAmount = 0,
    itemCount = 0;
  const products = [...productsInit];
  const luckyItem = products?.[Math.floor(Math.random() * products?.length)];

  const suggestItem = products?.find(
    (item) => item.id !== lastSelectedItemId && item.quantity > 0,
  );

  const LUCKY_ITEM_DISCOUNT_RATE = 0.8;
  const SUGGEST_ITEM_DISCOUNT_RATE = 0.95;
  const root = document.getElementById('app');

  root.innerHTML = /* HTML */ `
    <div class="bg-gray-100 p-8">
      <div
        class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8"
      >
        <h1 class="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items"></div>
        <div id="cart-total" class="text-xl font-bold my-4"></div>
        <select id="product-select" class="border rounded p-2 mr-2"></select>
        <button
          id="add-to-cart"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          추가
        </button>
        <div id="stock-status" class="text-sm text-gray-500 mt-2"></div>
      </div>
    </div>
  `;

  const selectedOption = document.getElementById('product-select');
  const addedProductInfo = document.getElementById('cart-items');
  const totalAmountInfo = document.getElementById('cart-total');
  const stockInfo = document.getElementById('stock-status');
  const addBtn = document.getElementById('add-to-cart');

  const luckyItemAlert = () => {
    scheduleRepeatingAlert({
      delayRange: 10000,
      interval: 30000,
      condition: () => Math.random() < 0.3 && luckyItem.quantity > 0,
      onTrigger: () => {
        luckyItem.price = Math.round(
          luckyItem.price * LUCKY_ITEM_DISCOUNT_RATE,
        );
        alert(
          `번개세일! ${luckyItem.name}이(가) ${Math.round((1 - LUCKY_ITEM_DISCOUNT_RATE) * 100)}% 할인 중입니다!`,
        );
      },
    });
  };

  const suggestProductAlert = () => {
    scheduleRepeatingAlert({
      delayRange: 20000,
      interval: 60000,
      condition: () => lastSelectedItemId && suggestItem,
      onTrigger: () => {
        suggestItem.price = Math.round(
          suggestItem.price * SUGGEST_ITEM_DISCOUNT_RATE,
        );
        alert(
          `${suggestItem.name}은(는) 어떠세요? 지금 구매하시면 ${Math.round((1 - SUGGEST_ITEM_DISCOUNT_RATE) * 100)}% 추가 할인!`,
        );
      },
    });
  };

  const renderBonusPoints = (totalAmount) => {
    const bonusPoints = Math.floor(totalAmount / 1000);
    let loyaltyPoints = document.getElementById('loyalty-points');
    if (!loyaltyPoints) {
      loyaltyPoints = document.createElement('span');
      loyaltyPoints.id = 'loyalty-points';
      loyaltyPoints.className = 'text-blue-500 ml-2';
      totalAmountInfo.appendChild(loyaltyPoints);
    }
    loyaltyPoints.textContent = `(포인트: ${bonusPoints})`;
  };

  const updateSelectedOption = () => {
    selectedOption.innerHTML = '';
    products.forEach((product) => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = `${product.name} - ${product.price}원`;
      if (product.quantity === 0) option.disabled = true;
      selectedOption.appendChild(option);
    });
  };
  const updateStockInfo = () => {
    let infoMessage = '';
    products.forEach((item) => {
      if (item.quantity < 5) {
        infoMessage += `${item.name}: ${
          item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)` : '품절'
        }\n`;
      }
    });
    stockInfo.textContent = infoMessage;
  };

  const calcDiscountRate = () => {
    let discountRate = 0;

    const cartItems = addedProductInfo.children;
    const cartItemsArray = Array.from(cartItems);
    cartItemsArray.forEach((item) => {
      const quantity = parseInt(
        item.querySelector('span').textContent.split('x ')[1],
      );

      if (quantity >= 10) {
        if (item.id === 'p1') discountRate = 0.1;
        else if (item.id === 'p2') discountRate = 0.15;
        else if (item.id === 'p3') discountRate = 0.2;
        else if (item.id === 'p4') discountRate = 0.05;
        else if (item.id === 'p5') discountRate = 0.25;
      }
    });

    return discountRate;
  };

  const calcTotalPrice = () => {
    let totalPrice = 0;
    const cartItems = addedProductInfo.children;
    const cartItemsArray = Array.from(cartItems);
    cartItemsArray.forEach((item) => {
      const price = parseInt(
        item.querySelector('span').textContent.split('x ')[0].split(' - ')[1],
      );
      const quantity = parseInt(
        item.querySelector('span').textContent.split('x ')[1],
      );
      totalPrice += price * quantity;
    });

    return totalPrice;
  };

  const tuesdayDiscount = (discountRate) => {
    if (new Date().getDay() === 2) {
      totalAmount *= 1 - 0.1;
      discountRate = Math.max(discountRate, 0.1);
    }
  };

  const calcCart = () => {
    totalAmount = 0;
    let discountRate = calcDiscountRate();
    let totalPrice = calcTotalPrice();

    totalAmount += totalPrice * (1 - discountRate);
    if (itemCount >= 30) {
      const bulkDiscount = totalAmount * 0.25;
      const itemDiscount = totalPrice - totalAmount;
      if (bulkDiscount > itemDiscount) {
        totalAmount = totalPrice * (1 - 0.25);
        discountRate = 0.25;
      } else {
        discountRate = (totalPrice - totalAmount) / totalPrice;
      }
    } else {
      discountRate = (totalPrice - totalAmount) / totalPrice;
    }
    tuesdayDiscount(discountRate);
    totalAmountInfo.textContent = `총액: ${Math.round(totalAmount)}원`;
    if (discountRate > 0) {
      const span = document.createElement('span');
      span.className = 'text-green-500 ml-2';
      span.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
      totalAmountInfo.appendChild(span);
    }
    updateStockInfo();
    renderBonusPoints(totalAmount);
  };

  const handleCartAction = (event) => {
    const target = event.target;
    const action = target.dataset.action;
    const itemId = target.dataset.productId;

    if (!action || !itemId) return;

    const itemElem = document.getElementById(itemId);
    const item = products.find((p) => p.id === itemId);
    const quantity = parseInt(
      itemElem.querySelector('span').textContent.split('x ')[1],
    );

    // TODO: 수량 변경 버튼 클릭 시 수량 변경 다시보기
    switch (action) {
      case 'minus':
        itemElem.querySelector('span').textContent =
          `${item.name} - ${item.price}원 x ${quantity - 1}`;
        if (quantity > 1) {
          item.quantity++;
        } else {
          itemElem.remove();
        }
        break;

      case 'plus': {
        if (item.quantity > 0) {
          const newQty = quantity + 1;
          itemElem.querySelector('span').textContent =
            `${item.name} - ${item.price}원 x ${newQty}`;
          item.quantity--;
          console.log(newQty, item.quantity);
        } else {
          alert('재고가 부족합니다.');
        }
        break;
      }
      case 'remove':
        item.quantity += quantity;
        itemElem.remove();
        break;
    }

    calcCart();
  };

  const handleProductAddBtnClick = () => {
    const selItem = selectedOption.value;
    const itemToAdd = products.find((product) => product.id === selItem);

    if (itemToAdd && itemToAdd.quantity > 0) {
      const item = document.getElementById(itemToAdd.id);
      if (item) {
        const newQty =
          parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
        if (newQty <= itemToAdd.quantity) {
          item.querySelector('span').textContent =
            `${itemToAdd.name} - ${itemToAdd.price}원 x ${newQty}`;
          itemToAdd.quantity--;
        } else {
          alert('재고가 부족합니다.');
        }
      } else {
        createItemText(itemToAdd);
        itemToAdd.quantity--;
      }
      lastSelectedItemId = selItem;
    }
    calcCart();
  };

  const createItemText = (itemToAdd) => {
    const newItem = document.createElement('div');
    newItem.id = itemToAdd.id;
    newItem.className = 'flex justify-between items-center mb-2';

    const itemText = document.createElement('span');
    itemText.textContent = `${itemToAdd.name} - ${itemToAdd.price}원 x 1`;

    const btnGroup = document.createElement('div');

    const minusBtn = document.createElement('button');
    minusBtn.addEventListener('click', handleCartAction);
    minusBtn.className =
      'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
    minusBtn.dataset.productId = itemToAdd.id;
    minusBtn.dataset.action = 'minus';
    minusBtn.dataset.change = -1;
    minusBtn.textContent = '-';

    // ➕ 수량 증가 버튼
    const plusBtn = document.createElement('button');
    plusBtn.addEventListener('click', handleCartAction);
    plusBtn.className =
      'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
    plusBtn.dataset.productId = itemToAdd.id;
    plusBtn.dataset.action = 'plus';
    plusBtn.dataset.change = 1;
    plusBtn.textContent = '+';

    // 삭제 버튼
    const removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', handleCartAction);
    removeBtn.className = 'remove-item bg-red-500 text-white px-2 py-1 rounded';
    removeBtn.dataset.productId = itemToAdd.id;
    removeBtn.dataset.action = 'remove';
    removeBtn.textContent = '삭제';

    // 버튼들을 버튼 그룹에 추가
    btnGroup.appendChild(minusBtn);
    btnGroup.appendChild(plusBtn);
    btnGroup.appendChild(removeBtn);

    // 텍스트 + 버튼 묶어서 newItem에 추가
    newItem.appendChild(itemText);
    newItem.appendChild(btnGroup);

    // 장바구니에 추가
    addedProductInfo.appendChild(newItem);
  };
  addBtn.addEventListener('click', handleProductAddBtnClick);
  updateSelectedOption();
  suggestProductAlert();
  luckyItemAlert();
  calcCart();
}

main();
