import { CONSTANTS } from './constants';
import { textUtils } from './utils/textUtils';
import { ItemStore } from './store/itemStore';
import { updateSelectOptions } from './components/itemSelect/updateSelectOptions';
import { renderCalcCart } from './components/cartTotal/renderCalcCart';

import Container from './components/Container';
import ContentWrapper from './components/ContentWrapper';
import Header from './components/Header';
import Cart from './components/cart/Cart';
import CartAddButton from './components/cartAddButton/CartAddButton';
import ItemSelect from './components/itemSelect/ItemSelect';
import CartTotal from './components/cartTotal/CartTotal';
import StockStatus from './components/stockStatus/StockStatus';

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
  appendDOM();

  const itemStore = ItemStore.getInstance();
  const items = itemStore.getState().items;
  const lastSelectedItem = itemStore.getState().lastSelectedItem;

  updateSelectOptions(items);
  renderCalcCart(items);

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

main();

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

    const itemStore = ItemStore.getInstance();
    const items = itemStore.getState().items;
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
        itemStore.updateItemQuantity(item.id, -quantityDiff);
      } else if (updatedQuantity <= 0) {
        $item.remove();
        itemStore.updateItemQuantity(item.id, -quantityDiff);
      } else {
        alert(CONSTANTS.OUT_OF_STOCK_MESSAGE);
      }
    } else if (target.classList.contains('remove-item')) {
      const removeQuantity = parseInt(
        $item.querySelector('span').textContent.split('x ')[1],
      );

      itemStore.updateItemQuantity(item.id, removeQuantity);
      $item.remove();
    }

    renderCalcCart(items);
  }
});
