import { AddToCartButton } from '../components/add-to-cart-button';
import { CartItemContainer } from '../components/cart-item-container';
import { ProductSelect } from '../components/product-select';
import { StockStatus } from '../components/stock-status';
import { Title } from '../components/title';
import { TotalAmountDisplay } from '../components/total-amount-display';
import { DISCOUNT_RATE, LUCK_THRESHOLD, prodList } from '../lib/constants';
import { store } from '../lib/store';
import { updateCartItems } from '../updates/cartItems';
import { updateSelectOptions } from '../updates/selectOptions';
import { startRandomlyInMs } from '../lib/utils';

export const MainPage = {
  template: () => `
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        ${Title.template()}
        ${CartItemContainer.template()}
        ${TotalAmountDisplay.template()}
        ${ProductSelect.template()}
        ${AddToCartButton.template()}
        ${StockStatus.template()}
      </div>
    </div>
  `,
  onMount: () => {
    Title.onMount?.();
    CartItemContainer.onMount?.();
    TotalAmountDisplay.onMount?.();
    ProductSelect.onMount?.();
    AddToCartButton.onMount?.();
    StockStatus.onMount?.();

    // DB의 product list를 기반으로 select, option 초기화
    updateSelectOptions();
    // 장바구니 초기화
    updateCartItems();

    // 럭키드로우 및 제안 기능을 주기적으로 실행
    startRandomlyInMs(10_000)(() => setInterval(startLuckyDraw, 30_000));
    startRandomlyInMs(20_000)(() => setInterval(startSuggestion, 60_000));
  },
};

const startLuckyDraw = () => {
  const randomIndex = Math.floor(Math.random() * prodList.length);
  const luckyItem = prodList[randomIndex];

  const isLucky = Math.random() < LUCK_THRESHOLD;
  const hasStock = luckyItem.quantity > 0;

  // 당첨됐고 재고가 있는 경우
  if (isLucky && hasStock) {
    alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
    // 해당 상품의 가격 할인, DB에 적용
    luckyItem.price = Math.round(luckyItem.price * (1 - DISCOUNT_RATE.lucky));
    // select, option 업데이트

    updateSelectOptions();
  }
};

const startSuggestion = () => {
  if (store.lastSelectedId) {
    const suggestion = prodList.find(
      (product) => product.id !== store.lastSelectedId && product.quantity > 0,
    );

    if (!suggestion) return;
    alert(
      `${suggestion.name}은(는) 어떠세요? 지금 구매하시면 ${DISCOUNT_RATE.suggestion * 100}% 추가 할인!`,
    );

    suggestion.price = Math.round(
      suggestion.price * (1 - DISCOUNT_RATE.suggestion),
    );
    updateSelectOptions();
  }
};
