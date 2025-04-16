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
