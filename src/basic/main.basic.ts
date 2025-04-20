import { PRODUCTS, PROCUCTS_DISCOUT } from './services/cartsService';

const discountRate = (precent: number) => 1 - precent / 100;
const DISCOUNT_RATIO_FLASH_SALE = discountRate(20);
const DISCOUNT_RATIO_CTA_SALE = discountRate(5);
const TUESDAY = 2;

let $selectBox, $addItemBtn, $cartsWrapper, $totalPrice, $stockStates;
let lastSelected,
  rewardPoints = 0,
  totalAmount = 0,
  itemCount = 0;

const states = {
  sel: null,
  addBtn: null,
  cartDisp: null,
  sum: null,
  stockInfo: null,
  lastSel: null,
  bonusPts: 0,
  totalAmt: 0,
  itemCnt: 0,
};

function main() {
  const root: HTMLElement | null = document.getElementById('app');

  const cont = document.createElement('div');
  cont.className = 'bg-gray-100 p-8';

  const wrap = document.createElement('div');
  wrap.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  const hTxt = document.createElement('h1');
  hTxt.className = 'text-2xl font-bold mb-4';
  hTxt.textContent = '장바구니';

  $cartsWrapper = document.createElement('div');
  $cartsWrapper.id = 'cart-items';

  $totalPrice = document.createElement('div');
  $totalPrice.id = 'cart-total';
  $totalPrice.className = 'text-xl font-bold my-4';

  $selectBox = document.createElement('select');
  $selectBox.id = 'product-select';
  $selectBox.className = 'border rounded p-2 mr-2';

  $addItemBtn = document.createElement('button');
  $addItemBtn.id = 'add-to-cart';
  $addItemBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  $addItemBtn.textContent = '추가';

  $stockStates = document.createElement('div');
  $stockStates.id = 'stock-status';
  $stockStates.className = 'text-sm text-gray-500 mt-2';

  renderOptions({ selectBox: $selectBox });

  wrap.appendChild(hTxt);
  wrap.appendChild($cartsWrapper);
  wrap.appendChild($totalPrice);
  wrap.appendChild($selectBox);
  wrap.appendChild($addItemBtn);
  wrap.appendChild($stockStates);
  cont.appendChild(wrap);
  root?.appendChild(cont);

  calcCart();

  // 번개 세일
  setTimeout(() => {
    setInterval(() => {
      const luckyItem = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * DISCOUNT_RATIO_FLASH_SALE);
        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        renderOptions({ selectBox: $selectBox });
      }
    }, 30000);
  }, Math.random() * 10000);

  // 추천 세일
  setTimeout(() => {
    setInterval(() => {
      if (!lastSelected) return;
      const suggest = PRODUCTS.find((item) => item.id !== lastSelected && item.quantity > 0);

      if (!suggest) return;

      alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
      suggest.price = Math.round(suggest.price * DISCOUNT_RATIO_CTA_SALE);
      renderOptions({ selectBox: $selectBox });
    }, 60000);
  }, Math.random() * 20000);
}

/** 선택 상품 옵션 업데이트 */
function renderOptions({ selectBox }) {
  selectBox.innerHTML = PRODUCTS.map(({ id, name, price, quantity }) => {
    return `<option value=${id} ${quantity === 0 ? 'disabled' : ''}>${name} - ${price}원</option>`;
  });
}

/** 장바구니 가격 계산 */
function calcCart() {
  totalAmount = 0;
  itemCount = 0;
  const cartItems = $cartsWrapper.children;
  let subTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (() => {
      let currentItem;

      for (let j = 0; j < PRODUCTS.length; j++) {
        if (PRODUCTS[j].id === cartItems[i].id) {
          currentItem = PRODUCTS[j];
          break;
        }
      }
      const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);

      let itemTotal = currentItem.price * quantity;
      itemCount += quantity;
      subTotal += itemTotal;

      let disc = 0;

      if (quantity >= 10) disc = PROCUCTS_DISCOUT[currentItem.id];

      totalAmount += itemTotal * (1 - disc);
    })();
  }

  let discRate = 0;

  if (itemCount >= 30) {
    let bulkDisc = totalAmount * 0.25;
    let itemDisc = subTotal - totalAmount;

    if (bulkDisc > itemDisc) {
      totalAmount = subTotal * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discRate = (subTotal - totalAmount) / subTotal;
  }

  if (new Date().getDay() === TUESDAY) {
    totalAmount *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }

  $totalPrice.textContent = `총액: ${Math.round(totalAmount)}원`;

  if (discRate > 0) {
    let span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = `(${(discRate * 100).toFixed(1)}% 할인 적용)`;
    $totalPrice.appendChild(span);
  }
  updateStockInfo();
  renderBonusPts();
}

const renderBonusPts = () => {
  rewardPoints = Math.floor(totalAmount / 1000);
  let ptsTag = document.getElementById('loyalty-points');

  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    $totalPrice.appendChild(ptsTag);
  }
  ptsTag.textContent = `(포인트: ${rewardPoints})`;
};

/** 재고 정보 업데이트 */
function updateStockInfo() {
  let infoMsg = '';
  PRODUCTS.forEach((item) => {
    if (item.quantity < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.quantity > 0 ? `재고 부족 (${item.quantity}'개 남음)` : '품절') +
        '\n';
    }
  });
  $stockStates.textContent = infoMsg;
}

main();

const handleAddCartsItem = (e: MouseEvent) => {
  e.preventDefault();

  let selectedTarget = $selectBox.value;
  let itemToAdd = PRODUCTS.find((p) => {
    return p.id === selectedTarget;
  });

  if (itemToAdd && itemToAdd.quantity > 0) {
    let item = document.getElementById(itemToAdd.id);

    if (item) {
      const $item = item.querySelector('span');
      if (!$item) return;
      if (!$item.textContent) return;
      let newQty = parseInt($item.textContent.split('x ')[1]) + 1;

      if (newQty <= itemToAdd.quantity) {
        $item.textContent = `${itemToAdd.name} - ${itemToAdd.price}원 x ${newQty}`;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = document.createElement('div');
      newItem.id = itemToAdd.id;

      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML = /* html */ `
      <span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>
      </div>
      `;
      $cartsWrapper.appendChild(newItem);
      itemToAdd.quantity--;
    }

    calcCart();
    lastSelected = selectedTarget;
  }
};

$addItemBtn.addEventListener('click', handleAddCartsItem);

$cartsWrapper.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
    const productId = target.dataset.productId;
    const productElement = document.getElementById(productId);
    if (!productElement) return;
    const product = PRODUCTS.find((p) => {
      return p.id === productId;
    });

    if (!product) return;

    if (target.classList.contains('quantity-change')) {
      const qtyChange = parseInt(target.dataset.change);
      const itemEl = productElement.querySelector('span');
      if (!itemEl) return;
      if (!itemEl.textContent) return;

      const newQuantity = parseInt(itemEl.textContent.split('x ')[1]) + qtyChange;

      if (
        newQuantity > 0 &&
        newQuantity <= product.quantity + parseInt(itemEl.textContent.split('x ')[1])
      ) {
        itemEl.textContent = itemEl.textContent.split('x ')[0] + 'x ' + newQuantity;
        product.quantity -= qtyChange;
      } else if (newQuantity <= 0) {
        productElement.remove();
        product.quantity -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (target.classList.contains('remove-item')) {
      const itemEl = productElement.querySelector('span');
      if (!itemEl) return;
      if (!itemEl.textContent) return;
      const remQty = parseInt(itemEl.textContent.split('x ')[1]);
      product.quantity += remQty;
      productElement.remove();
    }

    calcCart();
  }
});
