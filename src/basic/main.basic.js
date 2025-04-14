// 할인율
const ID_DISCOUNT_RATES = {
  // 각 상품별 할인율
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};
const BUNGAE_SALE_DISCOUNT_RATE = 0.8; // 번개세일 할인 적용 시 가격 비율
const SUGGEST_ITEM_DISCOUNT_RATE = 0.95; // 추천 상품 할인 적용 시 가격 비율

const BULK_DISCOUNT_RATE = 0.25; // 대량 구매 할인율
const WEEKLY_DISCOUNT_DAY = 2; // 화요일
const WEEKLY_DISCOUNT_RATE = 0.1; // 요일 할인율

// 수량
const QUANTITY_DISCOUNT_LIMIT = 10; // 할인 적용 수량
const BULK_DISCOUNT_LIMIT = 30; // 대량 구매 할인 적용 수량
const STOCK_WARNING_LIMIT = 5; // 재고 부족 경고 수량

// 포인트
const POINT_RATE = 1000; // 포인트 적립 비율 (1000원당 1포인트)

// 시간
const BUNGAE_SALE_INTERVAL = 30000; // 번개세일 알림 주기 (30초)
const BUNGAE_SALE_DELAY = 10000; // 번개세일 초기 알림 지연 시간 (10초)
const SUGGEST_SALE_INTERVAL = 60000; // 추천 상품 알림 주기 (1분)
const SUGGEST_SALE_DELAY = 20000; // 추천 상품 알림 초기 지연 시간 (20초)

// 메시지
const getBungaeSaleMessage = (name) => {
  return `번개세일! ${name}이(가) 20% 할인 중입니다!`;
};
const getSuggestItemMessage = (name) => {
  return `${name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`;
};
const OUT_OF_STOCK_MESSAGE = '재고가 부족합니다.';

// 텍스트
const getSelectOptionText = (name, price) => {
  return `${name} - ${price}원`;
};
const getTotalAmountText = (amount) => {
  return `총액: ${amount}원`;
};

const getDiscountText = (discountRate) => {
  return `(${discountRate}% 할인 적용)`;
};
const getPointText = (points) => {
  return `(포인트: ${points})`;
};

const getStockWarningText = (name, quantity) => {
  return quantity > 0
    ? `${name}: 재고 부족 (${quantity}개 남음)`
    : `${name}: 품절\n`;
};

const getCartItemSummary = (name, price, quantity) => {
  return `${name} - ${price}원 x ${quantity}`;
};

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

function main() {
  items = [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ];

  const $root = document.getElementById('app');
  const $bgDiv = document.createElement('div');
  const $cartDiv = document.createElement('div');
  const $cartTitle = document.createElement('h1');

  $cartItemsDiv = document.createElement('div');
  $cartTotalDiv = document.createElement('div');
  $itemSelect = document.createElement('select');
  $addButton = document.createElement('button');
  $stockStatusDiv = document.createElement('div');

  $cartItemsDiv.id = 'cart-items';
  $cartTotalDiv.id = 'cart-total';
  $itemSelect.id = 'product-select';
  $addButton.id = 'add-to-cart';
  $stockStatusDiv.id = 'stock-status';

  $bgDiv.className = 'bg-gray-100 p-8';
  $cartDiv.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  $cartTitle.className = 'text-2xl font-bold mb-4';
  $cartTotalDiv.className = 'text-xl font-bold my-4';
  $itemSelect.className = 'border rounded p-2 mr-2';
  $addButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  $stockStatusDiv.className = 'text-sm text-gray-500 mt-2';
  $cartTitle.textContent = '장바구니';
  $addButton.textContent = '추가';

  updateSelectOptions();

  $cartDiv.appendChild($cartTitle);
  $cartDiv.appendChild($cartItemsDiv);
  $cartDiv.appendChild($cartTotalDiv);
  $cartDiv.appendChild($itemSelect);
  $cartDiv.appendChild($addButton);
  $cartDiv.appendChild($stockStatusDiv);
  $bgDiv.appendChild($cartDiv);
  $root.appendChild($bgDiv);

  calcCart();

  // 번개세일 timeout alert
  setTimeout(function () {
    setInterval(function () {
      const bungaeSaleItem = items[Math.floor(Math.random() * items.length)];

      if (Math.random() < 0.3 && bungaeSaleItem.quantity > 0) {
        bungaeSaleItem.price = Math.round(
          bungaeSaleItem.price * BUNGAE_SALE_DISCOUNT_RATE,
        );
        alert(getBungaeSaleMessage(bungaeSaleItem.name));
        updateSelectOptions();
      }
    }, BUNGAE_SALE_INTERVAL);
  }, Math.random() * BUNGAE_SALE_DELAY);

  // 마지막으로 담은 상품 O, 다른 상품의 재고가 남아있으면 구매 제안 timeout alert
  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedItem) {
        const suggestItem = items.find(function (item) {
          return item.id !== lastSelectedItem && item.quantity > 0;
        });

        if (suggestItem) {
          alert(getSuggestItemMessage(suggestItem.name));

          // select에 제안된 상품 가격 5% 할인 적용
          suggestItem.price = Math.round(
            suggestItem.price * SUGGEST_ITEM_DISCOUNT_RATE,
          );
          updateSelectOptions();
        }
      }
    }, SUGGEST_SALE_INTERVAL);
  }, Math.random() * SUGGEST_SALE_DELAY);
} // end of main()

