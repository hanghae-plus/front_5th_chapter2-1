import ProductModel from './Sel.Model.js';
import { renderSelectProductList } from './Sel.js';

const SALE_MESSAGE_INTERVAL = 30000;
const SUGGEST_MESSAGE_INTERVAL = 60000;

const SALE_MESSAGE_DELAY = 10000;
const SUGGEST_MESSAGE_DELAY = 20000;

const SALE_PROBABILITY = 0.3;

const SALE_DISCOUNT_PERCENT = 20;
const SALE_DISCOUNT_RATE = 1 - SALE_DISCOUNT_PERCENT / 100;

const SUGGEST_DISCOUNT_PERCENT = 5;
const SUGGEST_DISCOUNT_RATE = 1 - SUGGEST_DISCOUNT_PERCENT / 100;

const SALE_MESSAGE = (name) => `번개세일! ${name}이(가) ${SALE_DISCOUNT_PERCENT}% 할인 중입니다!`;
const SUGGEST_MESSAGE = (name) =>
  `${name}은(는) 어떠세요? 지금 구매하시면 ${SUGGEST_DISCOUNT_PERCENT}% 추가 할인!`;

/**
 * 랜덤 시간 후부터 30초마다 번개 세일 이벤트를 실행하는 함수.
 * 30% 확률로 판매 가능한 상품 하나를 선택하여 20% 할인 하여
 * 사용자에게 알림을 띄우고 판매 목록 UI 갱신
 */
export function alertItemSale() {
  setTimeout(function () {
    setInterval(function () {
      const listItems = ProductModel.getList();
      let randomItem = listItems[Math.floor(Math.random() * listItems.length)];

      if (Math.random() < SALE_PROBABILITY && randomItem.quantity > 0) {
        // 할인가 적용
        randomItem.price = Math.round(randomItem.price * SALE_DISCOUNT_RATE);

        // 알람 발생
        alert(SALE_MESSAGE(randomItem.name));

        // 판매 목록 UI 갱신
        updateSelectProductList(listItems);
      }
    }, SALE_MESSAGE_INTERVAL);
  }, Math.random() * SALE_MESSAGE_DELAY);
}

/**
 * 사용자가 최근에 선택한 상품(lastSelectedItem)이 있을 경우,
 * 다른 상품 중 하나를 추천하여 5% 추가 할인을 제안하는 함수.
 * 랜덤 시간 후부터, 60초 간격으로 이벤트 실행
 * 사용자에게 알림을 띄우고 판매 목록 UI 갱신
 */
export function alertItemSuggest() {
  setTimeout(function () {
    setInterval(function () {
      const listItems = ProductModel.getList();
      const lastSelectedItem = ProductModel.getLastSelectedItem();

      if (lastSelectedItem) {
        // 최근 선택한 상품과 다른 아이템 중 재고가 있는 것을 하나 선택
        let suggestItem = listItems.find(function (item) {
          return item.id !== lastSelectedItem && item.quantity > 0;
        });

        if (suggestItem) {
          // 할인가 적용
          suggestItem.price = Math.round(suggestItem.price * SUGGEST_DISCOUNT_RATE);

          // 알람 발생
          alert(SUGGEST_MESSAGE(suggestItem.name));

          // 판매 목록 UI 갱신
          updateSelectProductList(listItems);
        }
      }
    }, SUGGEST_MESSAGE_INTERVAL);
  }, Math.random() * SUGGEST_MESSAGE_DELAY);
}

/**
 * 상품목록 UI 업데이트
 * @param list 상품 목록
 */
export function updateSelectProductList(list) {
  renderSelectProductList(list);
}
