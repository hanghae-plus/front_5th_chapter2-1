import { products } from './constant';
import { CartContainer, CartWrapper } from './component';

// TODO: item, product 의미는 다르지만 사용되는 목적은 동일하기에 관리 차원에서 통일.
// id 값이 테스트에 영향을 미치기 때문에 한번에 테스트 코드와 같이 수정할 예정

let lastSelectProduct,
  rewardPoints = 0,
  totalAmount = 0,
  productCount = 0;

function main() {
  const root = document.getElementById('app');
  const container = CartContainer();
  const wrapper = CartWrapper();

  container.appendChild(wrapper);
  root.appendChild(container);

  updateSelectOption();
  updateCartSummary();

  setTimeout(function () {
    setInterval(function () {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelectOption();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSelectProduct) {
        const suggest = products.find(function (item) {
          return item.id !== lastSelectProduct && item.q > 0;
        });
        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.val = Math.round(suggest.val * 0.95);
          updateSelectOption();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function updateSelectOption() {
  document.getElementById('product-select').innerHTML = '';

  products.forEach(function (item) {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.val + '원';
    if (item.q === 0) opt.disabled = true;
    document.getElementById('product-select').appendChild(opt);
  });
}

function updateCartSummary() {
  totalAmount = 0;
  productCount = 0;

  const $cartItems = document.getElementById('cart-items');
  const cartItems = $cartItems.children;
  let subTot = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem;

      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          curItem = products[j];
          break;
        }
      }

      const q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      const itemTot = curItem.val * q;
      let disc = 0;

      productCount += q;
      subTot += itemTot;

      if (q >= 10) {
        if (curItem.id === 'p1') {
          disc = 0.1;
        } else if (curItem.id === 'p2') {
          disc = 0.15;
        } else if (curItem.id === 'p3') {
          disc = 0.2;
        } else if (curItem.id === 'p4') {
          disc = 0.05;
        } else if (curItem.id === 'p5') {
          disc = 0.25;
        }
      }
      totalAmount += itemTot * (1 - disc);
    })();
  }

  let discRate = 0;

  if (productCount >= 30) {
    const bulkDisc = totalAmount * 0.25;
    const itemDisc = subTot - totalAmount;

    if (bulkDisc > itemDisc) {
      totalAmount = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - totalAmount) / subTot;
    }
  } else {
    discRate = (subTot - totalAmount) / subTot;
  }

  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }

  const $sum = document.getElementById('cart-total');
  $sum.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    $sum.appendChild(span);
  }

  updateStockInfo();
  renderRewardPoints($sum);
}

const renderRewardPoints = (sum) => {
  rewardPoints = Math.floor(totalAmount / 1000);
  let ptsTag = document.getElementById('loyalty-points');

  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    sum.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + rewardPoints + ')';
};

function updateStockInfo() {
  let infoMsg = '';
  const $cartStrockInfo = document.getElementById('stock-status');

  products.forEach(function (item) {
    if (item.q < 5) {
      infoMsg +=
        item.name + ': ' + (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') + '\n';
    }
  });

  $cartStrockInfo.textContent = infoMsg;
}

main();

document.getElementById('add-to-cart').addEventListener('click', function () {
  const $ProductSelect = document.getElementById('product-select');

  const selItem = $ProductSelect.value;
  const itemToAdd = products.find(function (p) {
    return p.id === selItem;
  });

  if (itemToAdd && itemToAdd.q > 0) {
    const item = document.getElementById(itemToAdd.id);
    if (item) {
      const newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQty <= itemToAdd.q) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
        itemToAdd.q--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML =
        '<span>' +
        itemToAdd.name +
        ' - ' +
        itemToAdd.val +
        '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        itemToAdd.id +
        '">삭제</button></div>';
      document.getElementById('cart-items').appendChild(newItem);
      itemToAdd.q--;
    }

    updateCartSummary();
    lastSelectProduct = selItem;
  }
});

document.getElementById('cart-items').addEventListener('click', function (event) {
  const tgt = event.target;

  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);
    const prod = products.find(function (p) {
      return p.id === prodId;
    });

    if (tgt.classList.contains('quantity-change')) {
      const qtyChange = parseInt(tgt.dataset.change);
      const newQty =
        parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
      if (
        newQty > 0 &&
        newQty <= prod.q + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
        prod.q -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.q -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      const remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.q += remQty;
      itemElem.remove();
    }

    updateCartSummary();
  }
});