// 상품 목록을 업데이트
function updateSelectOptions() {
  $itemSelect.innerHTML = '';

  items.forEach(function (item) {
    const $option = document.createElement('option');
    $option.value = item.id;
    $option.textContent = getSelectOptionText(item.name, item.price);

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
        quantity >= QUANTITY_DISCOUNT_LIMIT &&
        ID_DISCOUNT_RATES[curItem.id]
      ) {
        itemDiscountRate = ID_DISCOUNT_RATES[curItem.id];
      }

      totalAmount += itemTotalPrice * (1 - itemDiscountRate);
    })();
  }

  let finalDiscountRate = 0; // 할인율

  // 30개 이상 구매 시 25% 할인 적용
  if (itemCount >= BULK_DISCOUNT_LIMIT) {
    const bulkDiscount = totalAmount * BULK_DISCOUNT_RATE;
    const itemDiscount = originalTotalAmount - totalAmount;

    if (bulkDiscount > itemDiscount) {
      totalAmount = originalTotalAmount * (1 - BULK_DISCOUNT_RATE);
      finalDiscountRate = BULK_DISCOUNT_RATE;
    } else {
      finalDiscountRate =
        (originalTotalAmount - totalAmount) / originalTotalAmount;
    }
  } else {
    finalDiscountRate =
      (originalTotalAmount - totalAmount) / originalTotalAmount;
  }

  // 특정 요일 할인 적용
  if (new Date().getDay() === WEEKLY_DISCOUNT_DAY) {
    totalAmount *= 1 - WEEKLY_DISCOUNT_RATE;
    finalDiscountRate = Math.max(finalDiscountRate, WEEKLY_DISCOUNT_RATE);
  }

  const roundedAmount = Math.round(totalAmount);
  $cartTotalDiv.textContent = getTotalAmountText(roundedAmount);

  if (finalDiscountRate > 0) {
    const $discountSpan = document.createElement('span');

    $discountSpan.className = 'text-green-500 ml-2';
    const discountedRate = (finalDiscountRate * 100).toFixed(1);
    $discountSpan.textContent = getDiscountText(discountedRate);
    $cartTotalDiv.appendChild($discountSpan);
  }

  updateStock();
  calcAndRenderPoints();
}

// 보너스 포인트 계산 및 표시
const calcAndRenderPoints = () => {
  points = Math.floor(totalAmount / POINT_RATE);
  let $pointSpan = document.getElementById('loyalty-points');

  if (!$pointSpan) {
    $pointSpan = document.createElement('span');
    $pointSpan.id = 'loyalty-points';
    $pointSpan.className = 'text-blue-500 ml-2';

    $cartTotalDiv.appendChild($pointSpan);
  }

  $pointSpan.textContent = getPointText(points);
};

// 재고 정보 업데이트
function updateStock() {
  let infoMsg = '';

  items.forEach(function (item) {
    if (item.quantity < STOCK_WARNING_LIMIT) {
      infoMsg += getStockWarningText(item.name, item.quantity);
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
        $item.querySelector('span').textContent = getCartItemSummary(
          selectedItem.name,
          selectedItem.price,
          updatedQuantity,
        );

        selectedItem.quantity--;
      } else {
        alert(OUT_OF_STOCK_MESSAGE);
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
        alert(OUT_OF_STOCK_MESSAGE);
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
