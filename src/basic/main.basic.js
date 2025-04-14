import { CONSTNANTS } from './constants';
import { textUtils } from './utils/textUtils';

let items,
  $itemSelect,
  $addButton,
  $cartItemsDiv,
  $cartTotalDiv,
  $stockStatusDiv;

let lastSelectedItem,
  points = 0,
  totalAmount = 0,
  itemCount = 0;

function appendDOM() {
  const $cartDiv = document.createElement('div');
  $cartDiv.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  const $cartTitle = document.createElement('h1');
  $cartTitle.className = 'text-2xl font-bold mb-4';
  $cartTitle.textContent = '장바구니';
  $cartDiv.appendChild($cartTitle);

  $cartItemsDiv = document.createElement('div');
  $cartItemsDiv.id = 'cart-items';
  $cartDiv.appendChild($cartItemsDiv);

  $cartTotalDiv = document.createElement('div');
  $cartTotalDiv.id = 'cart-total';
  $cartTotalDiv.className = 'text-xl font-bold my-4';
  $cartDiv.appendChild($cartTotalDiv);

  $itemSelect = document.createElement('select');
  $itemSelect.id = 'product-select';
  $itemSelect.className = 'border rounded p-2 mr-2';
  $cartDiv.appendChild($itemSelect);

  $addButton = document.createElement('button');
  $addButton.id = 'add-to-cart';
  $addButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  $addButton.textContent = '추가';
  $cartDiv.appendChild($addButton);

  $stockStatusDiv = document.createElement('div');
  $stockStatusDiv.id = 'stock-status';
  $stockStatusDiv.className = 'text-sm text-gray-500 mt-2';
  $cartDiv.appendChild($stockStatusDiv);

  const $bgDiv = document.createElement('div');
  $bgDiv.className = 'bg-gray-100 p-8';
  $bgDiv.appendChild($cartDiv);

  const $root = document.getElementById('app');
  $root.appendChild($bgDiv);
}

function main() {
  items = [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ];

  appendDOM();

  updateSelectOptions();
  calcCart();

  // 번개세일 timeout alert
  setTimeout(function () {
    setInterval(function () {
      const bungaeSaleItem = items[Math.floor(Math.random() * items.length)];

      if (Math.random() < 0.3 && bungaeSaleItem.quantity > 0) {
        bungaeSaleItem.price = Math.round(
          bungaeSaleItem.price * CONSTNANTS.BUNGAE_SALE_DISCOUNT_RATE,
        );
        alert(textUtils.getBungaeSaleMessage(bungaeSaleItem.name));
        updateSelectOptions();
      }
    }, CONSTNANTS.BUNGAE_SALE_INTERVAL);
  }, Math.random() * CONSTNANTS.BUNGAE_SALE_DELAY);

  // 마지막으로 담은 상품 O, 다른 상품의 재고가 남아있으면 구매 제안 timeout alert
  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedItem) {
        const suggestItem = items.find(function (item) {
          return item.id !== lastSelectedItem && item.quantity > 0;
        });

        if (suggestItem) {
          alert(textUtils.getSuggestItemMessage(suggestItem.name));

          // select에 제안된 상품 가격 5% 할인 적용
          suggestItem.price = Math.round(
            suggestItem.price * CONSTNANTS.SUGGEST_ITEM_DISCOUNT_RATE,
          );
          updateSelectOptions();
        }
      }
    }, CONSTNANTS.SUGGEST_SALE_INTERVAL);
  }, Math.random() * CONSTNANTS.SUGGEST_SALE_DELAY);
} // end of main()

// 상품 목록을 업데이트
function updateSelectOptions() {
  $itemSelect.innerHTML = '';

  items.forEach(function (item) {
    const $option = document.createElement('option');
    $option.value = item.id;
    $option.textContent = textUtils.getSelectOptionText(item.name, item.price);

    if (item.quantity === 0) {
      $option.disabled = true;
    }
    $itemSelect.appendChild($option);
  });
}

// 장바구니 계산
function calcCart() {
  totalAmount = 0;
  itemCount = 0;
  let originalTotalAmount = 0;

  const cartItems = $cartItemsDiv.children;
  for (var i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem;

      for (let j = 0; j < items.length; j++) {
        if (items[j].id === cartItems[i].id) {
          curItem = items[j];
          break;
        }
      }

      const quantity = parseInt(
        cartItems[i].querySelector('span').textContent.split('x ')[1],
      ); // 수량
      const itemTotalPrice = curItem.price * quantity;
      let itemDiscountRate = 0;

      itemCount += quantity;
      originalTotalAmount += itemTotalPrice;

      // 10개 이상 구매시 할인율 적용
      if (
        quantity >= CONSTNANTS.QUANTITY_DISCOUNT_LIMIT &&
        CONSTNANTS.ID_DISCOUNT_RATES[curItem.id]
      ) {
        itemDiscountRate = CONSTNANTS.ID_DISCOUNT_RATES[curItem.id];
      }

      totalAmount += itemTotalPrice * (1 - itemDiscountRate);
    })();
  }

  let finalDiscountRate = 0; // 할인율

  // 30개 이상 구매 시 25% 할인 적용
  if (itemCount >= CONSTNANTS.BULK_DISCOUNT_LIMIT) {
    const bulkDiscount = totalAmount * CONSTNANTS.BULK_DISCOUNT_RATE;
    const itemDiscount = originalTotalAmount - totalAmount;

    if (bulkDiscount > itemDiscount) {
      totalAmount = originalTotalAmount * (1 - CONSTNANTS.BULK_DISCOUNT_RATE);
      finalDiscountRate = CONSTNANTS.BULK_DISCOUNT_RATE;
    } else {
      finalDiscountRate =
        (originalTotalAmount - totalAmount) / originalTotalAmount;
    }
  } else {
    finalDiscountRate =
      (originalTotalAmount - totalAmount) / originalTotalAmount;
  }

  // 특정 요일 할인 적용
  if (new Date().getDay() === CONSTNANTS.WEEKLY_DISCOUNT_DAY) {
    totalAmount *= 1 - CONSTNANTS.WEEKLY_DISCOUNT_RATE;
    finalDiscountRate = Math.max(
      finalDiscountRate,
      CONSTNANTS.WEEKLY_DISCOUNT_RATE,
    );
  }

  const roundedAmount = Math.round(totalAmount);
  $cartTotalDiv.textContent = textUtils.getTotalAmountText(roundedAmount);

  if (finalDiscountRate > 0) {
    const $discountSpan = document.createElement('span');

    $discountSpan.className = 'text-green-500 ml-2';
    const discountedRate = (finalDiscountRate * 100).toFixed(1);
    $discountSpan.textContent = textUtils.getDiscountText(discountedRate);
    $cartTotalDiv.appendChild($discountSpan);
  }

  updateStock();
  calcAndRenderPoints();
}

