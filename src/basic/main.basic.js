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
    { id: 'p1', name: '상품1', val: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', val: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', val: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', val: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', val: 25000, quantity: 10 },
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
        bungaeSaleItem.val = Math.round(bungaeSaleItem.val * 0.8);
        alert(`번개세일! ${bungaeSaleItem.name}이(가) 20% 할인 중입니다!`);
        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);

  // 마지막으로 담은 상품 O, 다른 상품의 재고가 남아있으면 구매 제안 timeout alert
  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedItem) {
        const suggestItem = items.find(function (item) {
          return item.id !== lastSelectedItem && item.quantity > 0;
        });

        if (suggestItem) {
          alert(
            `${suggestItem.name} 은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`,
          );

          // select에 제안된 상품 가격 5% 할인 적용
          suggestItem.val = Math.round(suggestItem.val * 0.95);
          updateSelectOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
} // end of main()

// 상품 목록을 업데이트
function updateSelectOptions() {
  $itemSelect.innerHTML = '';

  items.forEach(function (item) {
    const $option = document.createElement('option');
    $option.value = item.id;
    $option.textContent = `${item.name} - ${item.val}원`;

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
      const itemTotalPrice = curItem.val * quantity;
      let itemDiscountRate = 0;

      itemCount += quantity;
      originalTotalAmount += itemTotalPrice;

      // 10개 이상 구매시 할인율 적용
      if (quantity >= 10) {
        if (curItem.id === 'p1') itemDiscountRate = 0.1;
        else if (curItem.id === 'p2') itemDiscountRate = 0.15;
        else if (curItem.id === 'p3') itemDiscountRate = 0.2;
        else if (curItem.id === 'p4') itemDiscountRate = 0.05;
        else if (curItem.id === 'p5') itemDiscountRate = 0.25;
      }

      totalAmount += itemTotalPrice * (1 - itemDiscountRate);
    })();
  }

  let finalDiscountRate = 0; // 할인율

  // 30개 이상 구매 시 25% 할인 적용
  if (itemCount >= 30) {
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = originalTotalAmount - totalAmount;

    if (bulkDiscount > itemDiscount) {
      totalAmount = originalTotalAmount * (1 - 0.25);
      finalDiscountRate = 0.25;
    } else {
      finalDiscountRate =
        (originalTotalAmount - totalAmount) / originalTotalAmount;
    }
  } else {
    finalDiscountRate =
      (originalTotalAmount - totalAmount) / originalTotalAmount;
  }

  // 특정 요일 할인 적용 (화요일 10% 할인)
  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    finalDiscountRate = Math.max(finalDiscountRate, 0.1);
  }

  $cartTotalDiv.textContent = `총액: ${Math.round(totalAmount)}원`;

  if (finalDiscountRate > 0) {
    const $discountSpan = document.createElement('span');

    $discountSpan.className = 'text-green-500 ml-2';
    $discountSpan.textContent = `(${(finalDiscountRate * 100).toFixed(1)}% 할인 적용)`;
    $cartTotalDiv.appendChild($discountSpan);
  }

  updateStock();
  calcAndRenderPoints();
}

// 보너스 포인트 계산 및 표시
const calcAndRenderPoints = () => {
  points = Math.floor(totalAmount / 1000);
  let $pointSpan = document.getElementById('loyalty-points');

  if (!$pointSpan) {
    $pointSpan = document.createElement('span');
    $pointSpan.id = 'loyalty-points';
    $pointSpan.className = 'text-blue-500 ml-2';

    $cartTotalDiv.appendChild($pointSpan);
  }

  $pointSpan.textContent = `(포인트: ${points})`;
};

// 재고 정보 업데이트
function updateStock() {
  let infoMsg = '';

  items.forEach(function (item) {
    if (item.quantity < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)` : '품절') +
        '\n';
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
        $item.querySelector('span').textContent =
          `${selectedItem.name} - ${selectedItem.val}원 x ${updatedQuantity}`;
        selectedItem.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      // 장바구니에 없는 상품인 경우
      const $newItemsDiv = document.createElement('div');
      $newItemsDiv.id = selectedItem.id;

      // 상품을 장바구니에 추가
      $newItemsDiv.className = 'flex justify-between items-center mb-2';
      $newItemsDiv.innerHTML = `
        <span>${selectedItem.name} - ${selectedItem.val}원 x 1</span>
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
        alert('재고가 부족합니다.');
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
