import { lastSelectState } from './index.js';
import { PRODUCT_LIST } from '../components/product/ProductList.constant.js';

const ADDITIONAL_DISCOUNT_RATE = 0.05;

function applyAdditionalDiscount(item) {
  item.price = Math.round(item.price * (1 - ADDITIONAL_DISCOUNT_RATE));
}

export default function recommendationTimer({
  interval = 60000,
  delay = Math.random() * 20000,
}) {
  // 가장 최근에 선택한 상품 가져오기
  const { getLastSelectState } = lastSelectState();

  // 최근에 선택되지 않은 상품 중 재고가 있는 상품을 제안 상품으로 선정
  const suggestedItem = PRODUCT_LIST.find(
    (product) => product.id !== getLastSelectState && product.quantity > 0
  );

  setTimeout(() => {
    setInterval(() => {
      if (!getLastSelectState || !suggestedItem) return;

      alert(
        `${suggestedItem.name}은(는) 어떠세요? 지금 구매하시면 ${ADDITIONAL_DISCOUNT_RATE * 100}% 추가 할인!`
      );

      // 제안 상품에 할인가 적용
      applyAdditionalDiscount(suggestedItem);
    }, interval);
  }, delay);
}