// 보너스 포인트 계산 및 표시
const calcAndRenderPoints = () => {
  points = Math.floor(totalAmount / CONSTNANTS.POINT_RATE);
  let $pointSpan = document.getElementById('loyalty-points');

  if (!$pointSpan) {
    $pointSpan = document.createElement('span');
    $pointSpan.id = 'loyalty-points';
    $pointSpan.className = 'text-blue-500 ml-2';

    $cartTotalDiv.appendChild($pointSpan);
  }

  $pointSpan.textContent = textUtils.getPointText(points);
};

// 재고 정보 업데이트
function updateStock() {
  let infoMsg = '';

  items.forEach(function (item) {
    if (item.quantity < CONSTNANTS.STOCK_WARNING_LIMIT) {
      infoMsg += textUtils.getStockWarningText(item.name, item.quantity);
    }
  });
  $stockStatusDiv.textContent = infoMsg;
}

main();

// 상품 추가 버튼 클릭 이벤트 리스너
$addButton.addEventListener('click', function () {
  const selectItemId = $itemSelect.value;
  const selectedItem = items.find(function (item) {
    return item.id === selectItemId;
  });

  // 상품이 선택되었고 재고가 있는 경우
  if (selectedItem && selectedItem.quantity > 0) {
    const $item = document.getElementById(selectedItem.id);

    // 이미 장바구니에 있는 상품인지 확인
    if ($item) {
      const updatedQuantity =
        parseInt($item.querySelector('span').textContent.split('x ')[1]) + 1;

      // 재고가 충분한 경우 수량 증가
      if (updatedQuantity <= selectedItem.quantity) {
        $item.querySelector('span').textContent = textUtils.getCartItemSummary(
          selectedItem.name,
          selectedItem.price,
          updatedQuantity,
        );

        selectedItem.quantity--;
      } else {
        alert(CONSTNANTS.OUT_OF_STOCK_MESSAGE);
      }
    } else {
      // 장바구니에 없는 상품인 경우
      const $newItemsDiv = document.createElement('div');
      $newItemsDiv.id = selectedItem.id;

      // 상품을 장바구니에 추가
      $newItemsDiv.className = 'flex justify-between items-center mb-2';
      $newItemsDiv.innerHTML = `
        <span>${selectedItem.name} - ${selectedItem.price}원 x 1</span>
        <div>
          <button 
            class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
            data-item-id="${selectedItem.id}"
            data-change="-1"
          >-</button>
          <button 
            class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
            data-item-id="${selectedItem.id}"
            data-change="1"
          >+</button>
          <button 
            class="remove-item bg-red-500 text-white px-2 py-1 rounded"
            data-item-id="${selectedItem.id}"
          >삭제</button>
        </div>
      `;
      $cartItemsDiv.appendChild($newItemsDiv);
      selectedItem.quantity--;
    }

    calcCart();
    lastSelectedItem = selectItemId;
  }
});

// 장바구니에서 상품 수량을 변경하거나 삭제하는 이벤트 리스너
$cartItemsDiv.addEventListener('click', function (event) {
  const target = event.target;

  if (
    target.classList.contains('quantity-change') ||
    target.classList.contains('remove-item')
  ) {
    const itemId = target.dataset.itemId;
    const $item = document.getElementById(itemId);
    const item = items.find(function (i) {
      return i.id === itemId;
    });

    if (target.classList.contains('quantity-change')) {
      const quantityDiff = parseInt(target.dataset.change);
      const curQuantity = parseInt(
        $item.querySelector('span').textContent.split('x ')[1],
      );
      const updatedQuantity = curQuantity + quantityDiff;

      if (
        updatedQuantity > 0 &&
        updatedQuantity <=
          item.quantity +
            parseInt($item.querySelector('span').textContent.split('x ')[1])
      ) {
        $item.querySelector('span').textContent =
          $item.querySelector('span').textContent.split('x ')[0] +
          'x ' +
          updatedQuantity;
        item.quantity -= quantityDiff;
      } else if (updatedQuantity <= 0) {
        $item.remove();
        item.quantity -= quantityDiff;
      } else {
        alert(CONSTNANTS.OUT_OF_STOCK_MESSAGE);
      }
    } else if (target.classList.contains('remove-item')) {
      const removeQuantity = parseInt(
        $item.querySelector('span').textContent.split('x ')[1],
      );

      item.quantity += removeQuantity;
      $item.remove();
    }

    calcCart();
  }
});
