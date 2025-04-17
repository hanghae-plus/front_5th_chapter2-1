import { TIMER_CONSTANTS } from "../constants/timer.js";
import { INITIAL_PRODUCTS, PRODUCT_CONSTANTS } from "../constants/products.js";

/**
 * 번개세일 적용
 * @param {Object} state 현재 상태
 * @returns {Object} 업데이트된 상태 또는 null (세일 없음)
 */
export const applyFlashSale = (state) => {
  const { products } = state;
  const { FLASH_SALE, DISCOUNT_RATES } = TIMER_CONSTANTS;

  // 설정된 확률로만 세일 적용
  if (Math.random() >= FLASH_SALE.CHANCE) return null;

  // 재고가 있는 상품 중 하나 랜덤 선택
  const availableProducts = products.filter((product) => product.q > 0);
  if (availableProducts.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * availableProducts.length);
  const luckyItem = availableProducts[randomIndex];

  // 선택된 상품에 설정된 할인율 적용
  const updatedProducts = products.map((product) =>
    product.id === luckyItem.id
      ? { ...product, val: Math.round(product.val * DISCOUNT_RATES.FLASH_SALE) }
      : product
  );

  return {
    ...state,
    products: updatedProducts,
    flashSaleProduct: luckyItem.id
  };
};

/**
 * 추천 상품 할인 적용
 * @param {Object} state 현재 상태
 * @returns {Object} 업데이트된 상태 또는 null (추천 없음)
 */
export const applySuggestionDiscount = (state) => {
  const { products, lastSelected } = state;
  const { DISCOUNT_RATES } = TIMER_CONSTANTS;

  // 이전에 선택한 상품이 없으면 추천 없음
  if (!lastSelected) return null;

  // 이전 선택 상품과 다른, 재고가 있는 상품 찾기
  const suggestedProduct = products.find((p) => p.id !== lastSelected && p.q > 0);

  if (!suggestedProduct) return null;

  // 설정된 할인율 적용
  const updatedProducts = products.map((product) =>
    product.id === suggestedProduct.id
      ? { ...product, val: Math.round(product.val * DISCOUNT_RATES.SUGGESTION) }
      : product
  );

  return {
    ...state,
    products: updatedProducts,
    suggestedProduct: suggestedProduct.id
  };
};

/**
 * 재고 상태 메시지 생성
 * @param {Array} products 상품 배열
 * @returns {string} 재고 상태 메시지
 */
export const getStockStatusMessage = (products) => {
  let message = "";
  const { LOW_STOCK_THRESHOLD } = PRODUCT_CONSTANTS;

  products.forEach((product) => {
    if (product.q < LOW_STOCK_THRESHOLD) {
      message += `${product.name}: ${product.q > 0 ? `재고 부족 (${product.q}개 남음)` : "품절"}\n`;
    }
  });

  return message;
};

/**
 * 초기 상품 데이터 로드
 * @returns {Array} 상품 배열
 */
export const getInitialProducts = () => {
  return [...INITIAL_PRODUCTS];
};
