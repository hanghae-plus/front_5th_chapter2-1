import { CONSTANTS } from './constants';
import { textUtils } from './utils/textUtils';
import { calcUtils } from './utils/calcUtils';
import { updateStockInfoText } from './components/stockStatus/updateStockInfoText';
import { getPoints } from './components/points/getPoints';
import { renderPoints } from './components/points/renderPoints';
import { updateSelectOptions } from './components/itemSelect/updateSelectOptions';

import Container from './components/Container';
import ContentWrapper from './components/ContentWrapper';
import Header from './components/Header';
import Cart from './components/cart/Cart';
import CartAddButton from './components/CartAddButton';
import ItemSelect from './components/itemSelect/ItemSelect';
import CartTotal from './components/cartTotal/CartTotal';
import StockStatus from './components/stockStatus/StockStatus';

let items, lastSelectedItem;

function appendDOM() {
  const $contentWrapper = ContentWrapper();

  $contentWrapper.appendChild(Header({ title: '장바구니' }));
  $contentWrapper.appendChild(Cart());
  $contentWrapper.appendChild(CartTotal());
  $contentWrapper.appendChild(ItemSelect());
  $contentWrapper.appendChild(CartAddButton());
  $contentWrapper.appendChild(StockStatus());

  const $containerDiv = Container();
  $containerDiv.appendChild($contentWrapper);

  const $root = document.getElementById('app');
  $root.appendChild($containerDiv);
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

  updateSelectOptions(items);
  calcCart();

  // 번개세일 timeout alert
  setTimeout(function () {
    setInterval(function () {
      const bungaeSaleItem = items[Math.floor(Math.random() * items.length)];

      if (Math.random() < 0.3 && bungaeSaleItem.quantity > 0) {
        bungaeSaleItem.price = Math.round(
          bungaeSaleItem.price * CONSTANTS.BUNGAE_SALE_DISCOUNT_RATE,
        );
        alert(textUtils.getBungaeSaleMessage(bungaeSaleItem.name));
        updateSelectOptions(items);
      }
    }, CONSTANTS.BUNGAE_SALE_INTERVAL);
  }, Math.random() * CONSTANTS.BUNGAE_SALE_DELAY);

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
            suggestItem.price * CONSTANTS.SUGGEST_ITEM_DISCOUNT_RATE,
          );
          updateSelectOptions(items);
        }
      }
    }, CONSTANTS.SUGGEST_SALE_INTERVAL);
  }, Math.random() * CONSTANTS.SUGGEST_SALE_DELAY);
} // end of main()

// 장바구니 계산
function calcCart() {
  let totalAmount = 0;
  let itemCount = 0;
  let originalTotalAmount = 0;

  const $cart = document.getElementById('cart-items');
  const cartItems = $cart.children;
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
        quantity >= CONSTANTS.QUANTITY_DISCOUNT_LIMIT &&
        calcUtils.getIdDiscountRate(curItem.id)
      ) {
        itemDiscountRate = calcUtils.getIdDiscountRate(curItem.id);
      }

      totalAmount += itemTotalPrice * (1 - itemDiscountRate);
    })();
  }

  const { finalDiscountRate, discountedTotalAmount } =
    calcUtils.calcFinalDiscount(totalAmount, originalTotalAmount, itemCount);

  const roundedAmount = Math.round(discountedTotalAmount);
  const $cartTotal = document.getElementById('cart-total');
  $cartTotal.textContent = textUtils.getTotalAmountText(roundedAmount);

  if (finalDiscountRate > 0) {
    const $discountSpan = document.createElement('span');

    $discountSpan.className = 'text-green-500 ml-2';
    const discountedRate = (finalDiscountRate * 100).toFixed(1);
    $discountSpan.textContent = textUtils.getDiscountText(discountedRate);
    const $cartTotal = document.getElementById('cart-total');
    $cartTotal.appendChild($discountSpan);
  }

  const updateText = updateStockInfoText(items);
  const $stockStatus = document.getElementById('stock-status');
  $stockStatus.textContent = updateText;

  const points = getPoints(totalAmount);
  renderPoints(points);
}

main();

const $addButton = document.getElementById('add-to-cart');
// 상품 추가 버튼 클릭 이벤트 리스너
$addButton.addEventListener('click', function () {
  const $itemSelect = document.getElementById('product-select');
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
        alert(CONSTANTS.OUT_OF_STOCK_MESSAGE);
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

      const $cart = document.getElementById('cart-items');
      $cart.appendChild($newItemsDiv);
      selectedItem.quantity--;
    }

    calcCart();
    lastSelectedItem = selectItemId;
  }
});

const $cart = document.getElementById('cart-items');
// 장바구니에서 상품 수량을 변경하거나 삭제하는 이벤트 리스너
$cart.addEventListener('click', function (event) {
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
        alert(CONSTANTS.OUT_OF_STOCK_MESSAGE);
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
