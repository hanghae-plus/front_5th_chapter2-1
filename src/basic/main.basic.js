import productListInit from '../data/productList.json';
import { scheduleRepeatingAlert } from '../utills/utils';

function main() {
  let lastSel,
    bonusPts = 0,
    totalAmt = 0,
    itemCnt = 0;
  const productList = [...productListInit];
  const luckyItem = productList?.[Math.floor(Math.random() * productList?.length)];
  const suggestItem = productList?.find((item) => item.id !== lastSel && item.quantity > 0);

  const LUCKY_ITEM_DISCOUNT_RATE = 0.8;
  const SUGGEST_ITEM_DISCOUNT_RATE = 0.95;
  const root = document.getElementById('app');

  root.innerHTML = `
  <div class="bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 class="text-2xl font-bold mb-4">장바구니</h1>
      <div id="cart-items"></div>
      <div id="cart-total" class="text-xl font-bold my-4"></div>
      <select id="product-select" class="border rounded p-2 mr-2"></select>
      <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
      <div id="stock-status" class="text-sm text-gray-500 mt-2"></div>
    </div>
  </div>
`;

  const sel = document.getElementById('product-select');
  const cartDisp = document.getElementById('cart-items');
  const sum = document.getElementById('cart-total');
  const stockInfo = document.getElementById('stock-status');
  const addBtn = document.getElementById('add-to-cart');

  const luckyItemAlert = () => {
    scheduleRepeatingAlert({
      delayRange: 10000,
      interval: 30000,
      condition: () => Math.random() < 0.3 && luckyItem.quantity > 0,
      onTrigger: () => {
        luckyItem.price = Math.round(luckyItem.price * LUCKY_ITEM_DISCOUNT_RATE);
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
      condition: () => lastSel && suggestItem,
      onTrigger: () => {
        suggestItem.price = Math.round(suggestItem.price * SUGGEST_ITEM_DISCOUNT_RATE);
        alert(
          `${suggestItem.name}은(는) 어떠세요? 지금 구매하시면 ${Math.round((1 - SUGGEST_ITEM_DISCOUNT_RATE) * 100)}% 추가 할인!`,
        );
      },
    });
  };
  const renderBonusPts = () => {
    bonusPts = Math.floor(totalAmt / 1000);
    let ptsTag = document.getElementById('loyalty-points');
    if (!ptsTag) {
      ptsTag = document.createElement('span');
      ptsTag.id = 'loyalty-points';
      ptsTag.className = 'text-blue-500 ml-2';
      sum.appendChild(ptsTag);
    }
    ptsTag.textContent = '(포인트: ' + bonusPts + ')';
  };
  const updateSelOpts = () => {
    sel.innerHTML = '';
    productList.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = `${item.name} - ${item.price}원`;
      if (item.quantity === 0) option.disabled = true;
      sel.appendChild(option);
    });
  };
  function updateStockInfo() {
    let infoMsg = '';
    productList.forEach(function (item) {
      if (item.quantity < 5) {
        infoMsg +=
          item.name +
          ': ' +
          (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') +
          '\n';
      }
    });
    stockInfo.textContent = infoMsg;
  }

  const calcCart = () => {
    totalAmt = 0;
    itemCnt = 0;
    const cartItems = cartDisp.children;
    let subTot = 0;
    const cartItemsArray = Array.from(cartItems);
    cartItemsArray.forEach((item) => {
      console.log(item);
      const quantity = parseInt(item.querySelector('span').textContent.split('x ')[1]);
      const price = parseInt(item.querySelector('span').textContent.split('x ')[0].split(' - ')[1]);
      const itemTot = price * quantity;
      let disc = 0;
      itemCnt += quantity;
      subTot += itemTot;
      if (quantity >= 10) {
        if (item.id === 'p1') disc = 0.1;
        else if (item.id === 'p2') disc = 0.15;
        else if (item.id === 'p3') disc = 0.2;
        else if (item.id === 'p4') disc = 0.05;
        else if (item.id === 'p5') disc = 0.25;
      }
      totalAmt += itemTot * (1 - disc);
    });

    let discRate = 0;
    if (itemCnt >= 30) {
      const bulkDisc = totalAmt * 0.25;
      const itemDisc = subTot - totalAmt;
      if (bulkDisc > itemDisc) {
        totalAmt = subTot * (1 - 0.25);
        discRate = 0.25;
      } else {
        discRate = (subTot - totalAmt) / subTot;
      }
    } else {
      discRate = (subTot - totalAmt) / subTot;
    }
    if (new Date().getDay() === 2) {
      totalAmt *= 1 - 0.1;
      discRate = Math.max(discRate, 0.1);
    }
    sum.textContent = '총액: ' + Math.round(totalAmt) + '원';
    if (discRate > 0) {
      const span = document.createElement('span');
      span.className = 'text-green-500 ml-2';
      span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
      sum.appendChild(span);
    }
    updateStockInfo();
    renderBonusPts();
  };

  const handleCartAction = (event) => {
    const target = event.target;
    const action = target.dataset.action;
    const itemId = target.dataset.productId;

    if (!action || !itemId) return;

    const itemElem = document.getElementById(itemId);
    const item = productList.find((p) => p.id === itemId);
    const quantity = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);

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

      case 'plus':
        if (quantity + 1 < item.quantity + quantity) {
          itemElem.querySelector('span').textContent =
            `${item.name} - ${item.price}원 x ${quantity + 1}`;
          item.quantity--;
        } else {
          alert('재고가 부족합니다.');
        }
        break;

      case 'remove':
        item.quantity += quantity;
        itemElem.remove();
        break;
    }

    calcCart();
  };

  const handleProductAddBtnClick = () => {
    const selItem = sel.value;
    const itemToAdd = productList.find((p) => p.id === selItem);

    if (itemToAdd && itemToAdd.quantity > 0) {
      const item = document.getElementById(itemToAdd.id);
      if (item) {
        const newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
        if (newQty <= itemToAdd.quantity) {
          item.querySelector('span').textContent =
            itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
          itemToAdd.quantity--;
        } else {
          alert('재고가 부족합니다.');
        }
      } else {
        createItemText(itemToAdd);
      }
      calcCart();
      lastSel = selItem;
    }
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
    minusBtn.className = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
    minusBtn.dataset.productId = itemToAdd.id;
    minusBtn.dataset.action = 'minus';
    minusBtn.dataset.change = -1;
    minusBtn.textContent = '-';

    // ➕ 수량 증가 버튼
    const plusBtn = document.createElement('button');
    plusBtn.addEventListener('click', handleCartAction);
    plusBtn.className = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
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
    cartDisp.appendChild(newItem);
  };
  addBtn.addEventListener('click', handleProductAddBtnClick);
  updateSelOpts();
  suggestProductAlert();
  luckyItemAlert();
  calcCart();
}

main();
